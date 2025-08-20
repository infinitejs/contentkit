---
outline: deep
---

# Build Output

After `npx contentkit build` a `.contentkit/` directory is created.

```
.contentkit/
  package.json          # name "dot-contentkit" for local imports
  generated/
    index.js
    index.d.ts
    types.d.ts
    Post/_index.json    # one per document type (array of docs)
```

## Imports

::: code-group

```ts [TypeScript]
import { allPosts } from "dot-contentkit/generated";
```

```js [JavaScript]
import { allPosts } from "dot-contentkit/generated";
// or CommonJS: const { allPosts } = require('dot-contentkit/generated');
```

:::

Each document has frontmatter fields + any computed fields.

## Types

`types.d.ts` exposes interfaces and unions.

::: code-group

```ts [TypeScript]
import type { Post } from "dot-contentkit/generated";
```

```js [JavaScript]
// Types not available at runtime; for editors supporting JSDoc:
/** @typedef {import('dot-contentkit/generated').Post} Post */
```

:::

## Regeneration

Re-run the build whenever content or config changes. The directory is fully rewritten.

## Source Control

Check in `.contentkit/` for reproducible deploys or generate during CI – both models work.
