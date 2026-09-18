// Alternância de tema claro/escuro com persistência em localStorage
(function () {
  const root = document.documentElement;
  const STORAGE_KEY = "larissa-portfolio-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
    );
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Aplica o tema o quanto antes para evitar "flash" de tema errado
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  document.addEventListener("DOMContentLoaded", function () {
    updateToggleIcon(initialTheme);
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  });
})();
