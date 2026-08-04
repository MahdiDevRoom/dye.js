import dye from '../src/dye.js';

console.log('----------------------------------------');
console.log(' # DYE TEST SUITE ');
console.log('----------------------------------------');

// --- [1] Basic Markup --------------------------------
console.log('📌 [1] Basic Markup');
const ms1 = '<!bold>Hello <!fg:blue>Dye.js <!>';
console.log(' $ Input:', ms1);
console.log(' $ Render:', dye.render(ms1));
console.log(' $ TextLength:', dye.textLength(ms1));
console.log(' $ InnerText:', dye.innerText(ms1));
console.log();

// --- [2] Multiple Styles -----------------------------
console.log('📌 [2] Multiple Styles (with manual reset)');
const ms2 = '<!fg:red bold>Error<!> <!fg:green>Success<!>';
console.log('  Input:', ms2);
console.log('  Render:', dye.render(ms2));
console.log('  TextLength:', dye.textLength(ms2));
console.log();

// --- 3. RGB Colors ----------------------------
console.log('📌 3. RGB Colors');
const ms3 = '<!fg:rgb(255,0,0)>Red <!fg:rgb(0,255,0)>Green <!fg:rgb(0,0,255)>Blue<!>';
console.log('  Input:', ms3);
console.log('  Render:', dye.render(ms3));
console.log('  TextLength:', dye.textLength(ms3));
console.log();

// --- 4. Background Colors ---------------------
console.log('📌 4. Background Colors');
const ms4 = '<!bg:red> Red BG <!> <!bg:blue> Blue BG <!>';
console.log('  Input:', ms4);
console.log('  Render:', dye.render(ms4));
console.log('  TextLength:', dye.textLength(ms4));
console.log();

// --- 5. Combined Styles ----------------------
console.log('📌 5. Combined Styles');
const ms5 = '<!fg:yellow bold underline>Important<!> <!fg:cyan italic>note<!>';
console.log('  Input:', ms5);
console.log('  Render:', dye.render(ms5));
console.log('  TextLength:', dye.textLength(ms5));
console.log();

// --- 6. Reset Behavior ------------------------
console.log('📌 6. Reset Behavior (no auto-reset)');
const ms6 = '<!fg:red>Red <!fg:blue>Blue <!reset>Normal';
console.log('  Input:', ms6);
console.log('  Render:', dye.render(ms6));
console.log('  TextLength:', dye.textLength(ms6));
console.log();

// --- 7. Without Reset -------------------------
console.log('📌 7. Without Reset (style bleeds)');
const ms7 = '<!fg:red>Red <!fg:blue>Blue Normal';
console.log('  Input:', ms7);
console.log('  Render:', dye.render(ms7));
console.log('  TextLength:', dye.textLength(ms7));
console.log();

// --- 8. createTag & createStyle --------------
console.log('📌 8. createTag / createStyle');
const style = { fg: 'red', bold: true, underline: true };
const tag = dye.createTag(style);
console.log('  Style:', style);
console.log('  Tag:', tag);
console.log('  Style back:', dye.createStyle(tag));
console.log();

// --- 9. render(text, style) ------------------
console.log('📌 9. render(text, style)');
const result1 = dye.render('Hello World', { fg: 'green', bold: true });
console.log('  Input: "Hello World", { fg: "green", bold: true }');
console.log('  Render:', result1);
console.log();

// --- 10. render({ text, style }) --------------
console.log('📌 10. render({ text, style })');
const result2 = dye.render({ text: 'Styled Block', style: { fg: 'rgb(255,0,255)', italic: true } });
console.log('  Input: { text: "Styled Block", style: { fg: "rgb(255,0,255)", italic: true } }');
console.log('  Render:', result2);
console.log();

// --- 11. Only Style (no text) ----------------
console.log('📌 11. Only Style (no auto-reset)');
const ansiOnly = dye.render({ fg: 'cyan' });
console.log('  Input: { fg: "cyan" }');
console.log('  Render (raw):', JSON.stringify(ansiOnly));
console.log('  Render (visible):', ansiOnly || '(empty string)');
console.log();

// --- 12. Array of StyledBlocks ---------------
console.log('📌 12. Array of StyledBlocks (with auto-reset)');
const blocks = [
    { text: 'Error', style: { fg: 'red', bold: true } },
    { text: ' Warning', style: { fg: 'yellow' } },
    { text: ' Success', style: { fg: 'green' } }
];
console.log('  Input:', blocks);
console.log('  Render:', dye.render(blocks));
console.log();

// --- 13. Validation ----------------------------
console.log('📌 13. Validation');
dye.validation('<!fg:red bold>');
dye.validation('<!fg:invalid>');
console.log('  Logs after validation:', dye.logs.length ? dye.logs : '✅ No errors');
console.log();

// --- 14. Edge Cases ----------------------------
console.log('📌 14. Edge Cases');
console.log('  Empty tag:', dye.render('<!>'));
console.log('  No tags:', dye.render('Plain text'));
console.log('  Multiple resets:', dye.render('A <!reset> B <!reset> C'));
console.log('  Only style tag:', dye.render('<!fg:red>'));
console.log();

// --- Summary ----------------------------------
console.log('═══════════════════════════════════════');
console.log('  ✅ TEST COMPLETE');
console.log('  Total logs:', dye.logs.length);
console.log('═══════════════════════════════════════');