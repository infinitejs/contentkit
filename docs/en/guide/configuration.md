---
outline: deep
---

# Configuration

Define your schema in `contentkit.config.ts` using `defineConfig` and `defineCollection`.

## Minimal Example

::: code-group

```ts [TypeScript]
// contentkit.config.ts
import { defineConfig, defineCollection, fields } from "contentkit";

const posts = defineCollection({
  name: "posts",
  directory: "./content/posts",
  include: "**/*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
  },
});

export default defineConfig({
  collections: [posts],
});
```

```js [JavaScript]
// contentkit.config.js
import { defineConfig, defineCollection, fields } from "contentkit";

const posts = defineCollection({
  name: "posts",
  directory: "./content/posts",
  include: "**/*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
  },
});

export default defineConfig({
  collections: [posts],
});
```

:::

## Collection Definition

::: code-group

```ts [TypeScript]
// inside contentkit.config.ts
const posts = defineCollection({
  name: "posts",
  directory: "./content/posts",
  include: "**/*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
    tags: fields.array(fields.string()),
  },
  computedFields: {
    slug: fields
      .string()
      .resolve((doc) => doc.title.toLowerCase().replace(/\s+/g, "-")),
  },
});
```

```js [JavaScript]
// inside contentkit.config.js
const posts = defineCollection({
  name: "posts",
  directory: "./content/posts",
  include: "**/*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
    tags: fields.array(fields.string()),
  },
  computedFields: {
    slug: fields
      .string()
      .resolve((doc) => doc.title.toLowerCase().replace(/\s+/g, "-")),
  },
});
```

:::

## Field Definition

Use the `fields` helper to define your schema.

- `fields.string()`
- `fields.number()`
- `fields.boolean()`
- `fields.date()`
- `fields.array(items)`
- `fields.object(fields)`
- `fields.list(items)` (alias for array)

Chain `.optional()` to make a field optional.

```ts
schema: {
  tags: fields.array(fields.string()).optional(),
  author: fields.object({
    name: fields.string(),
    email: fields.string(),
  }),
}
```

Chain `.default(value)` to provide a default value if the field is missing. This automatically makes the field optional in the schema but ensures a value is present in the output.

```ts
schema: {
  published: fields.boolean().default(true),
  tags: fields.array(fields.string()).default([]),
}
```

## Computed Fields

Used for derived values like `slug`, `readingTime`, etc.
::: code-group

```ts [TypeScript]
readingTime: fields
  .number()
  .resolve((d) => Math.ceil(d.raw.split(/\s+/).length / 200));
```

```js [JavaScript]
readingTime: fields
  .number()
  .resolve((d) => Math.ceil(d.raw.split(/\s+/).length / 200));
```

:::

## Validation

On `contentkit build` each document is validated; failures abort the build.

## Tips

- Keep content folder small & focused
- Prefer computed slugs over manual to avoid drift
- Normalize dates with `date` type
