/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  defineConfig,
  resolveSiteDataByRoute,
  type HeadConfig,
} from "vitepress";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";

const prod = !!process.env.NETLIFY;

export default async function () {
  const registry_url = "https://registry.npmjs.org/contentkit";
  const latest_version = await fetch(registry_url)
    .then((res) => res.json())
    .then((data) => data["dist-tags"].latest);

  // Site configuration (see https://vitepress.dev/reference/site-config )
  return defineConfig({
    rewrites: {
      "en/:rest*": ":rest*",
    },
    title: "ContentKit",
    description: "Type-safe content toolkit",
    lang: "en-US",
    lastUpdated: true,
    cleanUrls: true,
    sitemap: { hostname: "https://contentkit.js.org" },
    appearance: false,
    markdown: {
      config(md) {
        const fence = md.renderer.rules.fence!;
        md.renderer.rules.fence = function (tokens, idx, options, env, self) {
          const locale = (env as any).locale || "en";
          const isGerman = locale === "de";
          const codeCopyButtonTitle = isGerman ? "Code kopieren" : "Copy code";
          return fence(tokens, idx, options, env, self).replace(
            '<button title="Copy Code" class="copy"></button>',
            `<button title="${codeCopyButtonTitle}" class="copy"></button>`,
          );
        };
        md.use(groupIconMdPlugin);
      },
    },
    head: [
      [
        "link",
        {
          rel: "icon",
          type: "image/png",
          href: "/logo.png",
        },
      ],
      ["meta", { name: "theme-color", content: "#5179fd" }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:site_name", content: "ContentKit" }],
      ["meta", { property: "og:url", content: "https://contentkit.js.org/" }],
      [
        "script",
        {},
        `try{
         localStorage.setItem('vitepress-theme-appearance','dark');
         document.documentElement.classList.add('dark');
       }catch(e){}`,
      ],
      [
        "script",
        {},
        `try {
          var path = window.location.pathname;
          if (path.match(/^(\\/de)?\\/docs\\//)) {
            window.location.replace(path.replace(/^(\\/de)?\\/docs\\//, '$1/'));
          }
        } catch(e) {}`,
      ],
    ],
    themeConfig: {
      logo: "/logo.png",
      editLink: {
        pattern:
          "https://github.com/infinitejs/contentkit/blob/master/docs/:path",
        text: "Edit this page on GitHub",
      },
      socialLinks: [
        { icon: "github", link: "https://github.com/infinitejs/contentkit" },
      ],
      footer: {
        message: "Released under the BSD-3-Clause License.",
        copyright: "Copyright © 2025-present ContentKit contributors",
      },
      search: { provider: "local" },
    },
    locales: {
      root: {
        label: "English",
        lang: "en-US",
        title: "ContentKit",
        description: "Type-safe content toolkit",
        themeConfig: {
          nav: [
            { text: "Guide", link: "/guide/", activeMatch: "/guide/" },
            { text: "API", link: "/api/reference", activeMatch: "/api/" },
            { text: "Upgrade Guide", link: "/migration-guides/1.0" },
            {
              text: `v${latest_version}`,
              items: [
                {
                  text: "Security",
                  link: "https://github.com/infinitejs/contentkit/blob/master/SECURITY.md",
                },
                {
                  text: "Contribution Guide",
                  link: "https://github.com/infinitejs/contentkit/blob/master/CONTRIBUTING.md",
                },
              ],
            },
          ],
          sidebar: {
            "/guide/": [
              { text: "Introduction", link: "/guide/" },
              { text: "Installation", link: "/guide/installation" },
              { text: "Configuration", link: "/guide/configuration" },
              { text: "Build Output", link: "/guide/output" },
              { text: "CLI", link: "/guide/cli" },
            ],
            "/api/": [
              {
                text: "API",
                items: [{ text: "Reference", link: "/api/reference" }],
              },
            ],
            "/migration-guides/": [
              {
                text: "Migration Guides",
                items: [{ text: "1.0", link: "/migration-guides/1.0" }],
              },
            ],
          },
        },
      },
      de: {
        label: "Deutsch",
        lang: "de-DE",
        title: "ContentKit",
        description: "Type-safe Content Toolkit",
        themeConfig: {
          nav: [
            {
              text: "Leitfaden",
              link: "/de/guide/",
              activeMatch: "/de/guide/",
            },
            { text: "API", link: "/de/api/reference", activeMatch: "/de/api/" },
            { text: "Upgrade Guide", link: "/de/migration-guides/1.0" },
            {
              text: `v${latest_version}`,
              items: [
                {
                  text: "Sicherheit",
                  link: "https://github.com/infinitejs/contentkit/blob/master/SECURITY.md",
                },
                {
                  text: "Beitragsleitfaden",
                  link: "https://github.com/infinitejs/contentkit/blob/master/CONTRIBUTING.md",
                },
              ],
            },
          ],
          sidebar: {
            "/de/guide/": [
              { text: "Einführung", link: "/de/guide/" },
              { text: "Installation", link: "/de/guide/installation" },
              { text: "Konfiguration", link: "/de/guide/configuration" },
              { text: "Build Ausgabe", link: "/de/guide/output" },
              { text: "CLI", link: "/de/guide/cli" },
            ],
            "/de/api/": [
              {
                text: "API",
                items: [{ text: "Referenz", link: "/de/api/reference" }],
              },
            ],
            "/de/migration-guides/": [
              {
                text: "Migrationsanleitungen",
                items: [{ text: "1.0", link: "/de/migration-guides/1.0" }],
              },
            ],
          },
        },
      },
    },
    transformPageData: prod
      ? (pageData, ctx) => {
          const site = resolveSiteDataByRoute(
            ctx.siteConfig.site,
            pageData.relativePath,
          );
          const title = `${pageData.title || site.title} | ${pageData.description || site.description}`;
          ((pageData.frontmatter.head ??= []) as HeadConfig[]).push(
            ["meta", { property: "og:locale", content: site.lang }],
            ["meta", { property: "og:title", content: title }],
          );
        }
      : undefined,
  });
}
