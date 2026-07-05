/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: ICL
 */

export type ComputedField = {
  type: "string" | "number" | "boolean" | "date" | "array" | "list" | "object";
  resolve: (data: any) => any;
};
