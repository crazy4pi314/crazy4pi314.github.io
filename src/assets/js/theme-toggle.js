const STORAGE_KEY = "site-theme";
const MODES = ["light", "dark", "auto"];
const root = document.documentElement;
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

function resolveTheme(mode) {
  if (mode === "auto") {
    return colorScheme.matches ? "laser-dark" : "laser";
  }

  return mode === "dark" ? "laser-dark" : "laser";
}

function themeColor(theme) {
  return theme === "laser-dark" ? "#11131a" : "#f3f4f7";
}

function updateToggle(mode) {
  document.querySelectorAll("[data-theme-toggle]").forEach(button => {
    const nextMode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
    const label = mode[0].toUpperCase() + mode.slice(1);
    const nextLabel = nextMode[0].toUpperCase() + nextMode.slice(1);

    button.dataset.themeMode = mode;
    button.querySelector("[data-theme-label]").textContent = label;
    button.setAttribute("aria-label", `Theme: ${label}. Switch to ${nextLabel.toLowerCase()} theme.`);
  });
}

function setTheme(mode, persist = true) {
  if (!MODES.includes(mode)) {
    return;
  }

  const theme = resolveTheme(mode);
  root.dataset.themeMode = mode;
  root.dataset.accent = theme;
  root.style.colorScheme = theme === "laser-dark" ? "dark" : "light";
  document.querySelector("[data-theme-color]")?.setAttribute("content", themeColor(theme));

  if (persist) {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }

  updateToggle(mode);
}

const queryMode = new URLSearchParams(window.location.search).get("theme");
const storedMode = window.localStorage.getItem(STORAGE_KEY);
const initialMode = MODES.includes(queryMode)
  ? queryMode
  : MODES.includes(storedMode)
    ? storedMode
    : root.dataset.defaultTheme || "auto";

setTheme(initialMode, false);

document.querySelectorAll("[data-theme-toggle]").forEach(button => {
  button.addEventListener("click", () => {
    const currentMode = root.dataset.themeMode || "auto";
    const nextMode = MODES[(MODES.indexOf(currentMode) + 1) % MODES.length];
    setTheme(nextMode);

    const url = new URL(window.location.href);
    url.searchParams.set("theme", nextMode);
    window.history.replaceState({}, "", url);
  });
});

colorScheme.addEventListener("change", () => {
  if (root.dataset.themeMode === "auto") {
    setTheme("auto", false);
  }
});
