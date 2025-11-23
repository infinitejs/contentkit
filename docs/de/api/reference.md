---
outline: deep
---

# API Referenz

Diese Seite dokumentiert die öffentlichen APIs von ContentKit: CLI Commands, Konfigurationsschema, Runtime Exports und generierte Typen.

## CLI

`contentkit` stellt drei primäre Commands bereit.

### build

Baut deine Content-Collection(s), validiert Frontmatter gegen dein Schema, generiert JSON Daten & TypeScript Deklarationsdateien und schreibt ein virtuelles Package `dot-contentkit` innerhalb von `.contentkit/`.

```bash
npx contentkit build
```

Outputs:

- `.contentkit/package.json` (ephemere Version mit zufälligem Prerelease)
- `.contentkit/generated/` Verzeichnis mit per‑Typ JSON Indizes und `index.js`
- `.contentkit/generated/index.d.ts` und `types.d.ts` (falls `generateTypes` nicht deaktiviert)

### init

Erstellt eine Starter `contentkit.config.{ts|js|mjs|cjs}` Datei im Projektroot falls noch nicht vorhanden (oder ersetzt eine Config mit anderer Extension, um zur Umgebung zu passen).

```bash
npx contentkit init
```

### validate

Lädt und type‑checkt (syntaktisch) die Konfigurationsdatei. Nützlich in CI um früh zu failen falls die Config fehlt oder fehlerhaft ist.

```bash
npx contentkit validate
```

---

## Konfiguration

Definiere dein Schema via `contentkit.config.ts` mit `defineConfig` und `defineCollection`.

::: code-group

```ts [contentkit.config.ts]
import { defineConfig, defineCollection, fields } from "contentkit";

const posts = defineCollection({
  name: "Post",
  directory: "./content/posts",
  include: "**/*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
    tags: fields.array(fields.string()).optional(),
  },
  computedFields: {
    slug: fields
      .string()
      .resolve((doc) => doc.title.toLowerCase().replace(/\s+/g, "-")),
  },
});

export default defineConfig({
  collections: [posts],
});
```

```js [contentkit.config.js]
import { defineConfig, defineCollection, fields } from "contentkit";

const posts = defineCollection({
  name: "Post",
  directory: "./content/posts",
  include: "**/*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
    tags: fields.array(fields.string()).optional(),
  },
  computedFields: {
    slug: fields
      .string()
      .resolve((doc) => doc.title.toLowerCase().replace(/\s+/g, "-")),
  },
});

export default defineConfig({
  collections: [posts],
});
```

:::

### `defineConfig` Optionen

| Property      | Typ                      | Erforderlich | Beschreibung                       |
| ------------- | ------------------------ | ------------ | ---------------------------------- |
| `collections` | `CollectionDefinition[]` | ja           | Array von Collection Definitionen. |

### `defineCollection` Optionen

| Property         | Typ                             | Erforderlich | Beschreibung                                       |
| ---------------- | ------------------------------- | ------------ | -------------------------------------------------- |
| `name`           | `string`                        | ja           | PascalCase Typname für generierte Typen & Exports. |
| `directory`      | `string`                        | ja           | Basisverzeichnis für den Content der Collection.   |
| `include`        | `string`                        | ja           | Glob Pattern relativ zu `directory` für Dokumente. |
| `schema`         | `Record<string, FieldSchema>`   | ja           | Frontmatter Schema Definition.                     |
| `computedFields` | `Record<string, ComputedField>` | nein         | Abgeleitete Felder beim Build aufgelöst.           |

### `fields` Helper

Verwende den `fields` Helper um dein Schema zu definieren.

- `fields.string()`
- `fields.number()`
- `fields.boolean()`
- `fields.date()`
- `fields.array(items)`
- `fields.list(items)`
- `fields.object(fields)`

Verkette `.optional()` um ein Feld optional zu machen.

### `ComputedField`

Definiert durch Verketten von `.resolve((doc) => ...)` an einer Feld-Definition.

```ts
slug: fields
  .string()
  .resolve((doc) => doc.title.toLowerCase().replace(/\s+/g, "-"));
```

`doc` enthält gemergtes Frontmatter plus: `_raw` (Metadaten), `raw` (Markdown Body), `html` (gerenderte HTML).

---

## Build Output Struktur

Nach `contentkit build` wird folgende Struktur erzeugt:

```
.contentkit/
  package.json          # name: 'dot-contentkit'
  generated/
    index.js            # Re-exports aller Typ-Arrays + allDocuments
    index.d.ts          # (falls generateTypes) ambient exports
    types.d.ts          # (falls generateTypes) individuelle Doc Interfaces
    <TypeName>/
      _index.json       # Array der Docs für diesen Typ
```

### JSON Dokumentstruktur

Jeder JSON Eintrag in `<TypeName>/_index.json` ist das hydrierte Dokument:

```ts
{
  typeName: 'Post',
  // frontmatter Felder...
  // computed Felder...
  raw: string;   // originaler Markdown Body
  html: string;  // gerendert via marked
}
```

### Virtueller Package Import

Füge ein `paths` Mapping (TypeScript) hinzu, damit du generierten Content importieren kannst:
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

Dann:

::: code-group

```ts [TypeScript]
import { allPosts } from "dot-contentkit";
console.log(allPosts[0].title);
```

```js [JavaScript]
import { allPosts } from "dot-contentkit";
console.log(allPosts[0].title);
// CommonJS: const { allPosts } = require('dot-contentkit');
```

:::

- `DocumentTypeNames` string literal Union aller Namen
- `DataExports` Shape der generierten Exports

---

## Frontmatter Parsing

Unterstützte Frontmatter Formate:

- YAML (default zwischen `---` Delimitern)
- JSON (Objektliteral zwischen `---` wenn es mit `{}` beginnt/endet)
- TOML (zwischen `+++` Delimitern)

Validierungsfehler zeigen eine farbige Tabelle; der Build beendet mit Code 1 wenn ein required oder typisiertes Feld invalide ist.

---

## Error Codes

Einige bekannte Error Codes über den Logger:
| Code | ID | Beschreibung |
|------|----|--------------|
| E001 | CONFIG_NOT_FOUND | Keine Config Datei gefunden. |
| E002 | INVALID_FRONTMATTER_FORMAT | Unsupported oder fehlerhaftes Frontmatter. |
| E003 | INVALID_FRONTMATTER_FORMAT_NO_DELIMITER | Fehlende Frontmatter Delimiter. |

---

## Beispiel End-to-End

```bash
npx contentkit init
# contentkit.config.ts editieren um documentTypes hinzuzufügen
mkdir -p content/posts
printf "---\ntitle: Hello\ndate: 2025-01-01\n---\n\nBody." > content/posts/hello.md
npx contentkit build
```

```ts
import { allPosts } from "dot-contentkit";
console.log(allPosts[0].title);
```

---

## Versionierung Hinweis

Die interne Package-Version nutzt ein zufälliges Prerelease pro Build (z.B. `0.0.0-1A2B3C4D`). Behandle `.contentkit` als transientes Build-Output — nicht veröffentlichen oder committen außer du brauchst deterministische Deploy-Artefakte.

---

## FAQ

- F: Wie füge ich neue Felder hinzu?  
  A: Füge sie dem `fields` Objekt einer `DocumentTypeDefinition` hinzu; Build erneut ausführen. Fehlende Pflichtfelder oder falsche Typen failen den Build.
- F: Kann ich die Typ-Generierung deaktivieren?  
  A: Setze `generateTypes: false` in der Config.
- F: Wie ändere ich CommonJS vs ESM?  
  A: Setze `outputFormat: 'cjs' | 'esm'`. ESM nutzt JSON Import Assertions.

---

Wenn hier etwas fehlt, bitte ein Issue oder PR auf GitHub öffnen.
