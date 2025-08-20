---
outline: deep
---

# CLI

Zentrale Commands für die Arbeit mit ContentKit.

## init

Scaffoldet `contentkit.config.ts`.
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

Validiert Dokumente ohne Output zu erzeugen.
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

Exit Code 1 bei Validierungsfehler.

## build

Parst, validiert und schreibt generierte Artefakte.
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

## package.json Scripts

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
