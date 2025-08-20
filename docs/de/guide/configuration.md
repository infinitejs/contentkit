---
outline: deep
---

# Konfiguration

Definiere dein Schema in `contentkit.config.ts` mit `defineConfig`.

## Minimales Beispiel

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

## Feld-Definition

Primitive Typen: `string | number | boolean | date`

Optionen:

- `required: true` markiert Pflichtfelder
- `list: true` Array dieses Primitivs

## Computed Fields

Für abgeleitete Werte wie `slug`, `readingTime`, etc.
::: code-group

```ts [TypeScript]
readingTime: { type: 'number', resolve: d => Math.ceil(d.raw.split(/\s+/).length / 200) }
```

```js [JavaScript]
readingTime: { type: 'number', resolve: (d) => Math.ceil(d.raw.split(/\s+/).length / 200) }
```

:::

## Validierung

Bei `contentkit build` wird jedes Dokument validiert; Fehler brechen den Build ab.

## Tipps

- Halte den Content-Ordner klein & fokussiert
- Bevorzuge berechnete Slugs statt manuell (verhindert Drift)
- Normalisiere Daten mit dem `date` Typ
