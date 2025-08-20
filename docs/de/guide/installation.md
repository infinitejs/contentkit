---
outline: deep
---

# Installation

Installiere mit deinem bevorzugten Paketmanager:
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

Config initialisieren:
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

Dies erstellt `contentkit.config.ts` (oder `.js`) basierend auf der Umgebung.

Ein Beispieldokument hinzufügen:

::: code-group

```bash [Unix]
mkdir -p content
printf "---\ntitle: Hello World\ndate: 2025-01-01\ntags: [intro]\n---\n\nMein erster Post." > content/hello-world.md
```

```powershell [Windows Powershell]
New-Item -ItemType Directory -Force -Path content | Out-Null
@"
---
title: Hello World
date: 2025-01-01
tags: [intro]
---

Mein erster Post.
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

Generierte Artefakte liegen in `.contentkit/generated` und ein virtuelles Package `dot-contentkit` wird geschrieben.
Nun fügen wir das `dot-contentkit` Package unserem Projekt hinzu.

Öffne zuerst deine `tsconfig.json` (oder `jsconfig.json`) Datei und füge folgendes Path Mapping hinzu:
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
