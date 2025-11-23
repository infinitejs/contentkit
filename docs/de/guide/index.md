---
outline: deep
---

# Überblick Guides

Willkommen bei den ContentKit Guides. Dieser Abschnitt führt dich durch Installation, Konfiguration und Integration von ContentKit in deine TypeScript / Next.js Projekte und erklärt anschließend die erzeugten Artefakte.

> ContentKit ist früh und in aktiver Entwicklung. APIs können sich ändern; pinne Versionen und lies Release Notes beim Upgraden.

## Quick Start (TL;DR)

1. Installieren: `pnpm add -D contentkit`
2. Config initialisieren: `npx contentkit init`
3. Markdown in deinem `content/` Verzeichnis hinzufügen
4. Build: `npx contentkit build`
5. Daten importieren: `import { allPosts } from 'dot-contentkit/generated'`

Springe in die detaillierten Guides unten für tiefere Erklärungen und Optionen.

## Zentrale Guides

- [Installation](./installation.md) – Paket hinzufügen & Config scaffolden.
- [Konfiguration](./configuration.md) – Dokumenttypen, Felder & Computed Fields definieren.
- [CLI](./cli.md) – Commands (`init`, `validate`, `build`) und Scripting-Tipps.
- [Build Output](./output.md) – Ordnerlayout, Imports & Typen.
- [Häufige Fehler](./errors.md) – Troubleshooting und Lösung häufiger Probleme.
- [Upgrade Guide v1.0](../migration-guides/1.0.md) – Migration von v0.x auf v1.0.

## Konzepte im Überblick

| Konzept           | Was es ist                                           | Wo lesen               |
| ----------------- | ---------------------------------------------------- | ---------------------- |
| Document Type     | Schema für eine Gruppe von Markdown-Dateien          | Konfiguration          |
| Frontmatter       | Quell-Metadaten (YAML / TOML / JSON)                 | Konfiguration / Output |
| Computed Field    | Abgeleiteter Wert (slug, reading time, etc.)         | Konfiguration          |
| Generated Package | `dot-contentkit` virtueller Import mit Daten & Typen | Build Output           |

## Roadmap (High Level)

Geplant / in Exploration:

- Inkrementelle (per‑Datei) Builds
- Reichere MD/MDX Processing-Pipeline (Plugins / remark / rehype opt-in)
- Watch Mode außerhalb von Next.js
- Optionale Bild/Asset-Metadaten Extraktion
- Verbesserte DX für typsichere Custom Computed Fields

## Feedback / Issues

Wenn etwas unklar oder kaputt ist, öffne ein Issue oder PR. Frühes Nutzerfeedback bestimmt stark die Prioritäten.

Viel Erfolg beim Bauen!
