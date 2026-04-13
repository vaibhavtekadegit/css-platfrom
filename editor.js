// ============================================
// CSS MASTERY PLATFORM - Editor Engine (Fixed)
// ============================================

const EDITOR = (() => {

  let _mode = 'lesson';
  let _origHTML = '';
  let _origCSS  = '';
  let _updateTimer = null;
  let _isDragging = false;
  let _dragStartY = 0;
  let _dragStartH = 0;

  // ---- Public: init lesson playground ----
  function init(html, css) {
    _mode     = 'lesson';
    _origHTML = html || '';
    _origCSS  = css  || '';
    _setup('pg', html, css);
  }

  // ---- Public: init challenge editor ----
  function initChallenge(html, css) {
    _mode     = 'challenge';
    _origHTML = html || '';
    _origCSS  = css  || '';
    _setup('ch', html, css);
  }

  // ---- Public: override CSS (solution / reset) ----
  function setCSS(css) {
    const p = _mode === 'lesson' ? 'pg' : 'ch';
    const el = document.getElementById(p + '-css-editor');
    if (el) { el.value = css; _render(p); }
  }

  // ---- Core setup: fill editors + wire events ----
  function _setup(p, html, css) {
    requestAnimationFrame(() => {
      const cssEl  = document.getElementById(p + '-css-editor');
      const htmlEl = document.getElementById(p + '-html-editor');

      if (cssEl)  cssEl.value  = css  || '';
      if (htmlEl) htmlEl.value = html || '';

      _bindButtons(p);
      _bindEditorInput(p);
      _bindResizer(p);
      _render(p);
    });
  }

  // ---- Bind toolbar buttons ----
  function _bindButtons(p) {
    _on(p + '-btn-run',    () => _render(p));
    _on(p + '-btn-reset',  () => _doReset(p));
    _on(p + '-btn-format', () => _doFormat(p));
    _on(p + '-btn-copy',   () => _doCopy(p));
  }

  function _on(id, fn) {
    const el = document.getElementById(id);
    if (!el) return;
    const clone = el.cloneNode(true);
    el.parentNode.replaceChild(clone, el);
    clone.addEventListener('click', fn);
  }

  // ---- Bind live typing ----
  function _bindEditorInput(p) {
    const cssEl  = document.getElementById(p + '-css-editor');
    const htmlEl = document.getElementById(p + '-html-editor');

    if (cssEl) {
      cssEl.addEventListener('input', () => {
        clearTimeout(_updateTimer);
        _updateTimer = setTimeout(() => _render(p), 300);
        _updateLineCount(p, cssEl.value);
      });
      cssEl.addEventListener('keydown', (e) => _handleKey(e, cssEl, p));
    }

    if (htmlEl) {
      htmlEl.addEventListener('input', () => {
        clearTimeout(_updateTimer);
        _updateTimer = setTimeout(() => _render(p), 300);
      });
      htmlEl.addEventListener('keydown', (e) => _handleKey(e, htmlEl, p));
    }
  }

  // ---- Key handling ----
  function _handleKey(e, ta, p) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = ta.selectionStart, end = ta.selectionEnd;
      if (e.shiftKey) {
        const ls = ta.value.lastIndexOf('\n', s - 1) + 1;
        if (ta.value.substring(ls, ls + 2) === '  ') {
          ta.value = ta.value.substring(0, ls) + ta.value.substring(ls + 2);
          ta.selectionStart = ta.selectionEnd = s - 2;
        }
      } else {
        ta.value = ta.value.substring(0, s) + '  ' + ta.value.substring(end);
        ta.selectionStart = ta.selectionEnd = s + 2;
      }
      ta.dispatchEvent(new Event('input'));
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      _render(p);
    }
  }

  // ---- Render into iframe using srcdoc ----
  function _render(p) {
    const cssEl  = document.getElementById(p + '-css-editor');
    const htmlEl = document.getElementById(p + '-html-editor');
    const iframe = document.getElementById(p + '-preview');

    if (!iframe) return;

    const css  = cssEl  ? cssEl.value  : '';
    const html = htmlEl ? htmlEl.value : '';
    const doc  = _buildDoc(html, css);

    iframe.srcdoc = doc;

    // Also sync standalone preview tab
    const iframeFull = document.getElementById(p + '-preview-full');
    if (iframeFull) iframeFull.srcdoc = doc;

    if (cssEl) _updateLineCount(p, cssEl.value);
  }

  // ---- Build full iframe document ----
  function _buildDoc(html, css) {
    const isFullDoc = /<!doctype/i.test(html.trim());

    if (isFullDoc) {
      if (html.includes('id="user-css"')) {
        return html.replace(
          /<style id="user-css">[\s\S]*?<\/style>/,
          `<style id="user-css">\n${css}\n</style>`
        );
      }
      return html.replace('</head>', `<style>\n${css}\n</style>\n</head>`);
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>*, *::before, *::after { box-sizing: border-box; }</style>
<style id="user-css">
${css}
</style>
</head>
<body>
${html}
</body>
</html>`;
  }

  // ---- Reset ----
  function _doReset(p) {
    const cssEl  = document.getElementById(p + '-css-editor');
    const htmlEl = document.getElementById(p + '-html-editor');
    if (cssEl)  cssEl.value  = _origCSS;
    if (htmlEl) htmlEl.value = _origHTML;
    _render(p);
    if (typeof showToast === 'function') showToast('↺ Reset to original', '');
  }

  // ---- Format ----
  function _doFormat(p) {
    const cssEl = document.getElementById(p + '-css-editor');
    if (!cssEl) return;
    cssEl.value = _beautify(cssEl.value);
    _render(p);
    if (typeof showToast === 'function') showToast('✨ CSS formatted!', 'success');
  }

  function _beautify(css) {
    let out = '', depth = 0;
    css.replace(/\r\n/g, '\n').split('\n').map(l => l.trim()).filter(Boolean).forEach(line => {
      if (line.endsWith('{'))       { out += '  '.repeat(depth) + line + '\n'; depth++; }
      else if (line.startsWith('}')){ depth = Math.max(0, depth-1); out += '  '.repeat(depth) + line + '\n\n'; }
      else                          { out += '  '.repeat(depth) + line + '\n'; }
    });
    return out.trim();
  }

  // ---- Copy CSS ----
  function _doCopy(p) {
    const el = document.getElementById(p + '-css-editor');
    if (!el) return;
    navigator.clipboard.writeText(el.value)
      .then(() => { if (typeof showToast === 'function') showToast('📋 Copied!', 'success'); });
  }

  // ---- Line count ----
  function _updateLineCount(p, code) {
    const el = document.getElementById(p + '-line-count');
    if (el) el.textContent = ((code.match(/\n/g) || []).length + 1) + ' LINES';
  }

  // ---- Resizable splitter ----
  function _bindResizer(p) {
    const resizer = document.getElementById(p + '-resizer');
    const edPanel = document.getElementById(p + '-editor-panel');
    if (!resizer || !edPanel) return;

    resizer.addEventListener('mousedown', (e) => {
      _isDragging = true;
      _dragStartY = e.clientY;
      _dragStartH = edPanel.offsetHeight;
      resizer.classList.add('dragging');
      document.body.style.cursor     = 'row-resize';
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!_isDragging) return;
      const newH = Math.max(80, Math.min(_dragStartH + (e.clientY - _dragStartY), window.innerHeight - 150));
      edPanel.style.height = newH + 'px';
      edPanel.style.flex   = 'none';
    });

    document.addEventListener('mouseup', () => {
      if (!_isDragging) return;
      _isDragging = false;
      resizer.classList.remove('dragging');
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
    });
  }

  return { init, initChallenge, setCSS };

})();


// ============================================
// PLAYGROUND HTML TEMPLATE
// ============================================

function buildPlaygroundHTML(p) {
  return `
<div class="playground-tabs">
  <div class="pg-tab active" data-pg-tab="css"     onclick="pgTab('${p}','css',this)">CSS</div>
  <div class="pg-tab"        data-pg-tab="html"    onclick="pgTab('${p}','html',this)">HTML</div>
  <div class="pg-tab"        data-pg-tab="preview" onclick="pgTab('${p}','preview',this)">Preview</div>
</div>

<div class="playground-panel active" id="${p}-panel-css" style="display:flex;flex-direction:column;flex:1;overflow:hidden;">
  <div class="editor-area" id="${p}-editor-panel" style="height:200px;flex:none;display:flex;flex-direction:column;">
    <div class="editor-toolbar">
      <span class="editor-label">STYLES.CSS</span>
      <div style="display:flex;align-items:center;gap:6px;">
        <span id="${p}-line-count" style="font-size:10px;color:var(--text-muted);font-family:var(--font-code);"></span>
        <div class="editor-btns">
          <button class="editor-btn" id="${p}-btn-format">⚡ Format</button>
          <button class="editor-btn" id="${p}-btn-copy">📋 Copy</button>
          <button class="editor-btn" id="${p}-btn-reset">↺ Reset</button>
          <button class="editor-btn run" id="${p}-btn-run">▶ Run</button>
        </div>
      </div>
    </div>
    <div class="editor-wrapper" style="flex:1;overflow:hidden;">
      <textarea class="code-editor" id="${p}-css-editor"
        spellcheck="false" autocorrect="off" autocapitalize="off"
        placeholder="/* Write your CSS here */"></textarea>
    </div>
  </div>

  <div class="pg-resizer" id="${p}-resizer"></div>

  <div style="flex:1;min-height:160px;position:relative;background:#fff;">
    <span style="position:absolute;top:8px;right:10px;font-size:10px;font-weight:600;letter-spacing:.8px;color:#999;background:rgba(255,255,255,.9);padding:2px 8px;border-radius:99px;z-index:1;">PREVIEW</span>
    <iframe id="${p}-preview" title="Live Preview"
      style="width:100%;height:100%;border:none;display:block;"
      sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
  </div>
</div>

<div class="playground-panel" id="${p}-panel-html" style="display:none;flex-direction:column;flex:1;overflow:hidden;">
  <div class="editor-area" style="flex:1;display:flex;flex-direction:column;">
    <div class="editor-toolbar">
      <span class="editor-label">INDEX.HTML</span>
      <div class="editor-btns">
        <button class="editor-btn" onclick="copyHTMLEditor('${p}')">📋 Copy HTML</button>
      </div>
    </div>
    <div class="editor-wrapper" style="flex:1;overflow:hidden;">
      <textarea class="code-editor" id="${p}-html-editor"
        spellcheck="false" autocorrect="off" autocapitalize="off"
        style="color:#82aaff;"
        placeholder="<!-- Write your HTML here -->"></textarea>
    </div>
  </div>
</div>

<div class="playground-panel" id="${p}-panel-preview" style="display:none;flex-direction:column;flex:1;">
  <div style="padding:8px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--text-muted);display:flex;justify-content:space-between;background:var(--bg-secondary);">
    <span>LIVE PREVIEW</span>
    <button class="editor-btn" onclick="openFullPreview('${p}')">⛶ Full Screen</button>
  </div>
  <iframe id="${p}-preview-full" title="Full Preview"
    style="width:100%;flex:1;border:none;background:#fff;"
    sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
</div>`;
}


// ============================================
// CHALLENGE EDITOR TEMPLATE
// ============================================

function buildChallengeEditorHTML(p) {
  return `
<div style="flex:1;display:flex;flex-direction:column;overflow:hidden;">
  <div class="editor-toolbar">
    <span class="editor-label">CHALLENGE.CSS</span>
    <div style="display:flex;align-items:center;gap:6px;">
      <span id="${p}-line-count" style="font-size:10px;color:var(--text-muted);font-family:var(--font-code);"></span>
      <div class="editor-btns">
        <button class="editor-btn" id="${p}-btn-format">⚡ Format</button>
        <button class="editor-btn" id="${p}-btn-reset">↺ Reset</button>
        <button class="editor-btn run" id="${p}-btn-run">▶ Run</button>
      </div>
    </div>
  </div>
  <div class="editor-wrapper" style="flex:1;overflow:hidden;">
    <textarea class="code-editor" id="${p}-css-editor"
      spellcheck="false" autocorrect="off" autocapitalize="off"
      placeholder="/* Write your CSS here */"></textarea>
  </div>
</div>
<textarea id="${p}-html-editor" style="display:none;"></textarea>`;
}


// ============================================
// GLOBAL HELPERS
// ============================================

function pgTab(p, name, btn) {
  btn.closest('.playground-tabs').querySelectorAll('.pg-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.pgTab === name)
  );
  ['css','html','preview'].forEach(tab => {
    const panel = document.getElementById(`${p}-panel-${tab}`);
    if (!panel) return;
    panel.style.display = tab === name ? 'flex' : 'none';
  });
}

function copyHTMLEditor(p) {
  const el = document.getElementById(p + '-html-editor');
  if (!el) return;
  navigator.clipboard.writeText(el.value)
    .then(() => showToast('📋 HTML copied!', 'success'));
}

function openFullPreview(p) {
  const css  = document.getElementById(p + '-css-editor')?.value  || '';
  const html = document.getElementById(p + '-html-editor')?.value || '';
  const doc  = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>*,*::before,*::after{box-sizing:border-box}</style>
<style>${css}</style></head><body>${html}</body></html>`;
  window.open(URL.createObjectURL(new Blob([doc], { type:'text/html' })), '_blank');
}
