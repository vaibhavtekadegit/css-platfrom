// ============================================
// 1000+ CSS INTERVIEW QUESTIONS DATABASE
// ============================================

const INTERVIEW_QUESTIONS = [
  // ======= BEGINNER (Questions 1-100) =======
  {
    id: 1, level: "beginner", category: "Basics",
    question: "What does CSS stand for and what is its purpose?",
    answer: "CSS stands for Cascading Style Sheets. It is the language used to describe the presentation of HTML documents — controlling layout, colors, fonts, spacing, animations, and responsive behavior. While HTML defines structure and content, CSS defines how that content looks and behaves visually.",
    example: "Without CSS: plain black text on white. With CSS: designed interfaces with typography, color, spacing, and layout.",
    code: `/* Basic CSS syntax */\nselector {\n  property: value;\n}`,
    when: "Always used alongside HTML to build any styled web interface."
  },
  {
    id: 2, level: "beginner", category: "Basics",
    question: "What are the three ways to apply CSS to HTML? When would you use each?",
    answer: "1) Inline styles: <code>style</code> attribute directly on element — highest specificity, use only for one-off overrides or dynamic JS styling. 2) Internal/Embedded: <code>&lt;style&gt;</code> tag in HTML head — useful for single-page demos, email HTML. 3) External stylesheet: <code>&lt;link&gt;</code> to .css file — best practice for all real projects, enables caching and separation of concerns.",
    code: `<!-- Inline -->\n<p style="color: red;">Text</p>\n\n<!-- Internal -->\n<style>p { color: red; }</style>\n\n<!-- External -->\n<link rel="stylesheet" href="styles.css">`,
    when: "External stylesheets for all production work. Inline for JS-driven styles. Internal for email HTML or quick prototypes."
  },
  {
    id: 3, level: "beginner", category: "Selectors",
    question: "Explain the difference between class selectors and ID selectors.",
    answer: "Class selectors (.) can be applied to multiple elements on the same page and are the standard for styling. ID selectors (#) should be unique per page and have much higher specificity (100 vs 10). In practice, avoid IDs for styling — they make CSS hard to override. IDs are better used for JavaScript hooks and anchor links.",
    code: `/* Class — reusable, low specificity */\n.card { background: white; }\n.card { border: 1px solid #ccc; }\n\n/* ID — unique, high specificity */\n#main-header { position: sticky; top: 0; }\n\n/* Bad: using ID for reusable style */\n#button { background: blue; } /* Can't reuse! */\n/* Good: */\n.btn-primary { background: blue; }`,
    when: "Use classes for all styling. Reserve IDs for JS selectors and fragment anchors."
  },
  {
    id: 4, level: "beginner", category: "Box Model",
    question: "Explain the CSS Box Model. What are its four components?",
    answer: "Every HTML element is a rectangular box with four layers: 1) Content — the actual text/image/child elements. 2) Padding — transparent space between content and border (takes background color). 3) Border — the element's edge line. 4) Margin — transparent space outside the border separating elements from each other. Total element width = content + left padding + right padding + left border + right border.",
    code: `.box {\n  width: 200px;     /* content */\n  padding: 20px;    /* inside */\n  border: 2px solid;\n  margin: 16px;     /* outside */\n  /* Total width: 200+40+4 = 244px */\n}\n\n/* Fix with border-box */\n.box { box-sizing: border-box; }\n/* Now width: 200px (padding included) */`,
    when: "Understanding the box model is fundamental to all layout work."
  },
  {
    id: 5, level: "beginner", category: "Box Model",
    question: "What is the difference between content-box and border-box? Which should you prefer?",
    answer: "content-box (default): width/height applies only to content. Padding and border add to the total. border-box: width/height includes padding and border. Much more intuitive — a 200px element stays 200px regardless of padding. You should almost always use border-box. The universal reset '*, *::before, *::after { box-sizing: border-box; }' is standard in all modern projects.",
    code: `/* content-box default */\n.box { width: 200px; padding: 20px; border: 2px solid; }\n/* Actual width: 200+40+4 = 244px! */\n\n/* border-box — recommended */\n.box { box-sizing: border-box; width: 200px; padding: 20px; border: 2px solid; }\n/* Actual width: 200px */\n\n/* Universal reset */\n*, *::before, *::after { box-sizing: border-box; }`,
    when: "Always. Add to every project as a reset."
  },
  {
    id: 6, level: "beginner", category: "Box Model",
    question: "What is margin collapse and how does it work?",
    answer: "When two vertical margins meet (adjacent block elements, or parent/child without padding/border separation), they collapse into a single margin equal to the larger of the two. This only applies to vertical margins (top/bottom), not horizontal. It doesn't happen with: flexbox/grid items, floated elements, absolutely positioned elements, or elements with overflow other than visible.",
    code: `.a { margin-bottom: 30px; }\n.b { margin-top: 20px; }\n/* Gap between a and b = 30px (NOT 50px) */\n\n/* Prevent collapse on parent */\n.parent {\n  overflow: hidden; /* or */\n  padding-top: 1px; /* or */\n  border-top: 1px solid transparent;\n}`,
    when: "Understanding this prevents layout bugs. Be especially careful with margin-top on first-child elements."
  },
  {
    id: 7, level: "beginner", category: "Units",
    question: "What is the difference between px, em, rem, %, vw, and vh?",
    answer: "px: absolute pixels. em: relative to current element's font-size (compounds in nesting). rem: relative to root html font-size (no compounding). %: relative to parent element's dimension. vw: 1% of viewport width. vh: 1% of viewport height. Best practices: rem for typography (respects user browser settings), px for borders/shadows, % for fluid widths, vw/vh for full-screen sections.",
    code: `html { font-size: 16px; }\n\n.element {\n  font-size: 1.5rem;   /* 24px from root */\n  padding: 1em;         /* = 24px (relative to own font-size) */\n  width: 50%;           /* 50% of parent */\n  height: 100vh;        /* full viewport height */\n  margin: 1rem;         /* 16px always */\n}`,
    when: "Choose units based on what they should be relative to."
  },
  {
    id: 8, level: "beginner", category: "Units",
    question: "What is the clamp() function and why is it useful?",
    answer: "clamp(min, preferred, max) sets a value that adjusts between a minimum and maximum based on a preferred value (usually viewport-relative). It enables fluid typography and sizing without media queries. The preferred value is usually a vw value so it scales with viewport, clamped to prevent being too small (mobile) or too large (desktop).",
    code: `h1 {\n  /* Never smaller than 1.5rem */\n  /* Scales with viewport (3vw) */\n  /* Never larger than 3rem */\n  font-size: clamp(1.5rem, 3vw, 3rem);\n}\n\n.container {\n  width: clamp(300px, 90%, 1200px);\n}`,
    when: "Use clamp() for responsive typography and container widths instead of multiple breakpoints."
  },
  {
    id: 9, level: "beginner", category: "Selectors",
    question: "What are CSS combinators? Explain all four.",
    answer: "1) Descendant (space): div p — targets all p elements anywhere inside div. 2) Child (>): div > p — targets only direct p children of div. 3) Adjacent sibling (+): h2 + p — first p immediately after h2. 4) General sibling (~): h2 ~ p — all p elements that come after h2 at same level. Descendant is most common. Child is useful when you need to avoid deep targeting.",
    code: `/* 1. Descendant — all p inside .card (any depth) */\n.card p { color: gray; }\n\n/* 2. Direct child — only immediate children */\n.nav > li { display: inline-block; }\n\n/* 3. Adjacent sibling — first p after h2 */\nh2 + p { font-size: 1.2em; margin-top: 0; }\n\n/* 4. General sibling — all p after h2 */\nh2 ~ p { color: #666; }`,
    when: "Use child selector to protect against deep nesting issues. Adjacent sibling for typography spacing."
  },
  {
    id: 10, level: "beginner", category: "Selectors",
    question: "What are pseudo-classes? Name 10 important ones.",
    answer: "Pseudo-classes target elements based on state or structural position without adding HTML classes. Key ones: :hover (cursor over), :focus (keyboard focused), :active (being clicked), :visited (link visited), :first-child/:last-child, :nth-child(n), :nth-of-type(n), :not(selector), :checked (checkboxes/radios), :disabled/:enabled, :placeholder-shown, :valid/:invalid, :empty, :root.",
    code: `/* State */\na:hover { text-decoration: underline; }\ninput:focus { outline: 2px solid blue; }\n\n/* Structural */\nli:first-child { font-weight: bold; }\nli:last-child { border-bottom: none; }\ntr:nth-child(even) { background: #f8f8f8; }\n\n/* Negation */\n.btn:not(.disabled) { cursor: pointer; }\n\n/* Form */\ninput:valid { border-color: green; }\ninput:invalid { border-color: red; }`,
    when: "Use pseudo-classes to style states without JavaScript class toggling."
  },
  {
    id: 11, level: "beginner", category: "Selectors",
    question: "What are pseudo-elements? Explain ::before and ::after.",
    answer: "Pseudo-elements style specific parts of an element or insert decorative content. ::before and ::after insert generated content before/after an element's content. They require the content property (can be empty string ''). They're rendered as inline elements by default. Common uses: decorative icons, quote marks, underlining effects, clearfix, tooltips.",
    code: `/* Quote marks around blockquote */\nblockquote::before { content: '\\201C'; font-size: 3em; }\nblockquote::after  { content: '\\201D'; font-size: 3em; }\n\n/* Custom list bullets */\nli::before {\n  content: '→';\n  color: blue;\n  margin-right: 8px;\n}\n\n/* Decorative underline */\n.title {\n  position: relative;\n}\n.title::after {\n  content: '';\n  position: absolute;\n  bottom: -4px; left: 0;\n  width: 40px; height: 3px;\n  background: blue;\n  border-radius: 2px;\n}`,
    when: "Use for decorative elements that don't need HTML markup. Never use for meaningful content (accessibility)."
  },
  {
    id: 12, level: "beginner", category: "Colors",
    question: "Explain different color formats in CSS: hex, rgb, hsl.",
    answer: "Hex: #rrggbb (or #rgb shorthand) — compact, most common. RGB: rgb(r, g, b) — values 0-255 — readable values. RGBA: rgba(r, g, b, a) — with opacity 0-1. HSL: hsl(hue°, saturation%, lightness%) — most intuitive for designers. Hue is 0-360° on color wheel. HSLA has alpha. Modern CSS also supports oklch() for perceptually uniform colors and wider gamut displays.",
    code: `/* All represent the same blue */\ncolor: #3b82f6;\ncolor: rgb(59, 130, 246);\ncolor: hsl(217, 91%, 60%);\ncolor: oklch(62% 0.18 255);\n\n/* With transparency */\ncolor: rgba(59, 130, 246, 0.5);\ncolor: hsla(217, 91%, 60%, 0.5);\ncolor: hsl(217 91% 60% / 50%);\n\n/* Current color keyword */\n.icon { color: currentColor; }`,
    when: "HSL is easiest to reason about — adjust lightness for hover states, saturation for disabled states."
  },
  {
    id: 13, level: "beginner", category: "Display",
    question: "What is the difference between display: block, inline, and inline-block?",
    answer: "block: Takes full available width, starts on new line, accepts width/height/vertical margins. Examples: div, p, h1. inline: Flows with text, ignores width/height, top/bottom margin/padding don't affect layout. Examples: span, a, strong. inline-block: Flows with text like inline BUT accepts box model properties like block. Good for navigation links, buttons with set dimensions.",
    code: `/* Block — full width, new line */\ndiv { display: block; }\ndiv { width: 200px; margin: 20px; } /* all work */\n\n/* Inline — flow, ignores width/height */\nspan { display: inline; }\nspan { width: 200px; } /* IGNORED */\nspan { margin-top: 20px; } /* IGNORED vertically */\n\n/* Inline-block — best of both */\n.nav-link {\n  display: inline-block;\n  width: 100px;\n  padding: 10px;\n  text-align: center;\n}`,
    when: "Use inline-block for nav items, icon+text pairs, and components that should flow but need box properties."
  },
  {
    id: 14, level: "beginner", category: "Basics",
    question: "What is the purpose of CSS reset or normalize stylesheets?",
    answer: "Browsers have default stylesheets (user agent stylesheets) that add margins, padding, and styling to elements. These defaults differ across browsers. CSS resets remove ALL browser defaults for consistency. CSS Normalize preserves useful defaults but fixes cross-browser inconsistencies. Modern projects typically use a minimal custom reset.",
    code: `/* Minimal modern reset */\n*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n}\n\nimg, picture, video, canvas, svg {\n  display: block;\n  max-width: 100%;\n}\n\na { text-decoration: none; color: inherit; }`,
    when: "Use at the start of every project for consistent baseline."
  },
  {
    id: 15, level: "beginner", category: "Typography",
    question: "How do you use web fonts? What is font-display and why does it matter?",
    answer: "Web fonts are loaded via @font-face or Google Fonts/Typekit. font-display controls how text renders while font is loading: auto (browser default), block (invisible text, then swap — FOIT), swap (fallback immediately, then swap — FOUT), fallback (100ms block, 3s swap window), optional (100ms block, no swap if slow — best for performance). Use font-display: swap or optional for best UX.",
    code: `/* Google Fonts */\n@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');\n\n/* Self-hosted */\n@font-face {\n  font-family: 'MyFont';\n  src: url('font.woff2') format('woff2'),\n       url('font.woff') format('woff');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n\nbody {\n  font-family: 'Inter', system-ui, sans-serif;\n}`,
    when: "Always add font-display: swap to prevent invisible text (FOIT) on slow connections."
  },
  // -------- BEGINNER continued (16-50) --------
  {
    id: 16, level: "beginner", category: "Typography",
    question: "What are the different font-weight values and what do they mean?",
    answer: "font-weight can be a numeric value (100-900) or keyword. 100=Thin, 200=Extra Light, 300=Light, 400=Normal/Regular, 500=Medium, 600=Semi Bold, 700=Bold, 800=Extra Bold, 900=Black. Keywords: normal=400, bold=700. bolder/lighter are relative to parent. Not all weights are available for every font — if a weight isn't available, the browser uses the nearest available.",
    code: `h1 { font-weight: 800; }  /* Extra Bold */\np  { font-weight: 400; }  /* Regular */\n.label { font-weight: 600; } /* Semi Bold */\n\n/* Variable fonts support all values */\n@font-face {\n  font-family: 'InterVar';\n  src: url('inter-var.woff2');\n  font-weight: 100 900; /* supports full range */\n}`,
    when: "Use specific numeric weights for precision. Don't rely on just 'bold' for design consistency."
  },
  {
    id: 17, level: "beginner", category: "Typography",
    question: "Explain the difference between line-height values: 1, 1.5, and 150%.",
    answer: "line-height can be: unitless number (1.5 — recommended), percentage (150%), pixel value (24px), or em (1.5em). Unitless number is best because it's relative to the element's own font-size and inherits as a multiplier (not a computed value). Children with different font sizes will have proportionally correct line-heights. 1.5 means line height = 1.5 × font-size.",
    code: `/* ✅ Unitless — inherits as ratio */\nbody { font-size: 16px; line-height: 1.5; }\n/* body line-height = 24px */\n\nh1 { font-size: 2rem; }\n/* h1 line-height = 48px (2rem × 1.5 inherited) */\n\n/* ❌ px — doesn't scale with font changes */\nbody { line-height: 24px; }\nh1 { font-size: 2rem; }\n/* h1 still 24px — too tight! */`,
    when: "Always use unitless line-height on body. Values: ~1.4 for headings, 1.5-1.7 for body text."
  },
  {
    id: 18, level: "beginner", category: "Layout",
    question: "What is the difference between visibility: hidden and display: none?",
    answer: "display: none removes the element completely from the document flow — it takes up no space, is not interactive, and is not read by screen readers (usually). visibility: hidden makes the element invisible but it STILL takes up its space in the layout. There's also opacity: 0 which makes it visually invisible but still interactive and taking up space. Use display:none to hide content, visibility:hidden when you need to maintain layout space.",
    code: `.hidden-display  { display: none; }     /* gone + no space */\n.hidden-visible  { visibility: hidden; } /* invisible + space kept */\n.hidden-opacity  { opacity: 0; }         /* invisible + space + interactive */\n\n/* Accessible hide (still read by screen readers) */\n.sr-only {\n  position: absolute;\n  width: 1px; height: 1px;\n  padding: 0; margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}`,
    when: "display:none for toggleable content. visibility:hidden for animation placeholders. opacity:0 for CSS transitions."
  },
  {
    id: 19, level: "beginner", category: "Backgrounds",
    question: "How do you create a gradient background? What types are available?",
    answer: "CSS supports three gradient types: 1) linear-gradient: along a line/angle. 2) radial-gradient: circular from a point. 3) conic-gradient: rotating around a point (like a pie chart). All accept color stops with optional position percentages. Multiple gradients can be layered with commas. Gradients are treated as background-image values, not background-color.",
    code: `/* Linear gradient */\nbackground: linear-gradient(45deg, #667eea, #764ba2);\nbackground: linear-gradient(to right, red, blue, green);\n\n/* Radial gradient */\nbackground: radial-gradient(circle at top left, #667eea, #764ba2);\n\n/* Conic gradient */\nbackground: conic-gradient(from 0deg, red, blue, green, red);\n\n/* Multiple gradients (layered) */\nbackground:\n  linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),\n  url('photo.jpg') center/cover no-repeat;\n\n/* Color stops */\nbackground: linear-gradient(135deg,\n  #667eea 0%,\n  #764ba2 50%,\n  #ec4899 100%\n);`,
    when: "Gradients replace images for backgrounds. Always provide a fallback background-color for older browsers."
  },
  {
    id: 20, level: "beginner", category: "Overflow",
    question: "What are the different values for the overflow property?",
    answer: "overflow controls what happens when content exceeds its container: visible (default — content renders outside), hidden (clip overflow, creates new BFC), scroll (always shows scrollbars), auto (scrollbars only when needed — recommended). overflow-x and overflow-y control each axis independently. overflow: hidden creates a new Block Formatting Context which can be used to clear floats.",
    code: `.container {\n  overflow: visible; /* default */\n  overflow: hidden;  /* clip */\n  overflow: scroll;  /* always scrollbars */\n  overflow: auto;    /* scrollbars if needed */\n  overflow: clip;    /* clip without BFC (modern) */\n}\n\n/* Axis control */\n.table-wrapper {\n  overflow-x: auto;  /* horizontal scroll */\n  overflow-y: visible;\n}\n\n/* Text overflow */\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis; /* adds ... */\n  max-width: 200px;\n}`,
    when: "Use overflow: auto for scroll containers. overflow: hidden to create BFC for clearfix or clip images."
  },
  // -------- INTERMEDIATE (Questions 51-150) --------
  {
    id: 51, level: "intermediate", category: "Flexbox",
    question: "What does flex: 1 actually mean? Break down the shorthand.",
    answer: "flex is shorthand for flex-grow, flex-shrink, flex-basis. flex: 1 = flex: 1 1 0% — meaning: grow to fill available space (flex-grow: 1), shrink when needed (flex-shrink: 1), start from zero width (flex-basis: 0%). This is different from flex: 1 1 auto which uses content size as basis. flex: 1 on multiple siblings makes them equal-width columns regardless of content.",
    code: `/* flex: [grow] [shrink] [basis] */\n.item { flex: 1; }\n/* Expands to: */\n.item { flex-grow: 1; flex-shrink: 1; flex-basis: 0%; }\n\n/* Common patterns */\n.fixed  { flex: 0 0 200px; }    /* Fixed 200px, no grow/shrink */\n.fill   { flex: 1; }             /* Fill remaining space */\n.equal  { flex: 1; }             /* Equal columns (all siblings) */\n.double { flex: 2; }             /* Takes 2x space of flex: 1 */\n.auto   { flex: 0 1 auto; }      /* Shrink to content, don't grow */`,
    when: "flex: 1 is one of the most-used patterns for equal-width columns and fill-available-space layouts."
  },
  {
    id: 52, level: "intermediate", category: "Flexbox",
    question: "What is the difference between align-items and align-content in Flexbox?",
    answer: "align-items aligns flex items on the CROSS axis within each LINE. Works whether wrapping or not. align-content distributes LINES of flex items on the cross axis — only has effect when flex-wrap: wrap and there are multiple lines. Think: align-items is about individual items within their row/column; align-content is about the space between the rows/columns themselves.",
    code: `.container {\n  display: flex;\n  flex-wrap: wrap;\n  height: 400px;\n\n  /* Align each item in its line */\n  align-items: center;  /* center, flex-start, flex-end, stretch, baseline */\n  \n  /* Distribute the lines (needs multiple rows!) */\n  align-content: space-between; /* only works with flex-wrap: wrap + multiple lines */\n}`,
    when: "Use align-items for single-line flex or aligning items within each row. Add align-content when you have wrapped items and want to distribute the rows."
  },
  {
    id: 53, level: "intermediate", category: "Flexbox",
    question: "How do you center an element both horizontally and vertically using Flexbox?",
    answer: "The classic 'CSS centering' problem is trivially solved with Flexbox. Apply display: flex, justify-content: center (horizontal on row direction), and align-items: center (vertical) to the container. The container needs a defined height (or use min-height: 100vh for full-screen centering).",
    code: `/* Perfect centering */\n.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n\n/* Grid alternative */\n.center-grid {\n  display: grid;\n  place-items: center; /* shorthand for both axes! */\n  min-height: 100vh;\n}\n\n/* Single item centering with margin */\n.centered-item {\n  margin: auto; /* inside a flex container */\n}`,
    when: "Use for hero sections, modal overlays, empty states, and any full-screen centered layout."
  },
  {
    id: 54, level: "intermediate", category: "Grid",
    question: "What is the difference between grid-template-columns and grid-auto-columns?",
    answer: "grid-template-columns defines EXPLICIT column tracks — the ones you plan for. grid-auto-columns defines the size of IMPLICIT tracks — columns created automatically when items overflow the explicit grid. Similarly for rows. auto-fill and auto-fit with minmax() create responsive grids without media queries. The difference between auto-fill (fills with empty tracks) and auto-fit (collapses empty tracks) matters when items don't fill the grid.",
    code: `/* Explicit 3 columns */\n.grid {\n  grid-template-columns: 1fr 2fr 1fr;\n}\n\n/* Implicit: extra items go in auto-sized columns */\n.grid {\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-columns: 150px; /* extra items are 150px */\n}\n\n/* Responsive without media queries */\n.responsive-grid {\n  display: grid;\n  /* auto-fill: creates empty tracks if space allows */\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  /* auto-fit: collapses empty tracks, items expand */\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n}`,
    when: "auto-fit minmax is the most powerful responsive grid pattern — use it for card grids, galleries, and product listings."
  },
  {
    id: 55, level: "intermediate", category: "Grid",
    question: "What is grid-template-areas and how does it improve readability?",
    answer: "grid-template-areas lets you define layout zones using named regions in ASCII-art format. Items are then assigned to zones using grid-area. This creates self-documenting CSS where the layout structure is visually obvious. Adjacent cells with same name form a single area (must be rectangular). Use . for empty cells.",
    code: `.layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: 60px 1fr 50px;\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";\n}\n\n.header  { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main    { grid-area: main; }\n.footer  { grid-area: footer; }\n\n/* Responsive: reorganize with @media */\n@media (max-width: 768px) {\n  .layout {\n    grid-template-columns: 1fr;\n    grid-template-areas:\n      "header"\n      "main"\n      "sidebar"\n      "footer";\n  }\n}`,
    when: "Use for page layouts and complex UI components where visual layout clarity is important."
  },
  {
    id: 56, level: "intermediate", category: "Positioning",
    question: "Explain how position: sticky works and common issues with it.",
    answer: "sticky is a hybrid: acts as relative until the element reaches a threshold (e.g., top: 0), then acts as fixed within its scrollable parent. Key gotcha: the sticky element sticks only within its parent's bounds — when the parent scrolls out of view, the sticky element goes with it. Common issues: 1) Parent with overflow: hidden/auto breaks sticky. 2) Parent needs enough height for sticking to matter. 3) Sibling elements in same parent push it out.",
    code: `/* Sticky header */\n.page-header {\n  position: sticky;\n  top: 0;\n  background: white;\n  z-index: 100;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n/* Sticky table headers */\nth {\n  position: sticky;\n  top: 0;\n  background: inherit;\n}\n\n/* COMMON BUG: This breaks sticky! */\n.parent {\n  overflow: hidden; /* or overflow: auto */\n  /* sticky children won't work! */\n}\n\n/* Fix: use overflow-y on scrollable ancestor */\n.scroll-container {\n  overflow-y: auto; /* on the actual scroll container */\n}`,
    when: "Perfect for sticky headers, table column headers, TOC sidebars. Check parent overflow values when it doesn't work."
  },
  {
    id: 57, level: "intermediate", category: "Specificity",
    question: "How does the :is() pseudo-class improve CSS and how does specificity work with it?",
    answer: ":is() takes a selector list and matches any element that matches any selector in the list. It takes the specificity of its MOST SPECIFIC argument. It allows grouping complex selectors and reducing repetition. :where() is identical but ALWAYS has zero specificity — great for resets. :has() is the parent selector (newly supported) that selects elements that contain specific children.",
    code: `/* Without :is() - repetitive */\nh1 a, h2 a, h3 a, h4 a, h5 a, h6 a { color: inherit; }\n\n/* With :is() */\n:is(h1, h2, h3, h4, h5, h6) a { color: inherit; }\n/* Specificity = specificity of h1 = (0,0,0,1) */\n\n/* :where() — zero specificity, easily overridden */\n:where(h1, h2, h3) { margin-block: 0.5em; }\n/* Can override with just: */\n.prose h2 { margin-block: 1em; }\n\n/* :has() — parent selector! */\n.card:has(img) { padding: 0; }\nform:has(:invalid) .submit-btn { opacity: 0.5; }`,
    when: "Use :is() to deduplicate selector lists. Use :where() for library styles you want easily overridable. :has() for state-dependent parent styling."
  },
  {
    id: 58, level: "intermediate", category: "Responsive",
    question: "What is the mobile-first approach to responsive design? Why is it preferred?",
    answer: "Mobile-first: write base CSS for mobile screens, then use min-width media queries to add complexity for larger screens. Desktop-first is the reverse. Mobile-first is preferred because: 1) Mobile is increasingly the primary device. 2) Progressive enhancement — add features as screen size allows. 3) Better performance — mobile gets minimal CSS. 4) Easier to reason about layouts from small to large. 5) Forces prioritization of essential content.",
    code: `/* Mobile-first approach */\n\n/* Base (mobile) */\n.card-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n/* Tablet and up */\n@media (min-width: 640px) {\n  .card-grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .card-grid { grid-template-columns: repeat(3, 1fr); }\n}\n\n/* Large desktop */\n@media (min-width: 1280px) {\n  .card-grid { grid-template-columns: repeat(4, 1fr); }\n}`,
    when: "Always use mobile-first in production. Common breakpoints: 480px, 640px, 768px, 1024px, 1280px, 1536px."
  },
  {
    id: 59, level: "intermediate", category: "Variables",
    question: "How do CSS custom properties (variables) differ from Sass variables?",
    answer: "CSS custom properties are native CSS, living variables — they can be changed at runtime (JS, media queries, :root overrides). They cascade and inherit like regular CSS. Sass variables are compile-time: they're resolved during compilation and become static values in the output CSS. CSS variables enable dynamic theming, component-scoped overrides, and JS-driven animations. Sass variables are better for build-time constants like breakpoint values.",
    code: `/* CSS Custom Properties — dynamic */\n:root { --color: blue; }\n\n/* Change at runtime */\ndocument.documentElement.style.setProperty('--color', 'red');\n\n/* Change in media query */\n@media (prefers-color-scheme: dark) {\n  :root { --color: lightblue; }\n}\n\n/* Scope locally */\n.danger-zone { --color: red; }\n/* All children of .danger-zone use red */\n\n/* Sass variable — compile-time only */\n$primary: blue;\n.btn { background: $primary; }\n/* Compiles to: .btn { background: blue; } */\n/* Can't change at runtime! */`,
    when: "Use CSS variables for themes, dynamic values, and runtime changes. Sass for breakpoints, calculations, and build-time utilities."
  },
  {
    id: 60, level: "intermediate", category: "Animations",
    question: "What animation properties should you use for 60fps animations and why?",
    answer: "Only transform and opacity can be animated on the GPU compositor thread without triggering layout or paint. All other properties (width, height, margin, top, left, background, etc.) trigger layout or paint which is expensive and causes jank. The compositor thread runs independently from the main thread, so even if main thread is busy with JS, transform/opacity animations remain smooth.",
    code: `/* ✅ GPU-composited — 60fps */\n@keyframes slideIn {\n  from { transform: translateX(-100%); opacity: 0; }\n  to   { transform: translateX(0); opacity: 1; }\n}\n\n/* ❌ Triggers layout — causes jank */\n@keyframes badSlide {\n  from { left: -200px; }\n  to   { left: 0; }\n}\n\n/* Use transform equivalents */\n/* Instead of width → transform: scaleX() */\n/* Instead of top/left → transform: translate() */\n/* Instead of margin → transform: translate() */\n\n/* Promote to own layer */\n.animated {\n  will-change: transform, opacity;\n}\n/* Reset after animation to save memory */`,
    when: "Always. The browser rendering pipeline is: Layout → Paint → Composite. Skip the first two for smooth animations."
  },
  // -------- ADVANCED (Questions 151-250) --------
  {
    id: 151, level: "advanced", category: "Rendering",
    question: "Explain the browser rendering pipeline in detail. What triggers reflow vs repaint?",
    answer: "The pipeline: 1) Parse HTML → DOM, Parse CSS → CSSOM. 2) Combine → Render Tree. 3) Layout/Reflow: calculate geometry (position/size). 4) Paint: fill pixels (colors, text, shadows). 5) Composite: layer GPU compositing. Reflow (most expensive) is triggered by: changing width/height/padding/margin/border, adding/removing DOM elements, font changes, viewport resize, reading layout values (offsetWidth, getBoundingClientRect). Repaint (less expensive) is triggered by: background, color, border-radius changes — no geometry change. Compositing only (cheapest): transform, opacity.",
    code: `/* Force reflow — expensive */\nel.style.width = '100px';\nconst width = el.offsetWidth; // READ after WRITE forces sync reflow!\nel.style.height = '100px';\n\n/* Batch DOM operations to avoid thrashing */\nconst updates = [{el, width: '100px'}, ...];\n\n// Bad - read/write interleaved\nupdates.forEach(u => {\n  u.el.style.width = u.width;\n  const w = u.el.offsetWidth; // causes reflow!\n});\n\n// Good - separate reads and writes\nconst widths = updates.map(u => u.el.offsetWidth); // batch reads\nupdates.forEach((u, i) => u.el.style.width = u.width); // batch writes`,
    when: "Critical for performance optimization. Use Chrome DevTools Performance tab to find layout thrashing."
  },
  {
    id: 152, level: "advanced", category: "Rendering",
    question: "What is a Stacking Context and when is one created?",
    answer: "A stacking context is an element that forms a new layer for the z-axis. Elements within a stacking context are painted together, and their z-index values are only relative within that context. An element inside a stacking context can NEVER appear above or below elements OUTSIDE that stacking context, regardless of z-index value. This is the most common cause of 'z-index not working' bugs.",
    code: `/* These properties create new stacking contexts */\n/* 1. position + z-index (not auto) */\n.modal { position: fixed; z-index: 1000; }\n\n/* 2. opacity < 1 */\n.fade { opacity: 0.99; }\n\n/* 3. transform */\n.card { transform: translateZ(0); }\n\n/* 4. filter */\n.blurred { filter: blur(0px); }\n\n/* 5. will-change: transform/opacity */\n.promoted { will-change: transform; }\n\n/* 6. isolation: isolate */\n.isolated { isolation: isolate; }\n\n/* The bug */\n.parent { transform: scale(1); /* creates stacking context! */\n  z-index: 1; }\n.child { z-index: 9999; } /* can't go above siblings of .parent! */`,
    when: "Understand this to debug z-index issues. Use isolation: isolate to deliberately create stacking contexts to contain z-index scope."
  },
  {
    id: 153, level: "advanced", category: "Architecture",
    question: "What is CSS specificity and how can specificity wars be prevented?",
    answer: "Specificity is a weight that determines which rule wins when multiple rules target the same element. Calculated as (A,B,C): A=IDs, B=classes/attributes/pseudo-classes, C=elements/pseudo-elements. Higher specificity wins regardless of source order. Wars occur when developers keep increasing specificity to override existing rules. Prevention: 1) Use only classes (never IDs) for styling. 2) Keep selectors shallow (1-2 classes max). 3) Avoid !important. 4) Use methodologies like BEM to ensure single-class specificity.",
    code: `/* Specificity: (1,0,0) */\n#header { color: blue; }\n\n/* Specificity: (0,2,1) */\n.nav .item a { color: red; }\n\n/* The winning strategy: flat, single-class */\n.nav-link { color: green; } /* specificity: (0,1,0) */\n/* Never beats #header... */\n\n/* Solution: Don't use IDs for styling! */\n/* Use layer system for intentional override order */\n@layer base, components, utilities;\n\n@layer base { a { color: blue; } }\n@layer utilities { .text-red { color: red; } }`,
    when: "Architecture decision from day 1. Retrofitting specificity hygiene in large codebases is very painful."
  },
  {
    id: 154, level: "advanced", category: "Performance",
    question: "What is Critical CSS and how does it improve performance?",
    answer: "Critical CSS is the minimum CSS required to render above-the-fold content. By inlining it in <style> in the <head>, you eliminate the render-blocking external CSS request for the initial view. Non-critical CSS is deferred (loaded asynchronously). Tools like Penthouse, Critical, or PurgeCSS identify and extract critical CSS automatically. This can reduce Time to First Contentful Paint (FCP) significantly.",
    code: `<!-- Inline critical CSS -->\n<head>\n  <style>\n    /* Critical: above-fold layout and typography */\n    *, *::before, *::after { box-sizing: border-box; }\n    body { font-family: system-ui; margin: 0; }\n    .header { position: sticky; top: 0; background: white; }\n    .hero { min-height: 100vh; display: grid; place-items: center; }\n  </style>\n\n  <!-- Defer non-critical CSS -->\n  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">\n  <noscript><link rel="stylesheet" href="styles.css"></noscript>\n</head>`,
    when: "For performance-critical sites aiming for Core Web Vitals scores. Most relevant for above-fold content optimization."
  },
  {
    id: 155, level: "advanced", category: "Modern CSS",
    question: "Explain CSS Cascade Layers (@layer). What problem do they solve?",
    answer: "CSS Cascade Layers (@layer) allow explicit control over the cascade order, making specificity management predictable. Layers declared first have LOWER priority than layers declared later. This solves the library vs. user code specificity conflict: put third-party styles in a base layer, your components in a components layer, and utilities on top. Styles in a higher-priority layer win over ALL styles in lower layers regardless of specificity.",
    code: `/* Declare layer order (first = lowest priority) */\n@layer reset, base, components, utilities;\n\n/* Reset layer — lowest priority */\n@layer reset {\n  *, *::before, *::after { box-sizing: border-box; }\n  a { text-decoration: none; }\n}\n\n/* Component styles */\n@layer components {\n  .btn { padding: 0.5em 1em; }\n  .btn-primary { background: blue; }\n}\n\n/* Utilities win over everything */\n@layer utilities {\n  .hidden { display: none !important; }\n  .mt-4 { margin-top: 1rem; }\n}\n\n/* Unlayered styles beat ALL layers */\n.special { color: red; } /* beats everything! */`,
    when: "Game-changing for design systems, third-party library integration, and eliminating specificity wars in large codebases."
  },
  {
    id: 156, level: "advanced", category: "Modern CSS",
    question: "What is the CSS container query and how does it differ from media queries?",
    answer: "Container queries allow styles to apply based on the size of a CONTAINING element, not the viewport. This solves the component-level responsiveness problem: a card component can be responsive whether it's in a sidebar (narrow) or main content (wide) without knowing viewport size. Media queries respond to the global viewport. Container queries enable truly reusable, context-aware components.",
    code: `/* Define a container */\n.card-wrapper {\n  container-type: inline-size; /* or size */\n  container-name: card;\n}\n\n/* Style card based on ITS container's width */\n@container card (min-width: 400px) {\n  .card {\n    display: grid;\n    grid-template-columns: 150px 1fr;\n  }\n}\n\n@container card (min-width: 600px) {\n  .card { padding: 2rem; }\n  .card__title { font-size: 1.5rem; }\n}\n\n/* Style queries (CSS variable states) */\n@container style(--theme: dark) {\n  .card { background: #1e293b; }\n}`,
    when: "Use for reusable components in design systems where the component shouldn't need to know about the global layout."
  },
  {
    id: 157, level: "advanced", category: "Typography",
    question: "What is font-size-adjust and why does it matter for fallback fonts?",
    answer: "font-size-adjust preserves legibility when falling back to a secondary font. It adjusts the font-size to maintain the aspect ratio (x-height to font-size ratio) of the primary font. When different fonts at the same font-size have different apparent sizes due to x-height differences, this creates jarring layout shifts. font-size-adjust solves this. Modern CSS also has the @font-face size-adjust and ascent-override/descent-override descriptors for more precise control.",
    code: `body {\n  font-family: Helvetica, Arial, sans-serif;\n  /* Helvetica x-height / font-size = 0.53 */\n  font-size-adjust: 0.53;\n  /* If Helvetica fails, fallbacks are scaled\n     so their x-height matches Helvetica's */\n}\n\n/* Modern: per-font adjustments */\n@font-face {\n  font-family: 'Fallback';\n  src: local('Arial');\n  /* Adjust to match primary font metrics */\n  size-adjust: 95%;\n  ascent-override: 90%;\n  descent-override: 25%;\n  line-gap-override: 0%;\n}`,
    when: "Critical for preventing Cumulative Layout Shift (CLS) caused by font fallback swaps during loading."
  },
  {
    id: 158, level: "advanced", category: "Rendering",
    question: "Explain the contain property and its performance implications.",
    answer: "CSS contain tells the browser that an element's subtree is independent from the rest of the page, enabling aggressive rendering optimizations. Values: layout (element's layout doesn't affect outside), style (counter/quote scope), paint (don't render outside bounds), size (element's size doesn't depend on children), inline-size. contain: content = layout + style + paint. contain: strict = all + size. This prevents the browser from needing to check if changes inside propagate outside.",
    code: `/* content: layout + style + paint */\n.card {\n  contain: content;\n  /* Browser knows: changes inside won't affect outside layout */\n  /* Enables parallel rendering of multiple cards */\n}\n\n/* Layout containment */\n.isolated {\n  contain: layout;\n  /* Internal floats, z-index, counters don't escape */\n}\n\n/* Size containment (with CSS Grid/Flex fill patterns) */\n.grid-item {\n  contain: size; /* must provide explicit size */\n  width: 200px;\n  height: 200px;\n}\n\n/* Modern: content-visibility */\n.offscreen-section {\n  content-visibility: auto; /* skip rendering until near viewport */\n  contain-intrinsic-size: 500px; /* placeholder size */\n}`,
    when: "Use contain: content on repeated UI components (cards, list items, table rows) for significant paint performance gains."
  },
  // -------- SENIOR LEVEL (Questions 251-350) --------
  {
    id: 251, level: "senior", category: "Architecture",
    question: "How would you design a CSS architecture for a large-scale design system used by 50+ developers?",
    answer: "A production design system CSS architecture should: 1) Use CSS custom properties as design tokens (type scale, spacing scale, color palette, shadows). 2) Layer system with @layer for predictable cascade. 3) BEM or CSS Modules for component isolation. 4) Single-source tokens that generate both CSS vars and JS constants. 5) Strict specificity budget (all components = single class specificity). 6) Utility layer for overrides. 7) Automated linting (Stylelint with custom rules). 8) Visual regression testing for component changes.",
    code: `/* Design Tokens Layer */\n@layer tokens {\n  :root {\n    /* Spacing scale */\n    --space-1: 0.25rem;  /* 4px */\n    --space-2: 0.5rem;   /* 8px */\n    /* ... */\n    \n    /* Type scale */\n    --text-xs: clamp(0.75rem, 1.5vw, 0.875rem);\n    --text-sm: clamp(0.875rem, 2vw, 1rem);\n    /* ... */\n    \n    /* Semantic colors */\n    --color-background: var(--neutral-50);\n    --color-surface: var(--neutral-0);\n    --color-primary: var(--blue-600);\n  }\n}\n\n@layer components {\n  /* Components only use semantic tokens */\n  .btn { padding: var(--space-2) var(--space-4); }\n}\n\n@layer utilities {\n  /* Override anything */\n  .sr-only { position: absolute; width: 1px; /* ... */ }\n}`,
    when: "Essential for any team larger than 3-4 engineers. Establishes contracts between design and engineering."
  },
  {
    id: 252, level: "senior", category: "Performance",
    question: "A page has a CSS bundle of 500KB. How would you systematically reduce it?",
    answer: "Systematic approach: 1) Audit with PurgeCSS/UnusedCSS to find dead code. 2) Split CSS — extract critical (inline) and defer rest. 3) Analyze specificity pollution — complex selectors increase payload. 4) Review utility class usage vs component classes. 5) Check for duplicate declarations via Stylelint. 6) Evaluate third-party CSS dependencies. 7) Use code splitting aligned with JS routes. 8) Leverage CSS Modules to scope styles and eliminate global namespace. 9) Remove IE11 prefixes if not needed. 10) Minification passes (cssnano). Target: <50KB compressed for most SPAs.",
    code: `/* postcss.config.js */\nmodule.exports = {\n  plugins: [\n    require('postcss-import'),\n    require('tailwindcss'),\n    require('autoprefixer'),\n    require('cssnano')({\n      preset: ['advanced', {\n        discardComments: { removeAll: true },\n        reduceIdents: true,\n        mergeRules: true,\n      }]\n    })\n  ]\n};\n\n// PurgeCSS config\nmodule.exports = {\n  content: ['./src/**/*.{html,js,jsx,tsx}'],\n  css: ['./src/**/*.css'],\n  safelist: [/^toast-/, /^modal-/, /^is-/]\n};\n\n/* Route-based CSS splitting */\n// Import in route component\nimport './dashboard.css';`,
    when: "Bundle optimization strategy for every production site. Critical for Core Web Vitals (LCP/FCP)."
  },
  {
    id: 253, level: "senior", category: "Architecture",
    question: "How would you implement a robust dark mode that works with: user preference, manual toggle, and persists across sessions?",
    answer: "Three-layer approach: 1) Detect system preference via prefers-color-scheme. 2) Allow user override stored in localStorage. 3) Apply via data-theme attribute on <html>. CSS uses attribute selector to toggle CSS variable values. Critical: avoid flash of wrong theme (FOVT) by applying theme class synchronously in <head> script. Server-side rendering should read from cookie/header to avoid FOVT.",
    code: `/* CSS: semantic variables */\n:root {\n  --bg: #ffffff;\n  --text: #1e293b;\n  --surface: #f8fafc;\n}\n\n[data-theme="dark"] {\n  --bg: #0f172a;\n  --text: #e2e8f0;\n  --surface: #1e293b;\n}\n\n/* System preference fallback */\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n    --bg: #0f172a;\n    --text: #e2e8f0;\n  }\n}\n\n/* JS: in <head> to avoid FOVT */\n(function() {\n  const stored = localStorage.getItem('theme');\n  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';\n  document.documentElement.setAttribute('data-theme', stored || system);\n})();\n\n/* Toggle */\nfunction toggleTheme() {\n  const current = document.documentElement.getAttribute('data-theme');\n  const next = current === 'dark' ? 'light' : 'dark';\n  document.documentElement.setAttribute('data-theme', next);\n  localStorage.setItem('theme', next);\n}`,
    when: "Production-grade implementation pattern. The FOVT prevention via <head> script is what separates good implementations from bad ones."
  },
  {
    id: 254, level: "senior", category: "Performance",
    question: "What is the CSS contain-intrinsic-size property and how does it prevent layout shifts with content-visibility?",
    answer: "content-visibility: auto skips rendering off-screen content, dramatically improving initial paint performance. However, if the browser doesn't know the element's size, it collapses to 0 causing CLS (Cumulative Layout Shift) when content comes into view. contain-intrinsic-size provides a placeholder size estimate. Modern CSS also has auto keyword: contain-intrinsic-size: auto 500px — uses a placeholder, but remembers actual size after first render.",
    code: `/* Without contain-intrinsic-size */\n.section {\n  content-visibility: auto;\n  /* Size unknown = 0 height = CLS when scrolling! */\n}\n\n/* With placeholder size */\n.section {\n  content-visibility: auto;\n  contain-intrinsic-size: 0 500px; /* width height */\n}\n\n/* Modern: auto remembers actual size */\n.section {\n  content-visibility: auto;\n  contain-intrinsic-size: auto 500px;\n  /* After first render, uses actual height! */\n}\n\n/* Performance impact on long pages */\n/* 100 sections × 500px = 50000px total height maintained */\n/* But only visible sections are rendered! */\n/* Can improve rendering time by 5-10x on content-heavy pages */`,
    when: "Essential for long-form content pages (blogs, docs, feeds). Can reduce initial render time by 50%+ on content-heavy pages."
  },
  {
    id: 255, level: "senior", category: "Debugging",
    question: "Walk me through debugging a CSS layout issue in production. What's your systematic approach?",
    answer: "1) Isolate: Can I reproduce in a minimal test case? 2) Box model check: DevTools → select element → Computed tab → verify padding/margin/border. 3) Inheritance audit: Computed styles show all inherited properties. 4) Specificity: DevTools → Styles tab shows which rules win and which are crossed out. 5) Stacking context: Check for unexpected z-index blocks. 6) Flex/Grid inspector: Chrome has visual flex/grid overlays. 7) Overflow check: Is content clipping unexpectedly? 8) Screenshot comparison: Before/after with rulers. 9) Cross-browser: Does it differ in Firefox (uses different rendering)? 10) Network: Is the CSS file actually loading (304/200)?",
    code: `/* Debugging techniques */\n\n/* 1. Outline everything (no layout impact) */\n* { outline: 1px solid red; }\n\n/* 2. Background color everything */\n* { background: rgba(255,0,0,0.1) !important; }\n\n/* 3. Highlight specific element */\n.suspect { outline: 3px solid blue !important; }\n\n/* 4. Check computed styles in JS */\nconsole.log(window.getComputedStyle(el).display);\nconsole.log(window.getComputedStyle(el).position);\n\n/* 5. Check applied classes */\nconsole.log(el.className, el.getAttribute('style'));\n\n/* 6. Force visible overflow */\n.parent { overflow: visible !important; }`,
    when: "Systematic debugging is faster than random trial and error. Build intuition for common failure modes."
  },
  {
    id: 256, level: "senior", category: "Architecture",
    question: "What are CSS Houdini APIs and how do they extend CSS capabilities?",
    answer: "CSS Houdini is a set of low-level APIs that expose parts of the CSS engine to JavaScript, allowing developers to extend CSS. Key APIs: 1) Paint API: register a CSS painter with custom drawing logic (used as background-image). 2) Layout API: custom layout algorithms (like masonry). 3) Animation Worklet: off-main-thread custom animations. 4) Typed OM: type-safe CSS value access. 5) Properties & Values API: register custom properties with types and inheritance rules. Most powerful currently: @property for typed custom properties.",
    code: `/* @property — Typed custom properties */\n@property --angle {\n  syntax: '<angle>';\n  inherits: false;\n  initial-value: 0deg;\n}\n\n/* Now you can animate it! (Custom properties aren't normally animatable) */\n.animated-gradient {\n  background: conic-gradient(from var(--angle), #667eea, #764ba2);\n  transition: --angle 1s ease;\n}\n\n.animated-gradient:hover {\n  --angle: 360deg;\n}\n\n/* Paint API (requires JS registration) */\n.element {\n  background-image: paint(ripple-effect);\n  --ripple-color: blue;\n}`,
    when: "Cutting-edge use cases: smooth animated gradients, custom paint effects, performance-critical animations. @property has wide browser support now."
  },
  {
    id: 257, level: "senior", category: "Accessibility",
    question: "How do CSS and accessibility intersect? What are the critical CSS accessibility considerations?",
    answer: "1) Never remove focus outlines without replacing them — keyboard users lose navigation. 2) prefers-reduced-motion should disable/simplify animations. 3) Color contrast ratios (WCAG AA: 4.5:1 for text, 3:1 for large text). 4) Don't hide with visibility:hidden/opacity:0 — screen readers still read it. Use clip technique for visually hidden but accessible content. 5) Forced colors / high contrast mode — avoid background images for informational content. 6) Don't rely on color alone to convey information.",
    code: `/* Never do this */\n.btn:focus { outline: none; }\n\n/* Replace with visible focus indicator */\n.btn:focus-visible {\n  outline: 3px solid #005fcc;\n  outline-offset: 2px;\n  border-radius: 4px;\n}\n\n/* Respect reduced motion */\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n\n/* Visually hidden but accessible */\n.sr-only {\n  position: absolute;\n  width: 1px; height: 1px;\n  padding: 0; margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}`,
    when: "Accessibility is a legal requirement in many countries. Treat it as a first-class concern, not an afterthought."
  },
  {
    id: 258, level: "senior", category: "Modern CSS",
    question: "Explain CSS Subgrid. What problem does it solve and when is it essential?",
    answer: "CSS Subgrid allows a nested grid item to participate in its parent grid's track sizes, rather than creating its own independent grid. This solves the 'aligned nested content' problem — when you have cards with variable content, you want headers/bodies/footers of ALL cards to align with each other, not just within each card. Without subgrid: must use JavaScript to equalize heights, or all content must be same length. With subgrid: grid alignment propagates through the DOM naturally.",
    code: `.card-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto 1fr auto; /* header, body, footer */\n  gap: 20px;\n}\n\n.card {\n  /* Span 3 rows of parent grid */\n  display: grid;\n  grid-row: span 3;\n  \n  /* Participate in parent's row tracks! */\n  grid-template-rows: subgrid;\n}\n\n/* Now card's header/body/footer align across ALL cards! */\n.card__header { /* always row 1 */ }\n.card__body   { /* always row 2 — fills remaining space */ }\n.card__footer { /* always row 3 */ }\n\n/* Without subgrid, you'd need: */\n.card { display: flex; flex-direction: column; }\n.card__body { flex: 1; } /* only stretches within card */`,
    when: "Essential for card grids, data tables, and any pattern where nested content needs to align across sibling containers."
  }
];
