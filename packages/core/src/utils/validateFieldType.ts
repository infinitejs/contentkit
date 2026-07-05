/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: ICL
 */

import type { FieldType } from "@ckjs/types";

export function validateFieldType(value: any, fieldType: FieldType): boolean {
  if (!fieldType.required && value === undefined) {
    return true;
  }

  if (fieldType.required && value === undefined) {
    return false;
  }

  switch (fieldType.type) {
    case "string":
      return typeof value === "string";
    case "number":
      return typeof value === "number";
    case "boolean":
      return typeof value === "boolean";
    case "date":
      return value instanceof Date || !isNaN(Date.parse(value));
    case "object":
      if (typeof value !== "object" || value === null || Array.isArray(value))
        return false;
      if (fieldType.fields) {
        for (const [key, childFieldType] of Object.entries(fieldType.fields)) {
          if (!validateFieldType(value[key], childFieldType)) {
            return false;
          }
        }
      }
      return true;
    case "array":
    case "list":
      if (!Array.isArray(value)) return false;
      if (fieldType.items) {
        return value.every((item) => validateFieldType(item, fieldType.items));
      }
      return true;
    default:
      return false;
  }
}
