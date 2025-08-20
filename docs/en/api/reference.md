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

Define your schema via `contentkit.config.ts` using `defineConfig` (re‑exported from the root package) or by exporting a plain object.

::: code-group

```ts [contentkit.config.ts]
import { defineConfig } from "contentkit";

export default defineConfig({
  contentDirPath: "content",
  outputFormat: "esm", // 'esm' | 'cjs'
  generateTypes: true, // default true
  documentTypes: [
    {
      name: "Post",
      filePathPattern: "posts/**/*.md",
      fields: {
        title: { type: "string", required: true },
        date: { type: "date", required: true },
        tags: { type: "array", items: { type: "string" } },
      },
      computedFields: {
        slug: {
          type: "string",
          resolve: (d) => d.title.toLowerCase().replace(/\s+/g, "-"),
        },
      },
    },
  ],
});
```

```js [contentkit.config.js]
import { defineConfig } from "contentkit";

export default defineConfig({
  contentDirPath: "content",
  outputFormat: "esm",
  generateTypes: false,
  documentTypes: [
    {
      name: "Post",
      filePathPattern: "posts/**/*.md",
      fields: {
        title: { type: "string", required: true },
        date: { type: "date", required: true },
        tags: { type: "array", items: { type: "string" } },
      },
      computedFields: {
        slug: {
          type: "string",
          resolve: (d) => d.title.toLowerCase().replace(/\s+/g, "-"),
        },
      },
    },
  ],
});
```

:::

### `ContentKitConfig`

| Property         | Type                       | Required | Description                                              |
| ---------------- | -------------------------- | -------- | -------------------------------------------------------- | --------------------------------------- |
| `contentDirPath` | `string`                   | yes      | Root folder containing your content files.               |
| `outputFormat`   | `'cjs'                     | 'esm'`   | yes                                                      | Module system for generated `index.js`. |
| `generateTypes`  | `boolean`                  | no       | Disable to skip emitting `d.ts` files. Defaults to true. |
| `documentTypes`  | `DocumentTypeDefinition[]` | yes      | Array of document type schemas.                          |

### `DocumentTypeDefinition`

| Property          | Type                            | Required | Description                                              |
| ----------------- | ------------------------------- | -------- | -------------------------------------------------------- |
| `name`            | `string`                        | yes      | PascalCase type name used for generated types & exports. |
| `filePathPattern` | `string`                        | yes      | Glob relative to `contentDirPath` selecting documents.   |
| `fields`          | `Record<string, FieldType>`     | yes      | Frontmatter schema for raw fields.                       |
| `computedFields`  | `Record<string, ComputedField>` | no       | Derived fields resolved at build.                        |

### `FieldType`

Union describing primitive or list / array fields.

Primitives:

```ts
{ type: 'string' | 'number' | 'boolean' | 'date'; required?: boolean }
```

Collections:

```ts
{ type: 'array' | 'list'; items: { type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'list' }; required?: boolean }
```

### `ComputedField`

```ts
{
  type: "string" | "number" | "boolean" | "date" | "array" | "list";
  resolve: (data: any) => any;
}
```

`data` will include merged frontmatter plus: `raw` (markdown body), `html` (rendered HTML).

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
