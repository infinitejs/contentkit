/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: ICL
 */

const configTemplate = {
  ts: `import { defineConfig, defineCollection, fields } from "contentkit";

const post = defineCollection({
  name: "Post",
  directory: "./content",
  include: "*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
    tags: fields.list(fields.string()),
  },
});

export default defineConfig({
  collections: [post],
});
`,
  js: `import { defineConfig, defineCollection, fields } from "contentkit";

const post = defineCollection({
  name: "Post",
  directory: "./content",
  include: "*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
    tags: fields.list(fields.string()),
  },
});

export default defineConfig({
  collections: [post],
});
`,
  mjs: `import { defineConfig, defineCollection, fields } from "contentkit";

const post = defineCollection({
  name: "Post",
  directory: "./content",
  include: "*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
    tags: fields.list(fields.string()),
  },
});

export default defineConfig({
  collections: [post],
});
`,
  cjs: `const { defineConfig, defineCollection, fields } = require("contentkit");

const post = defineCollection({
  name: "Post",
  directory: "./content",
  include: "*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
    tags: fields.list(fields.string()),
  },
});

module.exports = defineConfig({
  collections: [post],
});
`,
};

export default configTemplate;
