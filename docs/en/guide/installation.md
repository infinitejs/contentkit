---
outline: deep
---

# Installation

Install with your preferred package manager:
::: code-group

```sh [npm]
$ npm install -D contentkit
```

```sh [pnpm]
$ pnpm add -D contentkit
```

```sh [yarn]
$ yarn add -D contentkit
```

```sh [bun]
$ bun add -D contentkit
```

:::

Initialize a config:
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

This creates `contentkit.config.ts` (or `.js`) based on environment.

Add a sample document:

::: code-group

```bash [Unix]
mkdir -p content
printf "---\ntitle: Hello World\ndate: 2025-01-01\ntags: [intro]\n---\n\nMy first post." > content/hello-world.md
```

```powershell [Windows Powershell]
New-Item -ItemType Directory -Force -Path content | Out-Null
@"
---
title: Hello World
date: 2025-01-01
tags: [intro]
---

My first post.
"@ | Set-Content content/hello-world.md
```

:::

Build:
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

Generated artifacts live in `.contentkit/generated` and a virtual package `dot-contentkit` is written.
Now we will add the `dot-contentkit` package to our project.

First, open your `tsconfig.json` (or `jsconfig.json`) file and add the following path mapping:
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
