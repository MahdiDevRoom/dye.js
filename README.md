# Dye.js (v1.3.2)
> A small, dependency-free JavaScript library for styling CLI text using ANSI escape sequences.
`dye` provides a lightweight markup syntax for applying foreground colors, background colors, text styles, RGB colors, and 256-color codes to terminal output.
> **Status:** GitHub-only — this package is currently **not published on npm**.

## Features 🎁
- 🎨 Foreground & background colors (16 colors + bright variants)
- ✨ Text styles: bold, dim, italic, underline, blink, inverse, hidden, strikethrough
- 🌈 RGB / 24-bit colors
- 🎯 256-color ANSI codes
- 📝 Simple markup syntax: `<! fg:red bold>`
- 🔄 Style reset support: `<!>`
- 📦 Render pre-built style objects
- ✅ Input validation
- 📏 Visible text length calculation
- ⚙️ Configurable error handling
- 🚀 Zero dependencies
- ☕ Test suite

## Installation 🗒️
dye.js is **not available on npm**.

Clone it from GitHub:
```bash
git clone https://github.com/MahdiDevRoom/dye.js.git
```

Import it from the source:
```js
import dye from './src/dye.js';
```

## Quick Start 🏎️
```js
import dye from './src/dye.js';

console.log(
  dye.render('<! fg:green bold>Hello, dye.js!<!>')
);
```

## Markup Syntax ☑️
```text
<! attribute:value modifier>
```

Examples:

```text
<! fg:red>
<! bg:blue>
<! fg:red bold>
<! fg:rgb(255,0,0)>
<! fg:code(202)>
<! bold underline>
```

Reset:
```text
<!>
```

or:
```text
<! reset>
```

See [`DOCS.md`](DOCS.md) for the complete API reference.

## Change Logs 📜
['CHANGELOGS.md'](Change logs).

## License ⚖️
['LICENSE'](MIT License).

## Repository 🗃️
https://github.com/MahdiDevRoom/dye.js
**dye.js is not published on npm and is currently distributed through GitHub only.**
