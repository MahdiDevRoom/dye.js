/**
 * @name Dye
 * @version 1.2.1
 * @description Dye text in CLI
 * @author MahdiDevRoom
 * @license MIT
 * @see https://github.com/MahdiDevRoom/dye.js
 * @ts-self-types="./dye.d.ts"
 */

// --- Logs ----------------------------------
const LOGS = [];
let LOGLEVEL = 1;

function log(message) {
    if (LOGLEVEL === 1) LOGS.push(message);
    if (LOGLEVEL === 2) throw new Error(message);
    if (LOGLEVEL === 3) {
        console.error(message);
        process.exit(1);
    }
}
function setLogLevel(level) {
    if (level === 1 || level === 2 || level === 3) LOGLEVEL = level;
    else log(`Invalid log level: "${level}" (expected 1, 2, or 3)`);
}
function clearLogs(){
    LOGS = [];
}

// --- ANSI ----------------------------------
const ANSI = {
    reset: '\x1b[0m',
    ef: {
        bold:      '\x1b[1m', strikethrough: '\x1b[9m',
        dim:       '\x1b[2m', hidden:        '\x1b[8m',
        italic:    '\x1b[3m', inverse:       '\x1b[7m',
        underline: '\x1b[4m', blink:         '\x1b[5m',
    },
    fg: {
        black:   '\x1b[30m', brightBlack:   '\x1b[90m',
        red:     '\x1b[31m', brightRed:     '\x1b[91m',
        green:   '\x1b[32m', brightGreen:   '\x1b[92m',
        yellow:  '\x1b[33m', brightYellow:  '\x1b[93m',
        blue:    '\x1b[34m', brightBlue:    '\x1b[94m',
        magenta: '\x1b[35m', brightMagenta: '\x1b[95m',
        cyan:    '\x1b[36m', brightCyan:    '\x1b[96m',
        white:   '\x1b[37m', brightWhite:   '\x1b[97m',
        rgb: (r, g, b) => `\x1b[38;2;${r};${g};${b}m`,
        code: (c) => `\x1b[38;5;${c}m`,
    },
    bg: {
        black:   '\x1b[40m', brightBlack:   '\x1b[100m',
        red:     '\x1b[41m', brightRed:     '\x1b[101m',
        green:   '\x1b[42m', brightGreen:   '\x1b[102m',
        yellow:  '\x1b[43m', brightYellow:  '\x1b[103m',
        blue:    '\x1b[44m', brightBlue:    '\x1b[104m',
        magenta: '\x1b[45m', brightMagenta: '\x1b[105m',
        cyan:    '\x1b[46m', brightCyan:    '\x1b[106m',
        white:   '\x1b[47m', brightWhite:   '\x1b[107m',
        rgb: (r, g, b) => `\x1b[48;2;${r};${g};${b}m`,
        code: (c) => `\x1b[48;5;${c}m`,
    }
}

// --- REGEXP --------------------------------
const REGEXP = {
    tag:     /(<![^>]*>)/g,
    current: /<!([^>]*)>/,
    isTag:   /^<![^>]*>$/,
    attr:    /(\w+)(?::([^\s(]+)(?:\(([^)]*)\))?)?/g,
    rgb:     /^rgb\(\s*([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\s*\)$/,
    code:    /^code\(\s*([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\s*\)$/,
    style:   /^(fg|bg|bold|dim|italic|underline|blink|inverse|hidden|strikethrough)$/,
    color:   /^(black|brightBlack|red|brightRed|green|brightGreen|yellow|brightYellow|blue|brightBlue|magenta|brightMagenta|cyan|brightCyan|white|brightWhite|rgb|code)$/,
};

// --- Attribute Parsing ---------------------
function parseAttrs(content) {
    const attrs = content.match(REGEXP.attr);
    if (!attrs) return null;
    
    const value = {};
    
    for (const attr of attrs) {
        const [key, val] = attr.split(':');
        value[key] = val || true;
    }
    
    return value;
}

// --- Core Style ----------------------------
function applyStyle(current, styles) {
    if (styles.reset === true) {
        for (const key of Object.keys(current)) delete current[key];
    }
    
    for (const [key, value] of Object.entries(styles)) {
        if (key === 'reset') continue;
        
        if (!REGEXP.style.test(key)) {
            log(`Invalid attribute: "${key}"`);
            continue;
        }
        
        if (key === 'fg' || key === 'bg') {
            if (REGEXP.color.test(value)) {
                current[key] = value;
                continue;
            }
            
            const rgbMatch = value.match(REGEXP.rgb);
            if (rgbMatch) {
                const [r, g, b] = rgbMatch.slice(1).map(Number);
                current[key] = { type: 'rgb', value: [r, g, b] };
                continue;
            }
            
            const codeMatch = value.match(REGEXP.code);
            if (codeMatch) {
                current[key] = { type: 'code', value: parseInt(codeMatch[1], 10) };
                continue;
            }
            
            log(`Invalid color: "${value}" for ${key}`);
            continue;
        }
        
        if (value === true) current[key] = true;
        else log(`Invalid modifier: "${key}" should be true`);
    }
    
    return current;
}

// --- Markup -> AST -------------------------
function parseMarkup(markup) {
    const ast = [];
    const parts = markup.split(REGEXP.tag).filter(Boolean);
    
    for (const part of parts) {
        if (REGEXP.isTag.test(part)) {
            const content = part.match(REGEXP.current)[1].trim();
            
            if (content) {
                const attrs = parseAttrs(content);
                
                if (attrs) ast.push({ type: 'tag', value: attrs });
                else log(`Invalid tag content: "${content}"`);
            } 
            
            else {
                
                ast.push({ type: 'tag', value: { reset: true } });
                }
        } 
        
        else ast.push({ type: 'text', value: part });
    }
    
    return ast;
}

// --- AST -> styled blocks ------------------
function parseStyle(ast) {
    const result = [];
    let current = {};
    
    for (const node of ast) {
        if (node.type === 'text') {
            if (node.value) {
                result.push({ text: node.value, style: { ...current } });
            }
            continue;
        }
        
        if (node.type === 'tag') {
            if (node.value.reset === true) {
                result.push({ text: '', style: { reset: true } });
                current = {};
            } else {
                current = applyStyle(current, node.value);
            }
        }
    }
    
    return result;
}

// --- Style object -> ANSI string -----------
function toAnsi(style = {}) {
    if (style.reset === true) {
        return ANSI.reset;
    }
    
    let result = '';
    
    for (const [key, value] of Object.entries(style)) {
        if (key === 'fg' || key === 'bg') {
            const table = key === 'fg' ? ANSI.fg : ANSI.bg;
            
            if (typeof value === 'string') {
                result += table[value] || '';
            } else if (value?.type === 'rgb') {
                const [r, g, b] = value.value;
                result += table.rgb(r, g, b);
            } else if (value?.type === 'code') {
                result += table.code(value.value);
            }
            
            continue;
        }
        
        if (value === true && ANSI.ef[key]) result += ANSI.ef[key];
    }
    
    return result;
}

// --- Create Tag ----------------------------
function createTag(style = {}) {
    const validated = applyStyle({}, style);
    const parts = [];
    
    if (style.reset === true) parts.push('reset');
    
    for (const [key, value] of Object.entries(validated)) {
        if (key === 'fg' || key === 'bg') {
            if (typeof value === 'string') parts.push(`${key}:${value}`); 
            else if (value?.type === 'rgb') parts.push(`${key}:rgb(${value.value.join(',')})`); 
            else if (value?.type === 'code') parts.push(`${key}:code(${value.value})`);
            
            continue;
        }
        
        if (value === true) parts.push(key);
    }
    
    return `<! ${parts.join(' ')}>`;
}

// --- Create Style Object -------------------
function createStyle(tag) {
    const content = REGEXP.isTag.test(tag) ? tag.slice(2, -1).trim() : tag.trim();
    const attrs = parseAttrs(content);
    
    if (!attrs) {
        log(`Invalid tag content: "${content}"`);
        return {};
    }
    
    return applyStyle({}, attrs);
}

// --- Validation ----------------------------
function validation(input) {
    let attrs;
    
    if (typeof input === 'string') {
        const content = REGEXP.isTag.test(input) ? input.slice(2, -1).trim() : input.trim();
        attrs = parseAttrs(content);
        
        if (!attrs) {
            log(`Invalid tag content: "${content}"`);
            return;
        }
    } else if (typeof input === 'object' && input !== null) {
        attrs = input;
    } else {
        log(`Invalid input: expected object or string`);
        return;
    }
    
    applyStyle({}, attrs);
}

// --- Visible Text Length -------------------
function textLength(markup) {
    if (typeof markup !== 'string') {
        log(`Invalid input: expected string`);
        return 0;
    }
    
    const ast = parseMarkup(markup);
    let len = 0;
    
    for (const node of ast) if (node.type === 'text') len += node.value.length;
    return len;
}

// --- Visible Text --------------------------
function innerText(input) {
    if (Array.isArray(input)) {
        let text = '';

        for (const block of input) if (block?.text && typeof block.text === 'string') text += block.text;

        return text;
    }
    
    if (typeof input === 'string') {
        const ast = parseMarkup(input);
        let text = '';
        
        for (const node of ast) if (node.type === 'text') text += node.value;
        
        return text;
    }
    
    log(`Invalid input: expected markup string or array of styled blocks`);
    return '';
}

// --- Render --------------------------------
function render(input, styles) {
    let output = '';
    
    // 1. render([...StyledBlock])
    if (Array.isArray(input)) {
        for (const block of input) {
            if (block?.text && typeof block.text === 'string') {
                const style = applyStyle({}, block.style || {});
                output += toAnsi(style) + block.text + ANSI.reset;
            }
        }
        return output;
    }
    
    // 2. render({ style })
    if (typeof input === 'object' && input !== null && !('text' in input)) {
        const style = applyStyle({}, input);
        return toAnsi(style);
    }
    
    // 3. render({ text, style })
    if (typeof input === 'object' && input !== null && 'text' in input) {
        if (typeof input.text !== 'string') {
            log(`Invalid input: "text" must be a string, got ${typeof input.text}`);
            return '';
        }
        
        const ast = [
            { type: 'tag', value: input.style || {} },
            { type: 'text', value: input.text }
        ];
        const blocks = parseStyle(ast);
        for (const block of blocks) {
            output += toAnsi(block.style) + block.text;
        }
        return output;
    }
    
    // 4. render(text, styleObject)
    if (typeof input === 'string' && typeof styles === 'object' && styles !== null) {
        const ast = [
            { type: 'tag', value: styles },
            { type: 'text', value: input }
        ];
        const blocks = parseStyle(ast);
        for (const block of blocks) {
            output += toAnsi(block.style) + block.text;
        }
        return output;
    }
    
    // 5. render(markupString)
    if (typeof input === 'string') {
        const ast = parseMarkup(input);
        const blocks = parseStyle(ast);
        for (const block of blocks) {
            output += toAnsi(block.style) + block.text;
        }
        return output;
    }
    
    log(`Invalid render input: expected markup string, style object, block, or array of blocks`);
    return '';
}
// --- Dye -----------------------------------
export default {
    version: '1.2.1',
    
    // Main entry points
    render,
    validation,
    
    // Helpers
    textLength,
    innerText,
    createTag,
    createStyle,
    
    // Log control
    set logLevel(num) {
        setLogLevel(num);
    },
    get logLevel() {
        return LOGLEVEL;
    },
    get logs(){
        return [...LOGS];
    },
    clearLogs,
    
    // Low‑level
    parseMarkup,
    parseStyle,
    toAnsi,
    applyStyle,
};