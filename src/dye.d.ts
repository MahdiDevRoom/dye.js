/** 
 * @name dye.d.ts
 * @see https://github.com/MahdiDevRoom/dye.js/blob/main/DOCUMENTATION.md
 */

// ─── Types ───────────────────────────────────

export type NamedColor = 
    | 'black'   | 'brightBlack' 
    | 'red'     | 'brightRed' 
    | 'green'   | 'brightGreen' 
    | 'yellow'  | 'brightYellow' 
    | 'blue'    | 'brightBlue' 
    | 'magenta' | 'brightMagenta' 
    | 'cyan'    | 'brightCyan' 
    | 'white'   | 'brightWhite';

export type Color = NamedColor | string;

export type ModifierKey = 
    | 'bold'      | 'blink' 
    | 'dim'       | 'inverse' 
    | 'italic'    | 'hidden' 
    | 'underline' | 'strikethrough';

export type Style = Partial<Record<ModifierKey, true>> & {
    fg?: Color;
    bg?: Color;
    reset?: true;
};

export type RawAttributes = Record<string, string | true>;

export type AstNode =
    | { type: 'text'; value: string }
    | { type: 'tag'; value: RawAttributes };

export interface StyledBlock {
    text: string;
    style: Style;
}

export type LogLevel = 1 | 2 | 3;

// ─── Functions ──────────────────────────────

/** Get a copy of all collected logs */
export function getLogs(): string[];

/** Clear all collected logs */
export function clearLogs(): void;

/** Parse markup string to AST */
export function parseMarkup(markup: string): AstNode[];

/** Parse AST to styled blocks */
export function parseStyle(ast: AstNode[]): StyledBlock[];

/** Apply and validate styles (mutates `current`) */
export function applyStyle(current: Style, styles: RawAttributes): Style;

/** Convert style object to ANSI escape codes */
export function toAnsi(style?: Style): string;

/** Create a tag string from a style object */
export function createTag(style?: Style): string;

/** Create a style object from a tag string */
export function createStyle(tag: string): Style;

/** Validate without rendering (errors go to logs) */
export function validation(input: string | RawAttributes): void;

/** Visible text length (tags stripped) */
export function textLength(markup: string): number;

/**  Returns only the visible text content, stripping all markup tags */
export function innerText(input: string | StyledBlock[]): string;

/** 
 * Render overloads:
 * - `render(markup)` → full markup parsing (no auto-reset)
 * - `render(text, style)` → shorthand for single styled block (with reset)
 * - `render({ text, style })` → styled block object (with reset)
 * - `render({ style })` → style-only (no reset, no text)
 * - `render([...StyledBlock])` → array of styled blocks (reset after each block)
 */
export function render(input: string): string;
export function render(input: string, styles: Style): string;
export function render(input: { text: string; style?: Style }): string;
export function render(input: { style: Style }): string;
export function render(input: StyledBlock[]): string;

// ─── Default Export ─────────────────────────
declare const dye: {
    version: string;

    // Main
    render: typeof render;
    validation: typeof validation;

    // Helpers
    textLength: typeof textLength;
    innerText: typeof innerText;
    createTag: typeof createTag;
    createStyle: typeof createStyle;

    // Log control
    logLevel: LogLevel;
    logs: string[];
    clearLogs: typeof clearLogs;

    // Low‑level
    parseMarkup: typeof parseMarkup;
    parseStyle: typeof parseStyle;
    toAnsi: typeof toAnsi;
    applyStyle: typeof applyStyle;
};

export default dye;