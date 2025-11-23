/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

export type ComputedField = {
  type: "string" | "number" | "boolean" | "date" | "array" | "list" | "object";
  resolve: (data: any) => any;
};
