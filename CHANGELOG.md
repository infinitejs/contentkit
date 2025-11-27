## Features

- **Default Values**: Added support for default values in schema definitions. You can now chain `.default(value)` to any field to provide a fallback value if the field is missing in the content source.
  - Updated `FieldType` definitions to support `default`.
  - Implemented default value application during the build process.
  - Added documentation for default values in English and German.

## Improvements

- **Next.js Integration**:
  - Refactored the build process in `@ckjs/next` to be more robust.
  - Removed file-based caching (`changed-files.json`) in favor of in-memory tracking for better reliability.
  - Improved error handling during development rebuilds to prevent the process from crashing.
  - Added debounce to rebuilds to prevent excessive build triggers.
