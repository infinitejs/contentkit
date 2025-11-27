/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { type ItemType } from "./ItemType";

export type FieldType =
  | {
      type: "string" | "number" | "boolean" | "date";
      required?: boolean;
      default?: any;
    }
  | {
      type: "object";
      required?: boolean;
      fields: Record<string, FieldType>;
      default?: any;
    }
  | {
      type: "array" | "list";
      required?: boolean;
      items: FieldType;
      default?: any;
    };
