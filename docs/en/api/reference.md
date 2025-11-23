---
outline: deep
---

# API Reference

This page documents the public APIs exposed by ContentKit: the CLI commands, configuration schema, runtime exports, and type generation outputs.

## CLI

`contentkit` provides three primary commands.

### build

Builds your content collection(s), validates frontmatter against your schema, generates JSON data & TypeScript declaration files, and writes a virtual package `dot-contentkit` inside `.contentkit/`.

```bash
npx contentkit build
```

Outputs:

- `.contentkit/package.json` (ephemeral version with random prerelease)
- `.contentkit/generated/` directory containing per‑type JSON indexes and `index.js`
- `.contentkit/generated/index.d.ts` and `types.d.ts` (unless `generateTypes` disabled)

### init

Creates a starter `contentkit.config.{ts|js|mjs|cjs}` file in the project root if one does not already exist (or replaces a config with a different extension to match your environment).

```bash
npx contentkit init
```

### validate

Loads and type‑checks (syntactically) the configuration file. Useful in CI to fail fast if the config is missing or malformed.

```bash
npx contentkit validate
```

---

## Configuration

Define your schema via `contentkit.config.ts` using `defineConfig` and `defineCollection`.

::: code-group

```ts [contentkit.config.ts]
import { defineConfig, defineCollection, fields } from "contentkit";

const posts = defineCollection({
  name: "Post",
  directory: "./content/posts",
  include: "**/*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
    tags: fields.array(fields.string()).optional(),
  },
  computedFields: {
    slug: fields
      .string()
      .resolve((doc) => doc.title.toLowerCase().replace(/\s+/g, "-")),
  },
});

export default defineConfig({
  collections: [posts],
});
```

```js [contentkit.config.js]
import { defineConfig, defineCollection, fields } from "contentkit";

const posts = defineCollection({
  name: "Post",
  directory: "./content/posts",
  include: "**/*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
    tags: fields.array(fields.string()).optional(),
  },
  computedFields: {
    slug: fields
      .string()
      .resolve((doc) => doc.title.toLowerCase().replace(/\s+/g, "-")),
  },
});

export default defineConfig({
  collections: [posts],
});
```

:::

### `defineConfig` Options

| Property      | Type                     | Required | Description                      |
| ------------- | ------------------------ | -------- | -------------------------------- |
| `collections` | `CollectionDefinition[]` | yes      | Array of collection definitions. |

### `defineCollection` Options

| Property         | Type                            | Required | Description                                               |
| ---------------- | ------------------------------- | -------- | --------------------------------------------------------- |
| `name`           | `string`                        | yes      | PascalCase type name used for generated types & exports.  |
| `directory`      | `string`                        | yes      | Base directory for the collection content.                |
| `include`        | `string`                        | yes      | Glob pattern relative to `directory` selecting documents. |
| `schema`         | `Record<string, FieldSchema>`   | yes      | Frontmatter schema definition.                            |
| `computedFields` | `Record<string, ComputedField>` | no       | Derived fields resolved at build.                         |

### `fields` Helper

Use the `fields` helper to define your schema.

- `fields.string()`
- `fields.number()`
- `fields.boolean()`
- `fields.date()`
- `fields.array(items)`
- `fields.list(items)`
- `fields.object(fields)`

Chain `.optional()` to make a field optional.

### `ComputedField`

Defined by chaining `.resolve((doc) => ...)` on a field definition.

```ts
slug: fields
  .string()
  .resolve((doc) => doc.title.toLowerCase().replace(/\s+/g, "-"));
```

`doc` will include merged frontmatter plus: `_raw` (metadata), `raw` (markdown body), `html` (rendered HTML).

---

## Build Output Structure

After `contentkit build` the following structure is produced:

```
.contentkit/
  package.json          # name: 'dot-contentkit'
  generated/
    index.js            # Imports & re-exports all type arrays + allDocuments
    index.d.ts          # (if generateTypes) ambient exports
    types.d.ts          # (if generateTypes) individual doc interfaces
    <TypeName>/
      _index.json       # Array of docs for that type
```

### JSON Document Shape

Each JSON entry inside `<TypeName>/_index.json` is the hydrated document:

```ts
{
  typeName: 'Post',
  // frontmatter fields...
  // computed fields...
  raw: string;   // original markdown body
  html: string;  // rendered via marked
}
```

### Virtual Package Import

Add a `paths` mapping (TypeScript) so you can import generated content:
::: code-group

```jsonc [tsconfig.json]
{
  "compilerOptions": {
    "paths": {
      "dot-contentkit": [".contentkit/generated"],
    },
  },
}
```

```jsonc [jsconfig.json]
{
  "compilerOptions": {
    "paths": {
      "dot-contentkit": [".contentkit/generated"],
    },
  },
}
```

:::

Then:

::: code-group

```ts [TypeScript]
import { allPosts } from "dot-contentkit";
console.log(allPosts[0].title);
```

```js [JavaScript]
import { allPosts } from "dot-contentkit";
console.log(allPosts[0].title);
// CommonJS: const { allPosts } = require('dot-contentkit');
```

:::

- `DocumentTypeNames` string literal union of names
- `DataExports` shape of the generated exports

---

## Frontmatter Parsing

Supported frontmatter formats:

- YAML (default between `---` delimiters)
- JSON (object literal between `---` if it starts/ends with `{}`)
- TOML (between `+++` delimiters)

Validation errors display a colored table; the build exits with code 1 if a required or typed field is invalid.

---

## Error Codes

Some known error codes surfaced via the logger:
| Code | ID | Description |
|------|----|-------------|
| E001 | CONFIG_NOT_FOUND | No config file located. |
| E002 | INVALID_FRONTMATTER_FORMAT | Unsupported or malformed frontmatter. |
| E003 | INVALID_FRONTMATTER_FORMAT_NO_DELIMITER | Missing frontmatter delimiters. |

---

## Example End-to-End

```bash
npx contentkit init
# edit contentkit.config.ts to add documentTypes
mkdir -p content/posts
printf "---\ntitle: Hello\ndate: 2025-01-01\n---\n\nBody." > content/posts/hello.md
npx contentkit build
```

```ts
import { allPosts } from "dot-contentkit";
console.log(allPosts[0].title);
```

---

## Versioning Note

The internal package version uses a random prerelease per build (e.g. `0.0.0-1A2B3C4D`). Treat `.contentkit` as transient build output—do not publish or commit unless you need deterministic deploy artifacts.

---

## FAQ

- Q: How do I add new fields?  
  A: Add them to the `fields` object of a `DocumentTypeDefinition`; re-run build. Missing required fields or wrong types fail the build.
- Q: Can I disable type generation?  
  A: Set `generateTypes: false` in the config.
- Q: How do I change CommonJS vs ESM?  
  A: Set `outputFormat: 'cjs' | 'esm'`. ESM uses JSON import assertions.

---

If something is missing here, please open an issue or PR on GitHub.
