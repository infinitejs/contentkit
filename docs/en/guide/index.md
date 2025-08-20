---
outline: deep
---

# Guides Overview

Welcome to the ContentKit guides. This section walks you through installing, configuring and integrating ContentKit in your TypeScript / Next.js projects, then understanding the emitted artifacts.

> ContentKit is early and under active development. APIs may change; pin versions and review release notes when upgrading.

## Quick Start (TL;DR)

1. Install: `pnpm add -D contentkit`
2. Init config: `npx contentkit init`
3. Add markdown in your `content/` directory
4. Build: `npx contentkit build`
5. Import data: `import { allPosts } from 'dot-contentkit/generated'`

Jump into the detailed guides below for deeper explanations and options.

## Core Guides

- [Installation](./installation.md) – Add the package & scaffold a config.
- [Configuration](./configuration.md) – Define document types, fields & computed fields.
- [CLI](./cli.md) – Commands (`init`, `validate`, `build`) and scripting tips.
- [Build Output](./output.md) – Folder layout, imports & types.

## Concepts At a Glance

| Concept           | What It Is                                            | Where To Read          |
| ----------------- | ----------------------------------------------------- | ---------------------- |
| Document Type     | Schema for a group of markdown files                  | Configuration          |
| Frontmatter       | Source metadata (YAML / TOML / JSON)                  | Configuration / Output |
| Computed Field    | Derived value (slug, reading time, etc.)              | Configuration          |
| Generated Package | `dot-contentkit` virtual import exposing data & types | Build Output           |

## Roadmap (High Level)

Planned / in exploration:

- Incremental (per‑file) builds
- Richer MD/MDX processing pipeline (plugins / remark / rehype opt‑in)
- Watch mode outside Next.js
- Optional image/asset metadata extraction
- Improved DX around custom computed field type inference

## Feedback / Issues

If something is unclear or broken, open an issue or PR. Early user feedback heavily shapes priorities.

Happy building!
