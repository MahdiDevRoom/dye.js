# Changelog

## [1.2.0] - 2026-08-03

### Added

- Array of `StyledBlock` support in `render()`

## [1.1.0] - 2026-08-03

### Added

- `innerText()` function to extract plain text from markup or styled blocks


## [1.0.0] - 2026-08-03

### Added

- Initial release of `dye`
- Markup syntax using `<! ... >` tags
- Foreground colors (`fg`) with 16 named colors + bright variants
- Background colors (`bg`) with 16 named colors + bright variants
- RGB / 24-bit color support (`fg:rgb(r,g,b)`, `bg:rgb(r,g,b)`)
- 256-color ANSI support (`fg:code(n)`, `bg:code(n)`)
- Text modifiers: `bold`, `dim`, `italic`, `underline`, `blink`, `inverse`, `hidden`, `strikethrough`
- Style reset with `<!>` or `<! reset>`
- Multiple styles can be combined in a single tag
- `render()` function with multiple overloads
- `validation()` for error checking without rendering
- `textLength()` for visible character length (tags stripped)
- `createTag()` to generate markup from style objects
- `createStyle()` to parse tags into style objects
- Low-level APIs: `parseMarkup()`, `parseStyle()`, `toAnsi()`, `applyStyle()`
- Logging system with 3 levels (`1` = silent, `2` = throw, `3` = exit)
- `logLevel` getter/setter
- `getLogs()` and `clearLogs()`
- TypeScript support via `dye.d.ts`
- Zero dependencies
- MIT License

### Notes

- Zero dependencies
- Designed for Node.js / CLI environments
- Currently available on GitHub only
- Not published on npm

---

[1.2.0]: https://github.com/MahdiDevRoom/dye.js/releases/tag/v1.2.0
[1.1.0]: https://github.com/MahdiDevRoom/dye.js/releases/tag/v1.1.0
[1.0.0]: https://github.com/MahdiDevRoom/dye.js/releases/tag/v1.0.0