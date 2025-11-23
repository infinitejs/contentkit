import { defineConfig, defineCollection, fields } from "contentkit";

const posts = defineCollection({
  name: "Post",
  directory: "./content/posts",
  include: "**/*.md",
  schema: {
    title: fields.string(),
    date: fields.date(),
    tags: fields.list(fields.string()).optional(),
    author: fields.string(),
  },
  computedFields: {
    slug: fields
      .string()
      .resolve((doc) => doc._raw.sourceFileName.replace(/\.md$/, "")),
    url: fields
      .string()
      .resolve(
        (doc) => `/posts/${doc._raw.sourceFileName.replace(/\.md$/, "")}`,
      ),
  },
});

const authors = defineCollection({
  name: "Author",
  directory: "./content/authors",
  include: "**/*.md",
  schema: {
    name: fields.string(),
    twitter: fields.string().optional(),
  },
});

export default defineConfig({
  collections: [posts, authors],
});
