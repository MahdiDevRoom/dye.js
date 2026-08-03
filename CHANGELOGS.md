Changelog

[1.0.0] - 2026-08-03

Added

- Initial release
- CLI text styling with ANSI escape sequences
- Markup syntax: "<! ... >"
- Text styles: "bold", "dim", "italic", "underline", "blink", "inverse", "hidden", "strikethrough"
- 16 foreground colors (8 base + 8 bright)
- 16 background colors
- RGB colors: "rgb()"
- 256 colors: "code()"
- Style reset with "<!>" and "<!reset>"
- Style objects with "render()"
- Style helpers: "createTag()", "createStyle()"
- Validation with configurable log levels
- Visible text length with "textLength()"
- Low-level APIs: "parseMarkup()", "parseStyle()", "toAnsi()", "applyStyle()"
- Test suite for core functionality

Notes

- Zero dependencies
- Designed for Node.js / CLI environments
- Currently available on GitHub only
- Not published on npm