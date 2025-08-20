---
outline: deep
---

# Build Output

Nach `npx contentkit build` wird ein `.contentkit/` Verzeichnis erstellt.

```
.contentkit/
  package.json          # Name "dot-contentkit" für lokale Imports
  generated/
    index.js
    index.d.ts
    types.d.ts
    Post/_index.json    # eins pro Dokumenttyp (Array der Docs)
```

## Imports

::: code-group

```ts [TypeScript]
import { allPosts } from "dot-contentkit/generated";
```

```js [JavaScript]
import { allPosts } from "dot-contentkit/generated";
// oder CommonJS: const { allPosts } = require('dot-contentkit/generated');
```

:::

Jedes Dokument enthält Frontmatter-Felder + alle Computed Fields.

## Typen

`types.d.ts` exportiert Interfaces und Unions.

::: code-group

```ts [TypeScript]
import type { Post } from "dot-contentkit/generated";
```

```js [JavaScript]
// Typen zur Laufzeit nicht verfügbar; für Editoren mit JSDoc:
/** @typedef {import('dot-contentkit/generated').Post} Post */
```

:::

## Regeneration

Führe den Build erneut aus, wann immer Content oder Config sich ändern. Der Ordner wird komplett überschrieben.

## Versionskontrolle

Checke `.contentkit/` ein für reproduzierbare Deploys oder generiere während CI – beides funktioniert.
