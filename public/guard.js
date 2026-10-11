/*
 * Защита страниц: запрет зума, контекстного меню, выделения/копирования,
 * горячих клавиш инструментов разработчика и просмотра кода.
 * Зум на телефонах запрещают viewport (user-scalable=no) и touch-action;
 * жесты щипка здесь не отменяются: iOS всё равно начинает зум, и отмена
 * посреди жеста заставляла страницу дёргаться.
 * Подключается и на сайте, и в каждом демо из public/demos.
 */
(function () {
  if (window.__guard) return;
  window.__guard = 1;

  var d = document;
  var stop = function (e) {
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
    return false;
  };
  var editable = function (el) {
    return el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  };

  /* ── зум ── */
  window.addEventListener('wheel', function (e) { if (e.ctrlKey || e.metaKey) e.preventDefault(); }, { passive: false });

  /* ── клавиши ── */
  d.addEventListener(
    'keydown',
    function (e) {
      var c = e.code || '';
      var k = (e.key || '').toLowerCase();
      var mod = e.ctrlKey || e.metaKey;
      if (k === 'f12') return stop(e);
      // зум клавиатурой
      if (mod && (k === '+' || k === '-' || k === '=' || k === '_' || k === '0' || c === 'Equal' || c === 'Minus' || c === 'Digit0' || c === 'NumpadAdd' || c === 'NumpadSubtract')) return stop(e);
      // исходный код, сохранение, печать
      if (mod && (c === 'KeyU' || c === 'KeyS' || c === 'KeyP')) return stop(e);
      // инструменты разработчика: Ctrl+Shift+I/J/C/K, Cmd+Opt+I/J/C/U
      if (mod && (e.shiftKey || e.altKey) && /^Key(I|J|C|K|U)$/.test(c)) return stop(e);
      // выделить всё
      if (mod && c === 'KeyA' && !editable(e.target)) return stop(e);
    },
    true,
  );

  /* ── мышь, выделение, копирование ── */
  d.addEventListener('contextmenu', stop, true);
  d.addEventListener('dragstart', function (e) { if (!editable(e.target)) stop(e); }, true);
  d.addEventListener('selectstart', function (e) { if (!editable(e.target)) stop(e); }, true);
  ['copy', 'cut'].forEach(function (t) {
    d.addEventListener(t, function (e) { if (!editable(e.target)) stop(e); }, true);
  });

  var css = d.createElement('style');
  css.textContent =
    'html{touch-action:manipulation;-webkit-touch-callout:none}' +
    'body{-webkit-user-select:none;user-select:none}' +
    'input,textarea,[contenteditable]{-webkit-user-select:text;user-select:text}' +
    'img,svg,video,canvas{-webkit-user-drag:none}';
  (d.head || d.documentElement).appendChild(css);
})();
