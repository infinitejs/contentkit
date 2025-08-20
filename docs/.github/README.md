# Resonix Documentation

Welcome to the documentation source for **Resonix**.

This `docs` folder contains the multilingual (currently `en` and `de`) content for the site built with [VitePress](https://vitepress.dev/).

## Quick Start (Local Preview)

1. Install dependencies (uses `pnpm`):
   ```bash
   pnpm install
   pnpm dev
   ```
2. Open the local dev URL printed in the terminal.

## Structure

- `.vitepress/` – VitePress config & theme overrides
- `en/` / `de/` – English & German content
- `LICENSE` – License for documentation content

## Contributing to the Docs

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) in this folder. In short:

- For substantial structural/content changes, open an issue first.
- Keep language parity: when adding or changing an English page, create/update the German counterpart (or add a TODO note inside it).
- Use inclusive language and concise examples.
- Prefer relative links; avoid absolute GitHub URLs unless necessary.

## Translation Workflow

1. Update the English page.
2. Duplicate to `de/` and translate.
3. If translation will follow later, add at the top:
   ```md
   > :warning: This page is pending translation. Contributions welcome!
   ```
4. Open a PR referencing the issue (if any).

## License

All documentation content is licensed under the same license as the main project.

> BSD-3-Clause

## Feedback

Please open an issue in the main repository for suggestions, typos, or structural improvements.
