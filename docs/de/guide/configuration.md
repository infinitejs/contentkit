---
outline: deep
---

# Konfiguration

Definiere dein Schema in `contentkit.config.ts` mit `defineConfig` und `defineCollection`.

## Minimales Beispiel

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

## Feld-Definition

Verwende den `fields` Helper um dein Schema zu definieren.

- `fields.string()`
- `fields.number()`
- `fields.boolean()`
- `fields.date()`
- `fields.array(items)`
- `fields.object(fields)`
- `fields.list(items)` (Alias für array)

Verkette `.optional()` um ein Feld optional zu machen.

```ts
schema: {
  tags: fields.array(fields.string()).optional(),
  author: fields.object({
    name: fields.string(),
    email: fields.string(),
  }),
}
```

## Computed Fields

Für abgeleitete Werte wie `slug`, `readingTime`, etc.
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

## Validierung

Bei `contentkit build` wird jedes Dokument validiert; Fehler brechen den Build ab.

## Tipps

- Halte den Content-Ordner klein & fokussiert
- Bevorzuge berechnete Slugs statt manuell (verhindert Drift)
- Normalisiere Daten mit dem `date` Typ
