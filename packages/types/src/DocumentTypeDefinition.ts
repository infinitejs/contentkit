/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: ICL
 */

import { type FieldType } from "./FieldType";
import { type ComputedField } from "./ComputedField";

export type DocumentTypeDefinition = {
  name: string;
  filePathPattern: string;
  fields: Record<string, FieldType>;
  computedFields?: Record<string, ComputedField>;
};
