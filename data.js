// ============================================
// CSS MASTERY PLATFORM - Course Data
// ============================================

const COURSE_DATA = {
  levels: [
    {
      id: "level-1",
      title: "CSS Fundamentals",
      emoji: "🌱",
      badge: "L1",
      color: "green",
      class: "lv1",
      description: "Master the building blocks of CSS — selectors, box model, units, and core properties.",
      topics: [
        {
          id: "intro-css",
          title: "What is CSS?",
          icon: "🎨",
          lessonData: {
            tag: "Level 1 • Fundamentals",
            tagColor: "green",
            title: "What is CSS?",
            subtitle: "CSS (Cascading Style Sheets) is the language that styles the visual presentation of HTML. It controls layout, colors, fonts, spacing, and much more.",
            sections: [
              {
                type: "explanation",
                title: "📖 Understanding CSS",
                content: `<p>CSS stands for <strong>Cascading Style Sheets</strong>. It's the presentation layer of the web — HTML structures content, CSS makes it beautiful and responsive.</p>
                <p>CSS works by targeting HTML elements with <em>selectors</em> and applying <em>declarations</em> (property-value pairs) to them.</p>
                <div class="info-box info-tip">
                  <span class="ib-icon">💡</span>
                  <div class="ib-body"><strong>Key Concept</strong>The "Cascading" in CSS means styles flow downward — later styles override earlier ones, child elements inherit from parents, and specificity determines which rules win.</div>
                </div>`,
              },
              {
                type: "code",
                lang: "css",
                label: "Basic CSS Syntax",
                code: `/* Selector { Property: Value; } */

selector {
  property: value;
  another-property: another-value;
}

/* Example */
h1 {
  color: #2563eb;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
}`
              },
              {
                type: "explanation",
                title: "🔗 Three Ways to Add CSS",
                content: `<ul>
                  <li><strong>Inline:</strong> <code>&lt;p style="color:red"&gt;</code> — highest specificity, avoid in production</li>
                  <li><strong>Internal:</strong> <code>&lt;style&gt;</code> tag inside HTML head — good for small single-page styles</li>
                  <li><strong>External:</strong> Linked .css file — <strong>recommended for all real projects</strong></li>
                </ul>`,
              },
              {
                type: "infobox",
                kind: "warn",
                title: "⚠️ Common Mistake",
                content: "Don't over-use inline styles! They're hard to maintain and override. Always prefer external stylesheets for maintainable, scalable CSS."
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html>
<head><style id="user-css">
/* Your CSS goes in the editor */
</style></head>
<body>
  <h1>Hello, CSS World!</h1>
  <p>Edit the CSS on the left to style this page.</p>
  <div class="box">I'm a styled box</div>
  <button>Click Me</button>
</body>
</html>`,
              css: `/* Try editing this CSS! */
body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f4ff;
  padding: 30px;
  color: #1e293b;
}

h1 {
  color: #6366f1;
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  color: #64748b;
  font-size: 1.1rem;
}

.box {
  background: white;
  border: 2px solid #6366f1;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
  font-weight: bold;
  color: #6366f1;
}

button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}`
            }
          }
        },
        {
          id: "selectors",
          title: "CSS Selectors",
          icon: "🎯",
          lessonData: {
            tag: "Level 1 • Selectors",
            tagColor: "green",
            title: "CSS Selectors",
            subtitle: "Selectors are how you target HTML elements to apply styles. Master them, and you gain precise control over any element on the page.",
            sections: [
              {
                type: "explanation",
                title: "🔹 Basic Selectors",
                content: `<p>Selectors range from simple element targeting to complex combinators. Here's the essential vocabulary:</p>
                <ul>
                  <li><strong>Element:</strong> <code>p</code> — targets all paragraphs</li>
                  <li><strong>Class:</strong> <code>.card</code> — targets elements with class="card"</li>
                  <li><strong>ID:</strong> <code>#header</code> — targets element with id="header"</li>
                  <li><strong>Universal:</strong> <code>*</code> — targets every element</li>
                  <li><strong>Attribute:</strong> <code>[type="text"]</code> — targets by attribute value</li>
                </ul>`
              },
              {
                type: "code",
                lang: "css",
                label: "Selector Examples",
                code: `/* Element Selector */
p { color: blue; }

/* Class Selector */
.highlight { background: yellow; }

/* ID Selector */
#main-header { font-size: 2rem; }

/* Universal Selector */
* { box-sizing: border-box; }

/* Attribute Selectors */
input[type="email"] { border-color: green; }
a[href^="https"] { color: green; }  /* starts with */
a[href$=".pdf"] { color: red; }     /* ends with */
a[href*="wiki"] { font-style: italic; } /* contains */

/* Grouping */
h1, h2, h3 { font-family: 'Georgia', serif; }

/* Combinators */
div p { color: gray; }         /* descendant */
div > p { color: navy; }       /* direct child */
h2 + p { margin-top: 0; }     /* adjacent sibling */
h2 ~ p { opacity: 0.9; }      /* general sibling */`
              },
              {
                type: "explanation",
                title: "🔹 Pseudo-Classes",
                content: `<p>Pseudo-classes target elements based on state or position — they don't require adding classes to HTML:</p>
                <ul>
                  <li><strong>:hover</strong> — cursor over element</li>
                  <li><strong>:focus</strong> — element has keyboard focus</li>
                  <li><strong>:first-child / :last-child</strong> — position in parent</li>
                  <li><strong>:nth-child(n)</strong> — every nth element</li>
                  <li><strong>:not(selector)</strong> — negation</li>
                  <li><strong>:checked / :disabled</strong> — form states</li>
                </ul>`
              },
              {
                type: "code",
                lang: "css",
                label: "Pseudo-Classes in Action",
                code: `/* State pseudo-classes */
button:hover { background: darkblue; }
input:focus { outline: 2px solid blue; border-color: blue; }
a:visited { color: purple; }
a:active { color: red; }

/* Structural pseudo-classes */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f8f8f8; }
li:nth-child(3n+1) { color: blue; } /* every 3rd starting at 1 */
p:nth-of-type(2) { font-size: 1.2em; }

/* Useful pseudo-classes */
:not(.active) { opacity: 0.5; }
input:placeholder-shown { border: 1px dashed gray; }
:empty { display: none; }`
              },
              {
                type: "infobox",
                kind: "tip",
                title: "💡 Specificity Rule",
                content: "IDs (100) beat classes (10) beat elements (1). Avoid using IDs for styling — prefer classes for reusability. Inline styles beat everything (1000 specificity)."
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html>
<head><style id="user-css"></style></head>
<body>
  <h2>Selector Playground</h2>
  <ul id="menu">
    <li class="active">Home</li>
    <li>About</li>
    <li>Services</li>
    <li>Blog</li>
    <li class="last">Contact</li>
  </ul>
  <div class="card">
    <p>First paragraph</p>
    <p>Second paragraph</p>
    <a href="https://example.com">External Link</a>
  </div>
  <input type="text" placeholder="Type here..." />
</body>
</html>`,
              css: `/* Element selector */
body { font-family: sans-serif; padding: 20px; background: #f8faff; }

/* ID selector */
#menu { list-style: none; padding: 0; display: flex; gap: 12px; margin-bottom: 20px; }

/* Class selector */
.active { background: #6366f1; color: white; padding: 6px 14px; border-radius: 6px; }

/* Multiple class / descendant */
#menu li { padding: 6px 14px; border-radius: 6px; cursor: pointer; background: white; border: 1px solid #e2e8f0; }

/* Pseudo-class */
#menu li:hover { background: #ede9fe; color: #6366f1; }

/* nth-child */
.card p:first-child { font-weight: bold; color: #1e293b; }
.card p:last-of-type { color: #64748b; font-style: italic; }

/* Attribute selector */
a[href^="https"]::before { content: "🔒 "; font-size: 12px; }
a { color: #6366f1; }

/* Focus state */
input:focus { outline: 2px solid #6366f1; border-radius: 4px; }
input { padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; width: 200px; }`
            }
          }
        },
        {
          id: "box-model",
          title: "The Box Model",
          icon: "📦",
          lessonData: {
            tag: "Level 1 • Core Concepts",
            tagColor: "green",
            title: "The Box Model",
            subtitle: "Every HTML element is a rectangular box. The CSS Box Model defines how that box's dimensions are calculated — understanding it eliminates 80% of layout confusion.",
            sections: [
              {
                type: "explanation",
                title: "📦 Four Layers of the Box",
                content: `<p>Every element consists of four concentric boxes:</p>
                <ul>
                  <li><strong>Content</strong> — The actual text, image, or child elements</li>
                  <li><strong>Padding</strong> — Space between content and border (inherits background)</li>
                  <li><strong>Border</strong> — The element's visible edge</li>
                  <li><strong>Margin</strong> — Space outside the border (always transparent)</li>
                </ul>`
              },
              {
                type: "visual-boxmodel",
              },
              {
                type: "code",
                lang: "css",
                label: "Box Model Properties",
                code: `.element {
  /* Content dimensions */
  width: 300px;
  height: 150px;

  /* Padding (inside border) */
  padding: 20px;           /* all sides */
  padding: 10px 20px;      /* vertical | horizontal */
  padding: 5px 10px 15px;  /* top | horizontal | bottom */
  padding: 5px 10px 15px 20px; /* top right bottom left */

  /* Border */
  border: 2px solid #333;
  border-radius: 8px;      /* rounded corners */
  border-top: 3px dashed red; /* individual sides */

  /* Margin (outside border) */
  margin: 16px;
  margin: 0 auto;          /* center horizontally! */

  /* THE CRITICAL PROPERTY */
  box-sizing: border-box;  /* include padding+border in width */
}`
              },
              {
                type: "explanation",
                title: "🔥 box-sizing: border-box",
                content: `<p>This is the <strong>most important CSS property</strong> you'll ever set. By default (<code>content-box</code>), a 300px wide element with 20px padding becomes <em>340px wide total</em>.</p>
                <p>With <code>border-box</code>, padding and borders are <em>included in the width</em>. A 300px element stays 300px total.</p>`
              },
              {
                type: "code",
                lang: "css",
                label: "The Universal Border-Box Reset (Use in Every Project)",
                code: `/* Add this to every project */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Now widths work intuitively */
.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #ccc;
  /* Total width: 300px (not 344px!) */
}`
              },
              {
                type: "infobox",
                kind: "warn",
                title: "⚠️ Margin Collapse",
                content: "Adjacent vertical margins collapse! When two block elements stack, they don't add margins — the larger margin wins. margin: 20px on top + margin: 30px on bottom = 30px gap (not 50px). This catches every developer off guard."
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html>
<head><style id="user-css"></style></head>
<body>
  <h2>Box Model Explorer</h2>
  <div class="outer">
    <div class="inner">
      I am the content area.<br>
      Change padding, border, margin!
    </div>
  </div>
  <div class="box-a">Box A (margin: 30px)</div>
  <div class="box-b">Box B (margin: 20px)</div>
  <p>^ Gap between is 30px (not 50px!) — margin collapse</p>
</body>
</html>`,
              css: `*, *::before, *::after { box-sizing: border-box; }
body { font-family: sans-serif; padding: 20px; background: #f0f4ff; }

.outer {
  background: rgba(255, 100, 100, 0.1);
  border: 2px dashed rgba(255, 100, 100, 0.5);
  padding: 20px;
  margin-bottom: 20px;
}

.inner {
  background: rgba(99, 102, 241, 0.15);
  border: 3px solid #6366f1;
  padding: 20px;
  width: 100%;
  color: #1e293b;
  line-height: 1.6;
}

.box-a {
  background: #e0f2fe;
  border: 2px solid #0284c7;
  padding: 14px 20px;
  margin: 30px 0;
  border-radius: 6px;
}

.box-b {
  background: #f0fdf4;
  border: 2px solid #16a34a;
  padding: 14px 20px;
  margin: 20px 0;
  border-radius: 6px;
}`
            }
          }
        },
        {
          id: "units",
          title: "CSS Units & Values",
          icon: "📏",
          lessonData: {
            tag: "Level 1 • Units",
            tagColor: "green",
            title: "CSS Units & Values",
            subtitle: "Choosing the right unit can mean the difference between a rigid layout and a perfectly responsive one. Understand absolute vs relative units deeply.",
            sections: [
              {
                type: "explanation",
                title: "📐 Absolute Units",
                content: `<ul>
                  <li><strong>px</strong> — Pixels. Precise, fixed. Great for borders, shadows, fine details.</li>
                  <li><strong>pt, pc, cm, mm, in</strong> — Print units. Rarely used in screen CSS.</li>
                </ul>`
              },
              {
                type: "explanation",
                title: "📐 Relative Units",
                content: `<ul>
                  <li><strong>%</strong> — Relative to parent's dimension</li>
                  <li><strong>em</strong> — Relative to element's own font-size (or parent's if on font-size)</li>
                  <li><strong>rem</strong> — Relative to root (&lt;html&gt;) font-size. <strong>Best for typography</strong></li>
                  <li><strong>vw / vh</strong> — 1% of viewport width / height. Great for full-screen sections</li>
                  <li><strong>vmin / vmax</strong> — 1% of smallest/largest viewport dimension</li>
                  <li><strong>ch</strong> — Width of "0" character. Great for text column widths</li>
                  <li><strong>fr</strong> — Fractional unit for CSS Grid</li>
                </ul>`
              },
              {
                type: "code",
                lang: "css",
                label: "Unit Comparison & Best Practices",
                code: `html { font-size: 16px; } /* 1rem = 16px */

/* Typography: use rem for consistency */
h1 { font-size: 2.5rem;  } /* 40px */
h2 { font-size: 2rem;    } /* 32px */
body { font-size: 1rem;  } /* 16px */

/* Spacing: rem is predictable */
.card { padding: 1.5rem; margin-bottom: 1rem; }

/* em for component-relative sizing */
.btn { padding: 0.75em 1.5em; } /* scales with button's font-size */
.btn-lg { font-size: 1.2rem; } /* padding scales automatically */

/* Full viewport sections */
.hero { 
  height: 100vh;
  width: 100vw;
}

/* Percentage for fluid layouts */
.col-half { width: 50%; }

/* ch for readable text columns */
.article { max-width: 65ch; }

/* CSS clamp() — responsive without media queries! */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* min: 1.5rem, preferred: 4vw, max: 3rem */
}`
              },
              {
                type: "infobox",
                kind: "tip",
                title: "💡 The Golden Rules",
                content: "1) Use rem for font sizes (respects user's browser settings). 2) Use px for borders/shadows. 3) Use % for fluid widths. 4) Use vh/vw for full-screen layouts. 5) Use clamp() to eliminate breakpoints for typography."
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html>
<head><style id="user-css"></style></head>
<body>
  <section class="hero">
    <h1>Responsive Heading</h1>
    <p>This font scales with clamp()</p>
  </section>
  <div class="card-grid">
    <div class="card">Card One</div>
    <div class="card">Card Two</div>
    <div class="card">Card Three</div>
  </div>
  <p class="article-text">This is article text using max-width in ch units for optimal reading line length. Resize the window to see it stay readable.</p>
</body>
</html>`,
              css: `html { font-size: 16px; }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #0f172a; color: #e2e8f0; }

.hero {
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  padding: 2rem;
  text-align: center;
}

.hero h1 {
  font-size: clamp(1.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero p {
  font-size: clamp(0.9rem, 2vw, 1.3rem);
  opacity: 0.7;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 2rem;
}

.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  font-size: 1.1rem;
}

.article-text {
  max-width: 65ch;
  padding: 2rem;
  line-height: 1.8;
  color: #94a3b8;
  font-size: 1rem;
}`
            }
          }
        },
        {
          id: "colors",
          title: "Colors & Backgrounds",
          icon: "🎨",
          lessonData: {
            tag: "Level 1 • Visuals",
            tagColor: "green",
            title: "Colors & Backgrounds",
            subtitle: "CSS offers powerful, flexible color systems and background options. From hex codes to oklch, from solid fills to layered gradients.",
            sections: [
              {
                type: "explanation",
                title: "🎨 Color Formats",
                content: `<ul>
                  <li><strong>Named:</strong> <code>red</code>, <code>tomato</code>, <code>cornflowerblue</code> — 140+ keywords</li>
                  <li><strong>Hex:</strong> <code>#ff5733</code> or shorthand <code>#f53</code></li>
                  <li><strong>RGB:</strong> <code>rgb(255, 87, 51)</code></li>
                  <li><strong>RGBA:</strong> <code>rgba(255, 87, 51, 0.5)</code> — with transparency</li>
                  <li><strong>HSL:</strong> <code>hsl(14, 100%, 60%)</code> — Hue, Saturation, Lightness. Most intuitive!</li>
                  <li><strong>HSLA:</strong> <code>hsla(14, 100%, 60%, 0.8)</code></li>
                  <li><strong>oklch (modern):</strong> <code>oklch(70% 0.2 30)</code> — Perceptually uniform, widest gamut</li>
                </ul>`
              },
              {
                type: "code",
                lang: "css",
                label: "Colors & Backgrounds",
                code: `.element {
  /* Background Color */
  background-color: #f8fafc;
  background-color: hsl(220, 14%, 96%);

  /* Background Image */
  background-image: url('hero.jpg');
  background-size: cover;      /* fill entire box */
  background-size: contain;    /* fit without cropping */
  background-position: center;
  background-repeat: no-repeat;

  /* Gradient backgrounds */
  background: linear-gradient(135deg, #667eea, #764ba2);
  background: radial-gradient(circle at top, #667eea, #764ba2);
  background: conic-gradient(from 90deg, red, blue, green, red);

  /* Multiple backgrounds (layered) */
  background: 
    linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
    url('photo.jpg') center/cover;

  /* Text color */
  color: hsl(220, 9%, 46%);

  /* Opacity */
  opacity: 0.5; /* affects entire element */
  color: rgba(0, 0, 0, 0.5); /* just color transparency */
}`
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html><head><style id="user-css"></style></head>
<body>
  <div class="gradient-hero">
    <h1>Gradient Hero</h1>
    <p>Try changing the gradient!</p>
  </div>
  <div class="color-grid">
    <div class="swatch s1">Linear</div>
    <div class="swatch s2">Radial</div>
    <div class="swatch s3">HSL Colors</div>
    <div class="swatch s4">Overlay</div>
  </div>
</body></html>`,
              css: `body { margin: 0; font-family: sans-serif; }

.gradient-hero {
  height: 40vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.gradient-hero h1 { font-size: 2.5rem; margin-bottom: 8px; }
.gradient-hero p { opacity: 0.85; }

.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: 60vh;
}

.swatch {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 1.1rem;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.s1 { background: linear-gradient(to bottom right, #f6d365, #fda085); }
.s2 { background: radial-gradient(circle, #a18cd1, #fbc2eb); }
.s3 { background: hsl(200, 80%, 50%); }
.s4 { 
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    linear-gradient(135deg, #ff9a9e, #fad0c4);
}`
            }
          }
        },
        {
          id: "specificity",
          title: "Specificity & Cascade",
          icon: "⚖️",
          lessonData: {
            tag: "Level 1 • Core Concepts",
            tagColor: "green",
            title: "Specificity & The Cascade",
            subtitle: "When multiple CSS rules target the same element, specificity determines the winner. Understanding this prevents frustrating 'why isn't this style applying?' moments.",
            sections: [
              {
                type: "explanation",
                title: "⚖️ How Specificity is Calculated",
                content: `<p>Specificity is scored as a 4-digit number <strong>(A, B, C, D)</strong>:</p>
                <ul>
                  <li><strong>A = 1000</strong> — Inline styles <code>style="..."</code></li>
                  <li><strong>B = 0100</strong> — IDs <code>#navbar</code></li>
                  <li><strong>C = 0010</strong> — Classes <code>.btn</code>, attributes <code>[type]</code>, pseudo-classes <code>:hover</code></li>
                  <li><strong>D = 0001</strong> — Elements <code>div</code>, pseudo-elements <code>::before</code></li>
                </ul>`
              },
              {
                type: "code",
                lang: "css",
                label: "Specificity Calculations",
                code: `/* Specificity: (0,0,0,1) = 1 */
p { color: black; }

/* Specificity: (0,0,1,0) = 10 */
.text { color: blue; }

/* Specificity: (0,0,1,1) = 11 */
p.text { color: green; }

/* Specificity: (0,1,0,0) = 100 */
#main { color: purple; }

/* Specificity: (0,1,1,1) = 111 */
#main p.text { color: red; }

/* The nuclear option — avoid! */
p { color: hotpink !important; }  /* overrides everything */

/* :is() and :where() */
:is(h1, h2, h3) { margin-bottom: 0.5em; } /* takes specificity of arg */
:where(h1, h2, h3) { margin-bottom: 0.5em; } /* always zero specificity! */`
              },
              {
                type: "infobox",
                kind: "danger",
                title: "🚫 Avoid !important",
                content: "!important breaks the natural cascade and creates 'specificity wars'. If you find yourself using it, it's a sign to restructure your CSS. Exception: utility classes like .hidden { display: none !important; } are acceptable."
              },
              {
                type: "explanation",
                title: "📊 The Full Cascade Order",
                content: `<p>When specificity ties, the cascade applies these rules in order:</p>
                <ol>
                  <li>!important declarations (user agent > user > author)</li>
                  <li>Specificity (highest wins)</li>
                  <li>Source order (last rule wins if equal specificity)</li>
                  <li>Inherited values</li>
                  <li>Browser defaults</li>
                </ol>`
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html><head><style id="user-css"></style></head>
<body>
  <p id="main-para" class="text special">
    Which color wins?
  </p>
  <p class="text">Just a class</p>
  <p>Just an element</p>
</body></html>`,
              css: `body { font-family: sans-serif; padding: 30px; background: #f8faff; }

/* Specificity: 1 */
p { color: gray; font-size: 1.2rem; margin: 10px 0; }

/* Specificity: 10 */
.text { color: blue; }

/* Specificity: 20 */
.text.special { color: green; }

/* Specificity: 100 — wins! */
#main-para { color: #7c3aed; font-weight: bold; }

/* Try uncommenting these to see cascade effects: */
/* p { color: red !important; } */
/* #main-para { color: teal; } */`
            }
          }
        }
      ]
    },
    {
      id: "level-2",
      title: "Layout Systems",
      emoji: "🏗️",
      badge: "L2",
      color: "blue",
      class: "lv2",
      description: "Build complex, responsive layouts with Flexbox, Grid, and advanced positioning techniques.",
      topics: [
        {
          id: "flexbox",
          title: "Flexbox Complete Guide",
          icon: "↔️",
          lessonData: {
            tag: "Level 2 • Layout",
            tagColor: "blue",
            title: "Flexbox: Complete Guide",
            subtitle: "Flexbox is the most practical layout system for one-dimensional layouts. Master it and you can build any UI component imaginable.",
            sections: [
              {
                type: "explanation",
                title: "🔹 Flex Container vs Flex Items",
                content: `<p>Flexbox has two key players:</p>
                <ul>
                  <li><strong>Flex Container</strong> — the parent with <code>display: flex</code></li>
                  <li><strong>Flex Items</strong> — direct children of the container</li>
                </ul>
                <p>The <strong>main axis</strong> runs in the flex-direction (row = horizontal, column = vertical). The <strong>cross axis</strong> is perpendicular.</p>`
              },
              {
                type: "code",
                lang: "css",
                label: "Container Properties",
                code: `.container {
  display: flex; /* or inline-flex */
  
  /* Direction of main axis */
  flex-direction: row;           /* → default */
  flex-direction: row-reverse;   /* ← */
  flex-direction: column;        /* ↓ */
  flex-direction: column-reverse;/* ↑ */
  
  /* Wrapping */
  flex-wrap: nowrap;   /* default — items shrink to fit */
  flex-wrap: wrap;     /* items wrap to next line */
  
  /* Alignment on MAIN axis */
  justify-content: flex-start;    /* default */
  justify-content: flex-end;
  justify-content: center;
  justify-content: space-between; /* edges flush */
  justify-content: space-around;  /* equal space around */
  justify-content: space-evenly;  /* truly equal gaps */
  
  /* Alignment on CROSS axis */
  align-items: stretch;     /* default — fill height */
  align-items: flex-start;
  align-items: flex-end;
  align-items: center;      /* vertical center! */
  align-items: baseline;
  
  /* Multiple lines (when flex-wrap) */
  align-content: flex-start;
  align-content: space-between;
  
  /* Shorthand for gap between items */
  gap: 16px;
  gap: 12px 24px; /* row-gap col-gap */
}`
              },
              {
                type: "code",
                lang: "css",
                label: "Item Properties",
                code: `.item {
  /* How item grows when extra space */
  flex-grow: 0;  /* default: won't grow */
  flex-grow: 1;  /* takes equal share of space */
  flex-grow: 2;  /* takes 2x share vs flex-grow: 1 */
  
  /* How item shrinks when too small */
  flex-shrink: 1;  /* default: will shrink */
  flex-shrink: 0;  /* won't shrink (careful!) */
  
  /* Base size before grow/shrink */
  flex-basis: auto;   /* use width/content size */
  flex-basis: 200px;  /* fixed starting width */
  flex-basis: 0;      /* start from zero, grow to fill */
  
  /* Shorthand: grow shrink basis */
  flex: 0 1 auto;   /* default */
  flex: 1;          /* flex: 1 1 0% — equal columns */
  flex: 0 0 200px;  /* fixed 200px, no grow/shrink */
  
  /* Override container's align-items */
  align-self: center;
  align-self: flex-end;
  
  /* Order (visual only) */
  order: 0;  /* default */
  order: -1; /* move to start */
  order: 2;  /* move toward end */
}`
              },
              {
                type: "infobox",
                kind: "tip",
                title: "💡 Perfect Centering (Finally Easy)",
                content: "The holy grail of CSS — perfect vertical + horizontal centering: .container { display: flex; align-items: center; justify-content: center; }"
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html><head><style id="user-css"></style></head>
<body>
  <h3>Flexbox Playground</h3>
  <div class="flex-container">
    <div class="flex-item">1</div>
    <div class="flex-item">2</div>
    <div class="flex-item flex-grow">3 (grow)</div>
    <div class="flex-item">4</div>
  </div>
  <h3>Navbar Pattern</h3>
  <nav class="navbar">
    <div class="logo">Logo</div>
    <ul class="nav-links">
      <li>Home</li><li>About</li><li>Work</li>
    </ul>
    <button class="cta">Get Started</button>
  </nav>
  <h3>Card Equal Height</h3>
  <div class="card-row">
    <div class="card"><h4>Short</h4><p>Less content.</p></div>
    <div class="card"><h4>Medium</h4><p>Some content here that makes it a bit taller.</p></div>
    <div class="card"><h4>Tall</h4><p>This card has lots of content making it the tallest card in the row, and all others match!</p></div>
  </div>
</body></html>`,
              css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f1f5f9; padding: 20px; }
h3 { margin: 16px 0 10px; color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }

.flex-container {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #1e293b;
  border-radius: 10px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.flex-item {
  background: #6366f1;
  color: white;
  padding: 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  min-width: 50px;
}

.flex-grow { flex-grow: 1; background: #8b5cf6; }

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 20px;
}

.logo { font-weight: 800; font-size: 1.2rem; color: #6366f1; }

.nav-links { display: flex; gap: 20px; list-style: none; color: #475569; font-size: 0.9rem; }
.nav-links li { cursor: pointer; }
.nav-links li:hover { color: #6366f1; }

.cta { background: #6366f1; color: white; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; }

.card-row { display: flex; gap: 16px; }
.card {
  flex: 1;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.card h4 { margin-bottom: 8px; color: #1e293b; }
.card p { color: #64748b; font-size: 0.9rem; line-height: 1.6; }`
            }
          }
        },
        {
          id: "css-grid",
          title: "CSS Grid Mastery",
          icon: "⊞",
          lessonData: {
            tag: "Level 2 • Layout",
            tagColor: "blue",
            title: "CSS Grid: Mastery Guide",
            subtitle: "CSS Grid is the most powerful 2D layout system ever added to CSS. It revolutionizes page layouts, dashboards, and complex UIs.",
            sections: [
              {
                type: "explanation",
                title: "🔹 Grid Fundamentals",
                content: `<p>Grid works by defining rows and columns on a container, then placing items in the resulting cells.</p>
                <ul>
                  <li><strong>Grid Container</strong> — parent with <code>display: grid</code></li>
                  <li><strong>Grid Lines</strong> — the dividing lines (numbered from 1)</li>
                  <li><strong>Grid Track</strong> — the space between two lines (a row or column)</li>
                  <li><strong>Grid Cell</strong> — intersection of a row and column track</li>
                  <li><strong>Grid Area</strong> — one or more cells spanning rows/columns</li>
                </ul>`
              },
              {
                type: "code",
                lang: "css",
                label: "Grid Container Properties",
                code: `.grid {
  display: grid;

  /* Define columns */
  grid-template-columns: 200px 1fr 1fr;      /* fixed | flexible | flexible */
  grid-template-columns: repeat(3, 1fr);      /* 3 equal columns */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* responsive! */
  
  /* Define rows */
  grid-template-rows: 80px 1fr auto;

  /* Gap between cells */
  gap: 20px;
  gap: 12px 24px;  /* row-gap column-gap */

  /* Named areas (visual layout!) */
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  
  /* Alignment */
  align-items: start | end | center | stretch;
  justify-items: start | end | center | stretch;
  
  /* Align the whole grid */
  align-content: start | center | space-between;
  justify-content: start | center | space-between;
}`
              },
              {
                type: "code",
                lang: "css",
                label: "Placing Grid Items",
                code: `/* Place by line numbers */
.item {
  grid-column: 1 / 3;      /* from line 1 to 3 (spans 2 cols) */
  grid-column: 1 / -1;     /* from 1 to last line (full width) */
  grid-column: span 2;     /* span 2 columns */
  grid-row: 2 / 4;         /* from row 2 to 4 */
}

/* Named area placement */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Self-alignment overrides */
.special {
  align-self: center;
  justify-self: end;
}

/* The fr unit */
/* 1fr = 1 fractional unit of remaining space */
grid-template-columns: 1fr 2fr 1fr;
/* 25% | 50% | 25% (after gap is subtracted) */`
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html><head><style id="user-css"></style></head>
<body>
  <div class="page-layout">
    <header class="header">Header</header>
    <nav class="sidebar">Sidebar</nav>
    <main class="main">
      <div class="card-grid">
        <div class="card">Card 1</div>
        <div class="card card-wide">Card 2 (spans 2)</div>
        <div class="card">Card 3</div>
        <div class="card">Card 4</div>
        <div class="card">Card 5</div>
      </div>
    </main>
    <footer class="footer">Footer</footer>
  </div>
</body></html>`,
              css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #0f172a; min-height: 100vh; padding: 16px; }

.page-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 180px 1fr;
  grid-template-rows: 60px 1fr 50px;
  gap: 12px;
  height: calc(100vh - 32px);
}

.header {
  grid-area: header;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 10px;
}

.sidebar {
  grid-area: sidebar;
  background: #1e293b;
  color: #94a3b8;
  padding: 20px;
  border-radius: 10px;
  font-size: 0.9rem;
}

.main {
  grid-area: main;
  background: #1e293b;
  padding: 16px;
  border-radius: 10px;
  overflow: auto;
}

.footer {
  grid-area: footer;
  background: #1e293b;
  color: #475569;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-radius: 10px;
  font-size: 0.85rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.card {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 16px;
  color: #e2e8f0;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.card-wide {
  grid-column: span 2;
  background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2));
  border-color: rgba(99,102,241,0.4);
  color: #a5b4fc;
}`
            }
          }
        },
        {
          id: "positioning",
          title: "Positioning & Z-Index",
          icon: "📍",
          lessonData: {
            tag: "Level 2 • Layout",
            tagColor: "blue",
            title: "Positioning & Z-Index",
            subtitle: "CSS positioning lets you break elements out of normal flow to create overlays, sticky headers, floating buttons, and complex UI patterns.",
            sections: [
              {
                type: "explanation",
                title: "🔹 Position Values",
                content: `<ul>
                  <li><strong>static</strong> — Default. Normal flow. top/left/right/bottom/z-index have no effect.</li>
                  <li><strong>relative</strong> — Offset from where it would be. Still takes up original space.</li>
                  <li><strong>absolute</strong> — Removed from flow. Positioned relative to nearest non-static ancestor.</li>
                  <li><strong>fixed</strong> — Removed from flow. Positioned relative to viewport. Stays on scroll.</li>
                  <li><strong>sticky</strong> — Hybrid! Acts as relative until threshold, then fixed within its parent.</li>
                </ul>`
              },
              {
                type: "code",
                lang: "css",
                label: "Positioning in Practice",
                code: `/* Relative — offset without disrupting layout */
.badge {
  position: relative;
  top: -2px;  /* nudge up 2px */
}

/* Absolute — the "positioned inside parent" trick */
.card {
  position: relative; /* Creates positioning context! */
}

.card .ribbon {
  position: absolute;
  top: 12px;
  right: -8px;  /* poke out of card */
}

/* Fixed — always visible */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* Sticky — scroll with page, then stick */
.table-header {
  position: sticky;
  top: 0;         /* sticks when top edge hits 0 */
  background: white;
  z-index: 10;
}

/* CRITICAL: sticky needs a scrollable parent! */
/* The sticky element sticks within its parent's bounds */

/* Z-Index — stacking order */
.modal-overlay { z-index: 900; }
.modal-dialog  { z-index: 1000; }
.tooltip       { z-index: 1100; }
.dropdown      { z-index: 1200; }

/* Only works on non-static positioned elements! */`
              },
              {
                type: "infobox",
                kind: "warn",
                title: "⚠️ Z-Index Gotcha: Stacking Contexts",
                content: "z-index doesn't work globally! A new 'stacking context' is created by: transform, opacity < 1, filter, position + z-index. An element inside a stacking context can never appear above elements outside it, no matter how high its z-index!"
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html><head><style id="user-css"></style></head>
<body>
  <nav class="sticky-nav">Sticky Navigation</nav>
  <div class="content">
    <div class="card">
      <span class="badge">NEW</span>
      <h3>Product Card</h3>
      <p>Absolute positioned badge in relative parent</p>
      <div class="tooltip-wrap">
        Hover me
        <div class="tooltip">Fixed tooltip above!</div>
      </div>
    </div>
    <div class="overlay-demo">
      <div class="layer l1">Layer 1 (z:1)</div>
      <div class="layer l2">Layer 2 (z:2)</div>
      <div class="layer l3">Layer 3 (z:3)</div>
    </div>
  </div>
  <div class="fixed-btn">⬆ Top</div>
</body></html>`,
              css: `*, *::before, *::after { box-sizing: border-box; }
body { font-family: sans-serif; background: #f1f5f9; min-height: 200vh; }

.sticky-nav {
  position: sticky;
  top: 0;
  background: #6366f1;
  color: white;
  padding: 14px 24px;
  font-weight: bold;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(99,102,241,0.4);
}

.content { padding: 20px; display: flex; gap: 20px; flex-wrap: wrap; }

.card {
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  width: 280px;
}

.badge {
  position: absolute;
  top: -8px;
  right: 12px;
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: bold;
  padding: 3px 10px;
  border-radius: 99px;
}

.tooltip-wrap { position: relative; display: inline-block; cursor: pointer; color: #6366f1; font-weight: bold; margin-top: 12px; }
.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 6px;
  white-space: nowrap;
  display: none;
  z-index: 50;
}
.tooltip-wrap:hover .tooltip { display: block; }

.overlay-demo { position: relative; width: 200px; height: 160px; }
.layer {
  position: absolute;
  width: 120px; height: 80px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: bold; color: white;
}
.l1 { background: rgba(99,102,241,0.9); top: 0; left: 0; z-index: 1; }
.l2 { background: rgba(139,92,246,0.9); top: 30px; left: 30px; z-index: 2; }
.l3 { background: rgba(236,72,153,0.9); top: 60px; left: 60px; z-index: 3; }

.fixed-btn {
  position: fixed;
  bottom: 20px; right: 20px;
  background: #6366f1;
  color: white;
  padding: 10px 16px;
  border-radius: 99px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(99,102,241,0.4);
}`
            }
          }
        }
      ]
    },
    {
      id: "level-3",
      title: "Responsive Design",
      emoji: "📱",
      badge: "L3",
      color: "orange",
      class: "lv3",
      description: "Build websites that look perfect on every device — from mobile to 4K screens.",
      topics: [
        {
          id: "media-queries",
          title: "Media Queries",
          icon: "📡",
          lessonData: {
            tag: "Level 3 • Responsive",
            tagColor: "orange",
            title: "Media Queries",
            subtitle: "Media queries let you apply CSS rules conditionally based on device characteristics — width, height, orientation, and more.",
            sections: [
              { type: "explanation", title: "🔹 Syntax & Common Breakpoints", content: `<p>A media query consists of a media type (usually <code>screen</code>) and one or more conditions:</p>` },
              {
                type: "code", lang: "css", label: "Media Query Patterns",
                code: `/* Mobile-first approach (recommended) */
/* Base styles = mobile */
.container { padding: 16px; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 24px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { padding: 32px; max-width: 1200px; margin: 0 auto; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Large desktop */
@media (min-width: 1400px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}

/* Other media features */
@media (orientation: landscape) { /* landscape mode */ }
@media (prefers-color-scheme: dark) { /* dark mode! */ }
@media (prefers-reduced-motion: reduce) { /* less animation */ }
@media (hover: none) { /* touch devices */ }
@media print { .sidebar { display: none; } }

/* Range syntax (modern CSS) */
@media (width >= 768px) { /* min-width equivalent */ }
@media (768px <= width < 1024px) { /* range */ }`
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html><head><style id="user-css"></style></head>
<body>
  <header class="header"><div class="logo">Brand</div><nav><a>Home</a><a>About</a><a>Work</a><a>Contact</a></nav><button class="menu-btn">☰</button></header>
  <div class="hero"><h1>Responsive Layout</h1><p>Resize to see breakpoints</p></div>
  <div class="grid">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
  </div>
</body></html>`,
              css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f8faff; }

/* MOBILE FIRST */
.header { background: #6366f1; color: white; display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; }
.logo { font-weight: 800; font-size: 1.2rem; }
nav { display: none; gap: 20px; }
nav a { color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem; cursor: pointer; }
.menu-btn { background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 1.1rem; }
.hero { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 48px 16px; text-align: center; }
.hero h1 { font-size: 1.8rem; margin-bottom: 8px; }
.grid { display: grid; grid-template-columns: 1fr; gap: 12px; padding: 16px; }
.card { background: white; border-radius: 10px; padding: 20px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); font-weight: 600; color: #475569; }

/* TABLET */
@media (min-width: 640px) {
  nav { display: flex; }
  .menu-btn { display: none; }
  .hero { padding: 64px 24px; }
  .hero h1 { font-size: 2.5rem; }
  .grid { grid-template-columns: repeat(2, 1fr); padding: 24px; gap: 16px; }
}

/* DESKTOP */
@media (min-width: 1024px) {
  .header { padding: 16px 40px; }
  .hero { padding: 80px; }
  .hero h1 { font-size: 3.5rem; }
  .grid { grid-template-columns: repeat(4, 1fr); max-width: 1200px; margin: 0 auto; padding: 40px; }
}`
            }
          }
        }
      ]
    },
    {
      id: "level-4",
      title: "Advanced CSS",
      emoji: "⚡",
      badge: "L4",
      color: "accent",
      class: "lv4",
      description: "Animations, transforms, CSS variables, and cutting-edge features that define modern CSS.",
      topics: [
        {
          id: "animations",
          title: "Animations & Transitions",
          icon: "✨",
          lessonData: {
            tag: "Level 4 • Advanced",
            tagColor: "purple",
            title: "Animations & Transitions",
            subtitle: "CSS animations and transitions bring interfaces to life. Done well, they enhance UX; done poorly, they annoy users. Learn to do them right.",
            sections: [
              { type: "explanation", title: "🔹 Transitions vs Animations", content: `<ul><li><strong>Transitions</strong> — Smooth change between two states (hover, focus, class toggle). Triggered by state change.</li><li><strong>Animations</strong> — Multi-step, keyframe-based, self-running sequences.</li></ul>` },
              {
                type: "code", lang: "css", label: "Transitions",
                code: `.button {
  background: #6366f1;
  color: white;
  border-radius: 8px;
  padding: 10px 20px;
  
  /* transition: property duration timing-function delay */
  transition: all 0.2s ease;
  
  /* Multiple transitions */
  transition: 
    background 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.button:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99,102,241,0.4);
}

/* Timing functions */
transition: all 0.3s ease;          /* smooth (default) */
transition: all 0.3s ease-in;       /* slow start */
transition: all 0.3s ease-out;      /* slow end */
transition: all 0.3s ease-in-out;   /* slow start and end */
transition: all 0.3s linear;        /* constant speed */
transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* bounce! */`
              },
              {
                type: "code", lang: "css", label: "Keyframe Animations",
                code: `/* Define the animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes slideIn {
  0%   { transform: translateX(-100%); opacity: 0; }
  60%  { transform: translateX(10px); }
  100% { transform: translateX(0); opacity: 1; }
}

/* Apply the animation */
.card {
  /* animation: name duration timing-function delay iteration-count direction fill-mode */
  animation: fadeIn 0.5s ease forwards;
}

.loader {
  animation: spin 1s linear infinite;
}

.hero-text {
  animation: slideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* Staggered animations */
.item:nth-child(1) { animation-delay: 0s; }
.item:nth-child(2) { animation-delay: 0.1s; }
.item:nth-child(3) { animation-delay: 0.2s; }`
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html><head><style id="user-css"></style></head>
<body>
  <div class="demo">
    <button class="btn">Hover Me</button>
    <div class="card-anim"><h3>Animated Card</h3><p>Appears with fade-in</p></div>
    <div class="loader-wrap"><div class="loader"></div><span>Loading...</span></div>
    <div class="stagger-list">
      <div class="stagger-item">Item 1</div>
      <div class="stagger-item">Item 2</div>
      <div class="stagger-item">Item 3</div>
      <div class="stagger-item">Item 4</div>
    </div>
  </div>
</body></html>`,
              css: `*, *::before, *::after { box-sizing: border-box; }
body { font-family: sans-serif; background: #0f172a; color: #e2e8f0; padding: 30px; }
.demo { display: flex; flex-direction: column; gap: 24px; align-items: flex-start; }

@keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); } 50% { box-shadow: 0 0 0 12px rgba(99,102,241,0); } }

.btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.btn:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 12px 24px rgba(99,102,241,0.4); }
.btn:active { transform: translateY(0) scale(0.98); }

.card-anim {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px 24px;
  animation: fadeUp 0.6s ease-out both, pulse-glow 2s ease-in-out 1s infinite;
}
.card-anim h3 { margin-bottom: 6px; color: #a5b4fc; }
.card-anim p { color: #64748b; font-size: 0.9rem; }

.loader-wrap { display: flex; align-items: center; gap: 12px; color: #64748b; font-size: 0.9rem; }
.loader { width: 24px; height: 24px; border: 3px solid #334155; border-top-color: #6366f1; border-radius: 50%; animation: spin 0.8s linear infinite; }

.stagger-list { display: flex; flex-direction: column; gap: 8px; }
.stagger-item {
  background: #1e293b;
  border-left: 3px solid #6366f1;
  padding: 10px 16px;
  border-radius: 0 8px 8px 0;
  animation: fadeUp 0.5s ease-out both;
  font-size: 0.9rem;
}
.stagger-item:nth-child(1) { animation-delay: 0.1s; }
.stagger-item:nth-child(2) { animation-delay: 0.2s; }
.stagger-item:nth-child(3) { animation-delay: 0.3s; }
.stagger-item:nth-child(4) { animation-delay: 0.4s; }`
            }
          }
        },
        {
          id: "css-variables",
          title: "CSS Custom Properties",
          icon: "🔧",
          lessonData: {
            tag: "Level 4 • Advanced",
            tagColor: "purple",
            title: "CSS Custom Properties (Variables)",
            subtitle: "CSS variables enable theming, dynamic updates via JavaScript, and DRY (Don't Repeat Yourself) stylesheets at a scale not possible before.",
            sections: [
              {
                type: "code", lang: "css", label: "CSS Variables Fundamentals",
                code: `/* Declare variables on :root for global access */
:root {
  /* Design tokens */
  --color-primary: #6366f1;
  --color-primary-dark: #4f46e5;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  
  --shadow-md: 0 4px 16px rgba(0,0,0,0.1);
  
  --transition-fast: 0.15s ease;
}

/* Dark mode — just override variables! */
[data-theme="dark"] {
  --color-surface: #1e293b;
  --color-text: #e2e8f0;
  --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
}

/* Use variables */
.card {
  background: var(--color-surface);
  color: var(--color-text);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.btn-primary {
  background: var(--color-primary);
  transition: background var(--transition-fast);
}

/* Fallback values */
color: var(--accent, #6366f1);  /* use #6366f1 if --accent not defined */

/* Dynamic calculations */
:root { --columns: 3; }
.grid { grid-template-columns: repeat(var(--columns), 1fr); }

/* Override locally (scoped) */
.card-danger { --color-primary: #ef4444; }
/* btn inside .card-danger will now use red */`
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html data-theme="light"><head><style id="user-css"></style></head>
<body>
  <div class="app">
    <button onclick="toggleTheme()" class="theme-toggle">🌙 Dark Mode</button>
    <div class="card">
      <h2>CSS Variables Theme</h2>
      <p>Click the button to switch themes. Variables cascade!</p>
      <button class="btn">Primary Action</button>
    </div>
    <div class="card card-warning">
      <h2>Warning Card</h2>
      <p>Local variable override changes the accent color.</p>
      <button class="btn">Warning Action</button>
    </div>
  </div>
  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      document.querySelector('.theme-toggle').textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
    }
  </script>
</body></html>`,
              css: `:root {
  --primary: #6366f1;
  --surface: #ffffff;
  --text: #1e293b;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --bg: #f8faff;
  --shadow: 0 4px 16px rgba(0,0,0,0.08);
  --radius: 12px;
  --transition: 0.3s ease;
}

[data-theme="dark"] {
  --primary: #818cf8;
  --surface: #1e293b;
  --text: #e2e8f0;
  --text-muted: #64748b;
  --border: #334155;
  --bg: #0f172a;
  --shadow: 0 4px 16px rgba(0,0,0,0.4);
}

body {
  font-family: sans-serif;
  background: var(--bg);
  color: var(--text);
  transition: background var(--transition), color var(--transition);
  padding: 24px;
}

.app { display: flex; flex-direction: column; gap: 16px; max-width: 400px; }

.theme-toggle {
  align-self: flex-start;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 16px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all var(--transition);
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow);
  transition: background var(--transition), border-color var(--transition);
}

.card h2 { font-size: 1.1rem; margin-bottom: 6px; }
.card p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 14px; }

.btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: opacity var(--transition);
}
.btn:hover { opacity: 0.85; }

/* Local override! */
.card-warning { --primary: #f59e0b; --border: rgba(245,158,11,0.3); }`
            }
          }
        }
      ]
    },
    {
      id: "level-5",
      title: "Expert Level",
      emoji: "🏆",
      badge: "L5",
      color: "red",
      class: "lv5",
      description: "CSS architecture, performance optimization, browser rendering, and production-scale techniques.",
      topics: [
        {
          id: "bem-architecture",
          title: "CSS Architecture (BEM)",
          icon: "🏛️",
          lessonData: {
            tag: "Level 5 • Expert",
            tagColor: "red",
            title: "CSS Architecture & BEM",
            subtitle: "At scale, CSS becomes a maintenance nightmare without architecture. BEM (Block Element Modifier) is the industry-standard methodology to tame it.",
            sections: [
              {
                type: "explanation", title: "🔹 Why CSS Architecture Matters",
                content: `<p>Without methodology, CSS becomes:</p>
                <ul>
                  <li>Unpredictable — changing one thing breaks another</li>
                  <li>Unmaintainable — spaghetti selectors everywhere</li>
                  <li>Unscalable — conflicts as team grows</li>
                </ul>
                <p>BEM solves this with a strict, predictable naming convention.</p>`
              },
              {
                type: "code", lang: "css", label: "BEM: Block__Element--Modifier",
                code: `/* BLOCK: standalone component */
.card { }

/* ELEMENT: part of a block (double underscore) */
.card__header { }
.card__body { }
.card__footer { }
.card__title { }
.card__image { }

/* MODIFIER: variation or state (double dash) */
.card--featured { }
.card--dark { }
.card--large { }
.card__button--disabled { }
.card__button--primary { }

/* HTML usage */
/* <div class="card card--featured">
     <div class="card__header">
       <h2 class="card__title">Title</h2>
     </div>
     <div class="card__body">
       <p class="card__text">Content</p>
       <button class="card__button card__button--primary">Click</button>
     </div>
   </div> */

/* BEM rules:
   1. No nesting (flat CSS is better)
   2. Elements don't exist without blocks
   3. Modifiers modify, not create new blocks
   4. Max specificity: one class (0,1,0,0)
*/`
              },
              {
                type: "infobox", kind: "tip", title: "💡 OOCSS & Utility Patterns",
                content: "Modern CSS often blends BEM for components with utility classes for spacing/layout (Tailwind-style). The key: separate structure from skin, separate container from content."
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html><head><style id="user-css"></style></head>
<body>
  <div class="card-list">
    <article class="card">
      <div class="card__image"><span>📷</span></div>
      <div class="card__body">
        <span class="card__tag">Design</span>
        <h2 class="card__title">Regular Card</h2>
        <p class="card__text">This is a standard card using BEM naming.</p>
        <button class="card__btn">Read More</button>
      </div>
    </article>
    <article class="card card--featured">
      <div class="card__image card__image--large"><span>⭐</span></div>
      <div class="card__body">
        <span class="card__tag card__tag--featured">Featured</span>
        <h2 class="card__title">Featured Card</h2>
        <p class="card__text">Same BEM block, different modifier adds styling.</p>
        <button class="card__btn card__btn--primary">Explore</button>
      </div>
    </article>
  </div>
</body></html>`,
              css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f1f5f9; padding: 24px; }

.card-list { display: flex; gap: 20px; flex-wrap: wrap; }

/* BLOCK */
.card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  width: 260px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }

/* BLOCK MODIFIER */
.card--featured {
  border-color: #6366f1;
  border-width: 2px;
  box-shadow: 0 4px 20px rgba(99,102,241,0.15);
}

/* ELEMENTS */
.card__image {
  height: 120px;
  background: #f8faff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border-bottom: 1px solid #e2e8f0;
}

.card__image--large { height: 160px; background: linear-gradient(135deg, #ede9fe, #fce7f3); }

.card__body { padding: 16px; }

.card__tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #6366f1;
  background: #ede9fe;
  padding: 3px 8px;
  border-radius: 99px;
  display: inline-block;
  margin-bottom: 10px;
}

.card__tag--featured { background: #6366f1; color: white; }

.card__title { font-size: 1rem; font-weight: 700; color: #1e293b; margin-bottom: 6px; }

.card__text { font-size: 0.85rem; color: #64748b; line-height: 1.6; margin-bottom: 14px; }

.card__btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #475569;
  padding: 7px 14px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.15s ease;
}

.card__btn--primary {
  background: #6366f1;
  border-color: #6366f1;
  color: white;
}
.card__btn--primary:hover { background: #4f46e5; }`
            }
          }
        },
        {
          id: "performance",
          title: "CSS Performance",
          icon: "⚡",
          lessonData: {
            tag: "Level 5 • Expert",
            tagColor: "red",
            title: "CSS Performance & Rendering",
            subtitle: "Understanding how browsers render CSS lets you write styles that maintain 60fps, avoid layout thrashing, and load instantly.",
            sections: [
              {
                type: "explanation", title: "🔹 Browser Rendering Pipeline",
                content: `<p>The browser renders CSS in this pipeline — each stage has a cost:</p>
                <ol>
                  <li><strong>Style</strong> — Match selectors, compute computed styles</li>
                  <li><strong>Layout (Reflow)</strong> — Calculate positions and sizes. <em>Expensive!</em></li>
                  <li><strong>Paint</strong> — Fill in pixels (colors, borders)</li>
                  <li><strong>Composite</strong> — Layer compositing on GPU. <em>Cheapest!</em></li>
                </ol>`
              },
              {
                type: "code", lang: "css", label: "Performance Best Practices",
                code: `/* ✅ GPU-composited properties (fastest) */
.animated {
  transform: translateX(100px);  /* GPU layer */
  opacity: 0.5;                  /* GPU layer */
}

/* ❌ Triggers layout (reflow) — expensive! */
.bad { width: 100px; height: 50px; margin: 10px; padding: 5px; }

/* ❌ Triggers paint — avoid in animations */
.bad-paint { background: red; color: blue; box-shadow: 0 2px 4px red; }

/* ✅ Use will-change to promote to own layer */
.card:hover { will-change: transform; }
/* Reset after animation ends */
.card { will-change: auto; }

/* ✅ Prefer transform over position changes */
/* Bad animation: */
@keyframes bad-slide {
  from { left: -100px; }    /* triggers layout! */
  to { left: 0; }
}
/* Good animation: */
@keyframes good-slide {
  from { transform: translateX(-100px); } /* GPU! */
  to { transform: translateX(0); }
}

/* ✅ Reduce selector complexity */
/* Bad: browser reads right-to-left */
.nav .menu .item .link span { }  /* 5 checks per element */
/* Good: */
.nav-link { }                    /* 1 check per element */

/* ✅ contain property */
.card { contain: content; } /* tells browser this is isolated */

/* ✅ Prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`
              },
              {
                type: "infobox", kind: "tip", title: "💡 60fps Rule",
                content: "Browsers have 16.67ms per frame at 60fps. If your CSS + JS takes longer, frames drop. Only transform and opacity animate on the GPU compositor thread — use them for all animations."
              }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html><head><style id="user-css"></style></head>
<body>
  <h2>Performance Demo</h2>
  <p>GPU-accelerated vs CPU animation:</p>
  <div class="demo-row">
    <div class="box gpu-box">GPU<br><small>transform</small></div>
    <div class="box cpu-box">CPU<br><small>left/top</small></div>
  </div>
  <div class="perf-card">
    <div class="shimmer"></div>
    <div class="shimmer shimmer-sm"></div>
    <div class="shimmer shimmer-xs"></div>
  </div>
</body></html>`,
              css: `*, *::before, *::after { box-sizing: border-box; }
body { font-family: sans-serif; background: #0f172a; color: #e2e8f0; padding: 24px; }
h2 { margin-bottom: 6px; }
p { color: #64748b; font-size: 0.9rem; margin-bottom: 16px; }

.demo-row { display: flex; gap: 24px; margin-bottom: 24px; align-items: center; }

.box {
  width: 80px; height: 80px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  text-align: center; font-size: 0.8rem; font-weight: bold;
  position: relative;
}

@keyframes gpu-anim {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(60px); }
}

@keyframes cpu-anim {
  0%, 100% { left: 0; }
  50% { left: 60px; }
}

.gpu-box {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  will-change: transform;
  animation: gpu-anim 2s ease-in-out infinite;
}

.cpu-box {
  background: linear-gradient(135deg, #ef4444, #f97316);
  color: white;
  animation: cpu-anim 2s ease-in-out infinite;
}

/* Shimmer loading skeleton */
.perf-card {
  background: #1e293b;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.shimmer {
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
.shimmer-sm { height: 14px; width: 70%; }
.shimmer-xs { height: 14px; width: 40%; }`
            }
          }
        }
      ]
    },
    {
      id: "level-6",
      title: "Real Projects",
      emoji: "🚀",
      badge: "L6",
      color: "purple",
      class: "lv6",
      description: "Build 6 real-world UI projects applying everything you've learned.",
      topics: [
        {
          id: "project-dashboard",
          title: "Dashboard UI",
          icon: "📊",
          lessonData: {
            tag: "Level 6 • Projects",
            tagColor: "purple",
            title: "Project: Dashboard UI",
            subtitle: "Build a complete analytics dashboard using CSS Grid, Flexbox, CSS variables, and advanced styling techniques.",
            sections: [
              { type: "explanation", title: "🎯 What You'll Build", content: `<p>A production-grade dashboard with: sidebar navigation, KPI cards, chart area, recent activity, and a data table. Uses Grid for the overall layout, Flexbox for components, and CSS variables for theming.</p>` }
            ],
            playground: {
              html: `<!DOCTYPE html>
<html><head><style id="user-css"></style></head>
<body>
<div class="dashboard">
  <aside class="sidebar">
    <div class="sb-logo">📊 DataFlow</div>
    <nav class="sb-nav">
      <a class="sb-link active">🏠 Dashboard</a>
      <a class="sb-link">📈 Analytics</a>
      <a class="sb-link">👥 Users</a>
      <a class="sb-link">💳 Revenue</a>
      <a class="sb-link">⚙️ Settings</a>
    </nav>
  </aside>
  <div class="main">
    <header class="topbar">
      <div><h1>Dashboard</h1><p>Good morning, Vaibhav 👋</p></div>
      <div class="topbar-right"><button class="btn-new">+ New Report</button></div>
    </header>
    <div class="content-area">
      <div class="kpi-grid">
        <div class="kpi-card"><div class="kpi-icon" style="background:#ede9fe;color:#7c3aed">💰</div><div><div class="kpi-label">Revenue</div><div class="kpi-value">$48,295</div><div class="kpi-change up">↑ 12.5%</div></div></div>
        <div class="kpi-card"><div class="kpi-icon" style="background:#dcfce7;color:#16a34a">👥</div><div><div class="kpi-label">Users</div><div class="kpi-value">12,847</div><div class="kpi-change up">↑ 8.1%</div></div></div>
        <div class="kpi-card"><div class="kpi-icon" style="background:#fef9c3;color:#ca8a04">📦</div><div><div class="kpi-label">Orders</div><div class="kpi-value">3,429</div><div class="kpi-change down">↓ 2.4%</div></div></div>
        <div class="kpi-card"><div class="kpi-icon" style="background:#fee2e2;color:#dc2626">🎯</div><div><div class="kpi-label">Conv. Rate</div><div class="kpi-value">3.6%</div><div class="kpi-change up">↑ 0.8%</div></div></div>
      </div>
      <div class="charts-row">
        <div class="chart-card chart-main">
          <div class="chart-header"><h3>Revenue Trend</h3><div class="chart-legend"><span>● 2024</span><span style="opacity:0.5">● 2023</span></div></div>
          <div class="bar-chart">
            <div class="bar" style="--h:65%"><span>Jan</span></div>
            <div class="bar" style="--h:80%"><span>Feb</span></div>
            <div class="bar" style="--h:55%"><span>Mar</span></div>
            <div class="bar" style="--h:90%"><span>Apr</span></div>
            <div class="bar" style="--h:75%"><span>May</span></div>
            <div class="bar" style="--h:95%"><span>Jun</span></div>
            <div class="bar" style="--h:70%"><span>Jul</span></div>
            <div class="bar active-bar" style="--h:88%"><span>Aug</span></div>
          </div>
        </div>
        <div class="chart-card chart-side">
          <h3>Traffic Source</h3>
          <div class="donut-wrap">
            <div class="donut"></div>
            <div class="donut-legend">
              <div><span style="background:#6366f1"></span>Organic 42%</div>
              <div><span style="background:#8b5cf6"></span>Direct 28%</div>
              <div><span style="background:#ec4899"></span>Social 18%</div>
              <div><span style="background:#06b6d4"></span>Email 12%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-card">
        <div class="table-header"><h3>Recent Transactions</h3><button class="btn-text">View All →</button></div>
        <table><thead><tr><th>ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>#1042</td><td>Sarah Chen</td><td>Pro Plan</td><td>$299</td><td><span class="status status-success">Paid</span></td></tr>
          <tr><td>#1041</td><td>Mark Taylor</td><td>Team Plan</td><td>$599</td><td><span class="status status-pending">Pending</span></td></tr>
          <tr><td>#1040</td><td>Ana Rodriguez</td><td>Starter</td><td>$99</td><td><span class="status status-success">Paid</span></td></tr>
          <tr><td>#1039</td><td>James Wilson</td><td>Enterprise</td><td>$1,299</td><td><span class="status status-failed">Failed</span></td></tr>
        </tbody></table>
      </div>
    </div>
  </div>
</div>
</body></html>`,
              css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { --primary: #6366f1; --surface: #ffffff; --bg: #f1f5f9; --text: #1e293b; --text-muted: #64748b; --border: #e2e8f0; --radius: 12px; --shadow: 0 2px 8px rgba(0,0,0,0.06); }
body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); }
.dashboard { display: grid; grid-template-columns: 220px 1fr; height: 100vh; overflow: hidden; }
.sidebar { background: #0f172a; color: #94a3b8; display: flex; flex-direction: column; padding: 0; }
.sb-logo { padding: 20px; font-weight: 800; font-size: 1.1rem; color: white; border-bottom: 1px solid #1e293b; }
.sb-nav { display: flex; flex-direction: column; gap: 2px; padding: 12px; flex: 1; }
.sb-link { display: block; padding: 10px 14px; border-radius: 8px; cursor: pointer; font-size: 0.88rem; font-weight: 500; text-decoration: none; color: #64748b; transition: all 0.15s; }
.sb-link:hover { background: #1e293b; color: #e2e8f0; }
.sb-link.active { background: var(--primary); color: white; }
.main { display: flex; flex-direction: column; overflow: hidden; }
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: var(--surface); border-bottom: 1px solid var(--border); flex-shrink: 0; }
.topbar h1 { font-size: 1.3rem; font-weight: 700; }
.topbar p { font-size: 0.85rem; color: var(--text-muted); }
.btn-new { background: var(--primary); color: white; border: none; padding: 9px 18px; border-radius: 8px; cursor: pointer; font-size: 0.88rem; font-weight: 600; }
.content-area { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }
.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.kpi-card { background: var(--surface); border-radius: var(--radius); padding: 16px; box-shadow: var(--shadow); display: flex; align-items: center; gap: 14px; }
.kpi-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
.kpi-label { font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
.kpi-value { font-size: 1.4rem; font-weight: 800; color: var(--text); }
.kpi-change { font-size: 0.78rem; font-weight: 600; margin-top: 2px; }
.kpi-change.up { color: #16a34a; }
.kpi-change.down { color: #dc2626; }
.charts-row { display: grid; grid-template-columns: 1fr 300px; gap: 12px; }
.chart-card { background: var(--surface); border-radius: var(--radius); padding: 18px; box-shadow: var(--shadow); }
.chart-card h3 { font-size: 0.95rem; font-weight: 700; margin-bottom: 14px; }
.chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.chart-header h3 { margin-bottom: 0; }
.chart-legend { font-size: 0.78rem; color: var(--text-muted); display: flex; gap: 12px; }
.bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 140px; }
.bar { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; height: 100%; justify-content: flex-end; }
.bar::before { content: ''; flex-shrink: 0; width: 100%; height: var(--h); background: linear-gradient(to top, #6366f1, #8b5cf6); border-radius: 5px 5px 2px 2px; transition: height 0.3s ease; }
.active-bar::before { background: linear-gradient(to top, #ec4899, #f97316); }
.bar span { font-size: 0.7rem; color: var(--text-muted); }
.donut-wrap { display: flex; align-items: center; gap: 14px; }
.donut { width: 80px; height: 80px; border-radius: 50%; background: conic-gradient(#6366f1 0deg 151deg, #8b5cf6 151deg 252deg, #ec4899 252deg 316deg, #06b6d4 316deg 360deg); flex-shrink: 0; }
.donut-legend { display: flex; flex-direction: column; gap: 6px; font-size: 0.78rem; color: var(--text-muted); }
.donut-legend div { display: flex; align-items: center; gap: 6px; }
.donut-legend span { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.table-card { background: var(--surface); border-radius: var(--radius); padding: 18px; box-shadow: var(--shadow); }
.table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.table-header h3 { font-size: 0.95rem; font-weight: 700; }
.btn-text { background: none; border: none; color: var(--primary); cursor: pointer; font-size: 0.85rem; font-weight: 600; }
table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
th { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--border); color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.5px; }
td { padding: 11px 10px; border-bottom: 1px solid var(--border); color: var(--text); }
tr:last-child td { border-bottom: none; }
.status { font-size: 0.75rem; font-weight: 600; padding: 3px 9px; border-radius: 99px; }
.status-success { background: #dcfce7; color: #16a34a; }
.status-pending { background: #fef9c3; color: #ca8a04; }
.status-failed { background: #fee2e2; color: #dc2626; }`
            }
          }
        }
      ]
    },
    {
      id: "level-7",
      title: "Interview Prep",
      emoji: "💼",
      badge: "IQ",
      color: "yellow",
      class: "level-7",
      description: "1000+ interview questions from beginner to senior engineer level.",
      isInterview: true,
      topics: []
    }
  ]
};
