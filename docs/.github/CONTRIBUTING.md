# Contributing to Resonix Docs

The primary contributing guide lives at the repository root: [CONTRIBUTING.md](https://github.com/resonix-dev/resonix-node/blob/master/CONTRIBUTING.md).

This file exists to clarify documentation-specific expectations:

## Docs-Specific Guidelines

- Maintain parity between `en/` and `de/` folders. If translation is pending, clearly mark it.
- Favor short paragraphs and descriptive headings.
- Use fenced code blocks with explicit language identifiers (e.g. `rust`, `bash`, `json`).
- Keep link titles descriptive; avoid raw URLs except in reference lists.
- Prefer present tense and active voice.

## Process

1. Fork & branch from `development`.
2. Make doc changes.
3. Run local preview to ensure no build errors.
4. Open a Pull Request with:
   - Summary of changes
   - Screenshots if UI / theme related
   - Checklist of translated pages (if applicable)
5. Respond to review feedback.

## Style Consistency

- Use American English in `en/` by default.
- Keep headings in sentence case (capitalize only first word and proper nouns) unless conventional (e.g. API, HTTP).
- Avoid trailing whitespace; wrap lines at ~100–120 chars where practical.

## Tooling

VitePress & Markdown linting can be added later; feel free to propose enhancements.

For general project contribution (tests, code style, commit message format), see the root guide:

- https://github.com/resonix-dev/resonix-node/blob/master/CONTRIBUTING.md
