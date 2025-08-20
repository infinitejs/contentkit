---
outline: deep
---

# CLI

Core commands for working with ContentKit.

## init

Scaffolds `contentkit.config.ts`.
::: code-group

```bash [npx]
npx contentkit init
```

```bash [pnpm]
pnpm exec contentkit init
```

```bash [yarn]
yarn contentkit init
```

```bash [bunx]
bunx contentkit init
```

:::

## validate

Validates documents without emitting output.
::: code-group

```bash [npx]
npx contentkit validate
```

```bash [pnpm]
pnpm exec contentkit validate
```

```bash [yarn]
yarn contentkit validate
```

```bash [bunx]
bunx contentkit validate
```

:::

Exit code 1 on validation failure.

## build

Parses, validates and writes generated artifacts.
::: code-group

```bash [npx]
npx contentkit build
```

```bash [pnpm]
pnpm exec contentkit build
```

```bash [yarn]
yarn contentkit build
```

```bash [bunx]
bunx contentkit build
```

:::

## package.json scripts

::: code-group

```jsonc [package.json]
{
  "scripts": {
    "content:build": "contentkit build",
    "content:validate": "contentkit validate",
  },
}
```

```bash [pnpm]
pnpm run content:build
```

```bash [yarn]
yarn content:build
```

```bash [npm]
npm run content:build
```

```bash [bun]
bun content:build
```

:::
