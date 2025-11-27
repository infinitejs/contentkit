/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import chokidar from "chokidar";
import { build } from "@ckjs/core/build";
import { normalizeConfig } from "@ckjs/core/utils/normalizeConfig";
import { loadConfig } from "@ckjs/utils/load-config";
import { logger, colors } from "@ckjs/utils/logger";
import { type NextConfig } from "next";
import path from "node:path";
import { debounce } from "lodash";

let isInitialBuildCompleted = false;
let isWithContentkitInitialized = false;
let isBuildInProgress = false;

export function withContentkit(nextConfig: NextConfig) {
  if (!isWithContentkitInitialized) {
    isWithContentkitInitialized = true;

    (async () => {
      const rawConfig = await loadConfig();

      if (!rawConfig.collections) {
        logger.warn(
          "You are using a legacy configuration. Please upgrade to the new configuration format before v1.5.0.\nSee https://contentkit.js.org/docs/migration-guides/1.0 for more information.",
          "next",
        );
      }

      const contentkitConfig = normalizeConfig(rawConfig);
      const contentDir = path.join(
        process.cwd(),
        contentkitConfig.contentDirPath,
      );

      const waitForNextJsReady = new Promise<void>((resolve) => {
        const originalWrite = process.stdout.write;
        process.stdout.write = (chunk: any, ...args: any[]) => {
          const message = chunk.toString();
          if (message.includes("Ready")) {
            resolve();
            process.stdout.write = originalWrite;
          }
          if (message.includes("Creating an optimized production build")) {
            resolve();
            process.stdout.write = originalWrite;
          }
          return originalWrite.call(process.stdout, chunk, ...args);
        };
      });

      await waitForNextJsReady;

      if (!isInitialBuildCompleted) {
        const now = Date.now();
        await build(contentkitConfig);
        logger.success(
          `ContentKit build completed [${colors.gray}${formatTime(Date.now() - now)}${colors.reset}]`,
          "next",
        );

        isInitialBuildCompleted = true;
      }

      let isRebuildScheduled = false;
      const changedFiles = new Set<string>();

      const rebuild = async () => {
        if (isBuildInProgress) {
          isRebuildScheduled = true;
          return;
        }

        isBuildInProgress = true;

        try {
          const now = Date.now();
          changedFiles.clear();
          await build(contentkitConfig);
          logger.success(
            `ContentKit build completed [${colors.gray}${formatTime(Date.now() - now)}${colors.reset}]`,
            "next",
          );
        } catch (error) {
          logger.error("ContentKit build failed", "next");
          console.error(error);
        } finally {
          isBuildInProgress = false;
          if (isRebuildScheduled) {
            isRebuildScheduled = false;
            debouncedRebuild();
          }
        }
      };

      const debouncedRebuild = debounce(rebuild, 300);

      const watchPatterns = contentkitConfig.documentTypes.map((dt) =>
        path.join(contentDir, dt.filePathPattern),
      );

      chokidar
        .watch(watchPatterns, {
          ignoreInitial: true,
          ignored: [
            /(^|[\/\\])\../, // ignore dotfiles
            "**/node_modules/**",
            "**/.contentkit/**",
            "**/.next/**",
            "**/.git/**",
          ],
        })
        .on("all", (event, filePath) => {
          const relativePath = path.relative(contentDir, filePath);
          if (!changedFiles.has(relativePath)) {
            changedFiles.add(relativePath);
            debouncedRebuild();
          }
        });
    })();
  }

  return nextConfig;
}

function formatTime(ms: number) {
  const miliseconds = ms % 1000;
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s ${miliseconds}ms`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s ${miliseconds}ms`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s ${miliseconds}ms`;
  }
  if (seconds > 0) {
    return `${seconds}s ${miliseconds}ms`;
  }
  if (miliseconds > 0) {
    return `${miliseconds}ms`;
  }
  return "0ms";
}
