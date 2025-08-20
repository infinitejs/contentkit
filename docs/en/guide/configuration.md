---
outline: deep
---

# Configuration

Define your schema in `contentkit.config.ts` using `defineConfig`.

## Minimal Example

::: code-group

```ts [TypeScript]
// contentkit.config.ts
import { defineConfig } from "contentkit";

export default defineConfig({
  contentDirPath: "content",
  outputFormat: "esm",
  documentTypes: [],
});
```

```js [JavaScript]
// contentkit.config.js
import { defineConfig } from "contentkit";

export default defineConfig({
  contentDirPath: "content",
  outputFormat: "esm",
  documentTypes: [],
});
```

:::

## Document Type

::: code-group

```ts [TypeScript]
// inside contentkit.config.ts
{
  name: 'Post',
  filePathPattern: 'posts/**/*.md',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'array', items: { type: 'string' } }
  },
  computedFields: {
    slug: { type: 'string', resolve: (doc) => doc.title.toLowerCase().replace(/\s+/g, '-') }
  }
}
```

```js [JavaScript]
// inside contentkit.config.js
{
  name: 'Post',
  filePathPattern: 'posts/**/*.md',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'array', items: { type: 'string' } }
  },
  computedFields: {
    slug: { type: 'string', resolve: (doc) => doc.title.toLowerCase().replace(/\s+/g, '-') }
  }
}
```

:::

## Field Definition

Primitive types: `string | number | boolean | date`

Options:

- `required: true` marks mandatory fields
- `list: true` array of that primitive

## Computed Fields

Used for derived values like `slug`, `readingTime`, etc.
::: code-group

```ts [TypeScript]
readingTime: { type: 'number', resolve: d => Math.ceil(d.raw.split(/\s+/).length / 200) }
```

```js [JavaScript]
readingTime: { type: 'number', resolve: (d) => Math.ceil(d.raw.split(/\s+/).length / 200) }
```

:::

## Validation

On `contentkit build` each document is validated; failures abort the build.

## Tips

- Keep content folder small & focused
- Prefer computed slugs over manual to avoid drift
- Normalize dates with `date` type
