// Alternância de tema claro/escuro com persistência em localStorage
// (Tailwind usa a estratégia de dark mode por classe: <html class="dark">)
(function () {
  const root = document.documentElement;
  const STORAGE_KEY = "larissa-portfolio-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
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

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  document.addEventListener("DOMContentLoaded", function () {
    updateToggleIcon(initialTheme);
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const current = root.classList.contains("dark") ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  });
})();
