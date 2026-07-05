/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: ICL
 */

import { Command } from "commander";
import { build } from "@ckjs/core/build";
import { normalizeConfig } from "@ckjs/core/utils/normalizeConfig";
import { loadConfig } from "@ckjs/utils/load-config";
import { logger, colors } from "@ckjs/utils/logger";
import { formatTime } from "../utils/format-time";
import process from "node:process";

export const buildCommand = new Command("build")
  .description("Build the content using the ContentKit configuration")
  .action(async () => {
    try {
      const rawConfig = await loadConfig();

      if (!rawConfig.collections) {
        logger.warn(
          "You are using a legacy configuration. Please upgrade to the new configuration format before v1.5.0.\nSee https://contentkit.js.org/docs/migration-guides/1.0 for more information.",
          "contentkit",
        );
      }

      const config = normalizeConfig(rawConfig);
      const now = Date.now();
      await build(config);
      logger.success(
        `Content build completed [${colors.gray}${formatTime(Date.now() - now)}${colors.reset}]`,
        "contentkit",
      );
    } catch (err) {
      logger.error(`Build failed: ${(err as any).message}`, "contentkit");
      process.exit(1);
    }
  });
