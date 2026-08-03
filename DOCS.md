# Docs

Complete API and syntax reference for dye.js.

> **Important:** dye.js is **not published on npm**. The project is currently available through GitHub only.

Repository: https://github.com/MahdiDevRoom/dye.js

## Markup

dye.js uses:

```text
<! ... >
```

Examples:

```text
<!fg:red>
<!bg:blue>
<!fg:red bold>
<!fg:rgb(255,0,0)>
<!fg:code(202)>
<!bold underline>
```

Both compact and spaced tags are accepted:

```text
<!fg:red>
<! fg:red >
```

## Reset

An empty tag resets the current style:

```text
<!>
```

The explicit reset attribute is also supported:

```text
<!reset>
```

Example:

```js
dye.render(
  '<!fg:red>Red <!fg:blue>Blue <!reset>Normal'
);
```

## Colors

### Foreground

Use `fg:`:

```text
<!fg:red>
```

Supported colors:

```text
black
brightBlack
red
brightRed
green
brightGreen
yellow
brightYellow
blue
brightBlue
magenta
brightMagenta
cyan
brightCyan
white
brightWhite
```

### Background

Use `bg:`:

```text
<!bg:blue>
```

The same color names are supported.

### RGB

```text
fg:rgb(r,g,b)
bg:rgb(r,g,b)
```

Each component must be `0`–`255`.

Example:

```js
dye.render('<!fg:rgb(255,0,100)>Custom<!>');
```

### 256-color

```text
fg:code(n)
bg:code(n)
```

`n` must be `0`–`255`.

## Effects

| Effect | Syntax |
|---|---|
| Bold | `bold` |
| Dim | `dim` |
| Italic | `italic` |
| Underline | `underline` |
| Blink | `blink` |
| Inverse | `inverse` |
| Hidden | `hidden` |
| Strikethrough | `strikethrough` |

Example:

```js
dye.render('<!bold italic underline>Styled text<!>');
```

## `render()`

Renders markup or style objects.

### Markup

```js
dye.render('<!fg:red bold>Error<!>');
```

### Text + style

```js
dye.render(
  'Hello',
  {
    fg: 'green',
    bold: true
  }
);
```

### Block object

```js
dye.render({
  text: 'Hello',
  style: {
    fg: 'cyan',
    italic: true
  }
});
```

### Style-only object

```js
dye.render({
  fg: 'red',
  bold: true
});
```

Returns ANSI codes followed by a reset.

## `validation()`

Validates a style string or object.

```js
dye.validation('<!fg:red bold>');
```

or:

```js
dye.validation({
  fg: 'cyan',
  bold: true
});
```

Invalid values are reported through the configured log level.

## `textLength()`

Returns visible text length while ignoring tags.

```js
const length = dye.textLength(
  '<!fg:red>Hello<!> World'
);
```

Useful for CLI alignment and tables.

## `createTag()`

Converts a style object into a markup tag.

```js
const tag = dye.createTag({
  fg: 'red',
  bold: true,
  underline: true
});
```

Example result:

```text
<! fg:red bold underline>
```

RGB style objects:

```js
dye.createTag({
  fg: {
    type: 'rgb',
    value: [255, 0, 100]
  }
});
```

## `createStyle()`

Converts a tag into a normalized style object.

```js
const style = dye.createStyle(
  '<!fg:red bold underline>'
);
```

Result:

```js
{
  fg: 'red',
  bold: true,
  underline: true
}
```

The wrapper is optional:

```js
dye.createStyle('fg:red bold');
```

## `logLevel`

Public getter/setter.

```js
console.log(dye.logLevel);

dye.logLevel = 2;
```

Values:

| Level | Behavior |
|---|---|
| `1` | Collect errors |
| `2` | Throw errors |
| `3` | Print and exit |

## `logs`

Returns a copy of collected logs.

```js
console.log(dye.logs);
```

Example:

```js
dye.logLevel = 1;

dye.validation({
  fg: 'invalid'
});

console.log(dye.logs);
```

## `clearLogs()`

Clears collected logs:

```js
dye.clearLogs();
```

## `parseMarkup()`

Converts markup into an AST.

```js
const ast = dye.parseMarkup(
  '<!fg:red>Hello<!> World'
);
```

Conceptual result:

```js
[
  {
    type: 'tag',
    value: {
      fg: 'red'
    }
  },
  {
    type: 'text',
    value: 'Hello'
  },
  {
    type: 'tag',
    value: {
      reset: true
    }
  },
  {
    type: 'text',
    value: ' World'
  }
]
```

## `parseStyle()`

Converts the AST into styled blocks:

```js
const ast = dye.parseMarkup(
  '<!fg:red>Hello<!> World'
);

const blocks = dye.parseStyle(ast);
```

Example shape:

```js
{
  text: 'Hello',
  style: {
    fg: 'red'
  }
}
```

## `toAnsi()`

Converts a normalized style object into ANSI escape sequences:

```js
const ansi = dye.toAnsi({
  fg: 'red',
  bold: true
});
```

It does not add text.

## `applyStyle()`

Validates and normalizes style objects:

```js
const style = dye.applyStyle(
  {},
  {
    fg: 'red',
    bold: true
  }
);
```

This is a low-level API intended mainly for advanced use and testing.

## Style Object Format

Basic:

```js
{
  fg: 'red',
  bg: 'black',
  bold: true,
  underline: true
}
```

RGB:

```js
{
  fg: {
    type: 'rgb',
    value: [255, 0, 0]
  }
}
```

256-color:

```js
{
  fg: {
    type: 'code',
    value: 202
  }
}
```

## Public API Summary

| API | Purpose |
|---|---|
| `version` | Current version |
| `render()` | Render markup or style objects |
| `validation()` | Validate input |
| `textLength()` | Get visible text length |
| `createTag()` | Create markup from style |
| `createStyle()` | Create style from markup |
| `logLevel` | Get/set error handling |
| `logs` | Read collected logs |
| `clearLogs()` | Clear collected logs |
| `parseMarkup()` | Parse markup into AST |
| `parseStyle()` | Resolve AST into styled blocks |
| `toAnsi()` | Convert style to ANSI |
| `applyStyle()` | Validate/normalize styles |

## Test Coverage

The provided test suite exercises:

1. Basic markup
2. Multiple styles
3. RGB colors
4. Background colors
5. Combined styles
6. Reset behavior
7. `createTag()` / `createStyle()`
8. `render(text, style)`
9. `render({ text, style })`
10. Style-only rendering
11. Validation
12. Edge cases

## Rendering Pipeline

```text
Input
 │
 ├── Markup string
 │      │
 │      ▼
 │  parseMarkup()
 │      │
 │      ▼
 │     AST
 │      │
 │      ▼
 │  parseStyle()
 │      │
 │      ▼
 │ Styled Blocks
 │      │
 │      ▼
 │   toAnsi()
 │      │
 │      ▼
 │  ANSI Output
 │
 └── Style Object
        │
        ▼
    applyStyle()
        │
        ▼
      toAnsi()
        │
        ▼
    ANSI Output
```
## TypeScript

The source uses:

```js
@ts-self-types="./dye.d.ts"
```

Keep the declaration file according to the project's type setup.
