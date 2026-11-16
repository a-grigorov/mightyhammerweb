// Light/dark theme. The site follows the system setting; the header toggle
// overrides it and the choice is remembered. Picking the same theme as the
// system clears the override, so the site follows the system again.
// Loaded in <head> without defer, so a saved choice applies before first paint.
(function () {
  var root = document.documentElement;
  var system = window.matchMedia('(prefers-color-scheme: dark)');

  function load() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function store(value) {
    try {
      if (value) localStorage.setItem('theme', value);
      else localStorage.removeItem('theme');
    } catch (e) {}
  }
  function systemTheme() { return system.matches ? 'dark' : 'light'; }
  function currentTheme() { return root.getAttribute('data-theme') || systemTheme(); }

  var saved = load();
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;

    function updateLabel() {
      var label = currentTheme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
      button.setAttribute('aria-label', label);
      button.title = label;
    }

    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      if (next === systemTheme()) {
        root.removeAttribute('data-theme');
        store(null);
      } else {
        root.setAttribute('data-theme', next);
        store(next);
      }
      updateLabel();
    });
    if (system.addEventListener) system.addEventListener('change', updateLabel);

    updateLabel();
    button.hidden = false;
  });
})();
