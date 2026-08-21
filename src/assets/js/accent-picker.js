const STORAGE_KEY = "retro-accent";
const root = document.documentElement;
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
const allowedChoices = new Set(
  Array.from(document.querySelectorAll("[data-accent-choice]"), link => link.dataset.accentChoice)
);

function resolveAccent(choice) {
  return choice === "system" ? (colorScheme.matches ? "midnight" : "ember") : choice;
}

function setAccent(choice, persist = true) {
  if (!allowedChoices.has(choice)) {
    return;
  }

  const accent = resolveAccent(choice);
  root.dataset.accent = accent;
  root.dataset.accentChoice = choice;
  root.style.colorScheme = accent === "midnight" ? "dark" : "light";
  document.querySelector("[data-theme-color]")?.setAttribute(
    "content",
    accent === "midnight" ? "#0c1118" : "#fff7e8"
  );

  if (persist) {
    window.localStorage.setItem(STORAGE_KEY, choice);
  }

  document.querySelectorAll("[data-accent-picker]").forEach(group => {
    group.querySelectorAll("[data-accent-choice]").forEach(link => {
      const isActive = link.dataset.accentChoice === choice;

      if (isActive) {
        link.setAttribute("aria-current", "page");
        link.dataset.active = "true";
      } else {
        link.removeAttribute("aria-current");
        delete link.dataset.active;
      }
    });
  });
}

const queryChoice = new URLSearchParams(window.location.search).get("theme");
const storedChoice = window.localStorage.getItem(STORAGE_KEY);
const initialChoice = allowedChoices.has(queryChoice)
  ? queryChoice
  : allowedChoices.has(storedChoice)
    ? storedChoice
    : root.dataset.defaultAccent || "system";

setAccent(initialChoice, false);

document.querySelectorAll("[data-accent-picker]").forEach(group => {
  group.addEventListener("click", event => {
    const link = event.target.closest("[data-accent-choice]");

    if (!link) {
      return;
    }

    event.preventDefault();
    const choice = link.dataset.accentChoice;
    setAccent(choice);

    const url = new URL(window.location.href);
    url.searchParams.set("theme", choice);
    window.history.replaceState({}, "", url);
  });
});

colorScheme.addEventListener("change", () => {
  if (root.dataset.accentChoice === "system") {
    setAccent("system", false);
  }
});
