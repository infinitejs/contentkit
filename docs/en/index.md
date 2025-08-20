---
layout: home
hero:
  name: ContentKit
  text: Type‑safe content toolkit
  tagline: Parse frontmatter & Markdown, validate fields, generate types & data queries – all in one lightweight build step.
  image: /logo.png
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: API Reference
      link: /api/reference
    - theme: alt
      text: GitHub
      link: https://github.com/infinitejs/contentkit
features:
  - icon: ⚙️
    title: Zero runtime CMS
    details: Source-controlled Markdown + frontmatter in your repo, compiled into typed JSON & TS definitions.
  - icon: 🧪
    title: Type generation
    details: Auto‑generated d.ts & discriminated unions for every document type.
  - icon: 🧩
    title: Framework friendly
    details: Works with Next.js SSG/ISR or any build pipeline – just import generated data.
  - icon: 🛡️
    title: Strict field validation
    details: Required flags, list item typing, and date coercion prevent silent content drift.
  - icon: ⚡
    title: Fast builds
    details: Minimal IO + streaming Markdown parsing keeps build times tiny.
  - icon: 📦
    title: Local virtual package
    details: Imports via 'dot-contentkit/generated' for clean module boundaries.
---
