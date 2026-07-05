/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: ICL
 */

import type { FieldType, ComputedField } from "@ckjs/types";

export type FieldSchema = FieldType;

export type CollectionDefinition = {
  name: string;
  directory: string;
  include: string;
  schema: Record<string, FieldSchema>;
  computedFields?: Record<string, ComputedField>;
};

export type Config = {
  collections: CollectionDefinition[];
};

export function defineCollection(
  config: CollectionDefinition,
): CollectionDefinition {
  return config;
}

export function defineConfig(config: Config): Config {
  return config;
}

type FieldBuilder<T extends FieldType> = T & {
  optional: () => FieldBuilder<T>;
  default: (value: any) => FieldBuilder<T>;
  resolve: (resolveFn: (doc: any) => any) => ComputedField;
};

function createField<T extends FieldType>(field: T): FieldBuilder<T> {
  return {
    ...field,
    optional() {
      this.required = false;
      return this as FieldBuilder<T>;
    },
    default(value: any) {
      this.default = value;
      this.required = false;
      return this as FieldBuilder<T>;
    },
    resolve(resolveFn: (doc: any) => any) {
      return {
        type: field.type,
        resolve: resolveFn,
      } as ComputedField;
    },
  } as FieldBuilder<T>;
}

export const fields = {
  string: () => createField({ type: "string", required: true }),
  number: () => createField({ type: "number", required: true }),
  boolean: () => createField({ type: "boolean", required: true }),
  date: () => createField({ type: "date", required: true }),
  object: (fields: Record<string, FieldType>) =>
    createField({ type: "object", required: true, fields }),
  array: (items: FieldType) =>
    createField({ type: "array", required: true, items }),
  list: (items: FieldType) =>
    createField({ type: "list", required: true, items }),
};
