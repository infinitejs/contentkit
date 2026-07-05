/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: ICL
 */

import type { ContentKitConfig } from "@ckjs/types";
import path from "node:path";
import fs from "node:fs";
import process from "node:process";

function getProjectSettings() {
  const cwd = process.cwd();
  let outputFormat: "esm" | "cjs" = "cjs";
  let generateTypes = false;

  try {
    const packageJsonPath = path.join(cwd, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      if (packageJson.type === "module") {
        outputFormat = "esm";
      }
    }
  } catch (e) {
    // ignore
  }

  if (fs.existsSync(path.join(cwd, "tsconfig.json"))) {
    generateTypes = true;
  }

  return { outputFormat, generateTypes };
}

export function normalizeConfig(config: any): ContentKitConfig {
  const { outputFormat, generateTypes } = getProjectSettings();

  if (config.collections) {
    return {
      contentDirPath: ".",
      outputFormat: config.outputFormat || outputFormat,
      generateTypes:
        config.generateTypes !== undefined
          ? config.generateTypes
          : generateTypes,
      documentTypes: config.collections.map((collection: any) => ({
        name: collection.name,
        filePathPattern: path
          .join(collection.directory, collection.include)
          .replace(/\\/g, "/"),
        fields: collection.schema,
        computedFields: collection.computedFields,
      })),
    };
  }

  // Legacy config support with auto-detection
  return {
    ...config,
    outputFormat: config.outputFormat || outputFormat,
    generateTypes:
      config.generateTypes !== undefined ? config.generateTypes : generateTypes,
  } as ContentKitConfig;
}
