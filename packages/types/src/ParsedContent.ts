/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: ICL
 */

export type ParsedContent = {
  typeName: string;
  _id: string;
  _raw: Record<string, any>;
  raw: string;
  html: string;
  [key: string]: any;
};
