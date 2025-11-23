---
outline: deep
---

# Common Errors

This guide lists common errors you might encounter when using ContentKit and how to resolve them.

## Configuration Errors

### Legacy Configuration Warning

If you see a warning about using a legacy configuration, please refer to the [Migration Guide](../migration-guides/1.0.md).

## Build Errors

### Invalid Field Type

If you encounter an "Invalid type for field" error, it means the data in your markdown frontmatter does not match the schema defined in your configuration. Check the file mentioned in the error message and ensure the field type is correct.

### Duplicate Document IDs

ContentKit requires unique IDs for documents. If you have multiple files with the same path (which shouldn't happen in a standard file system) or if you manually override IDs in a way that causes collisions, you will get an error.
