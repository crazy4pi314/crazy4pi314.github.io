const STORAGE_KEY = "retro-accent";
const root = document.documentElement;
const allowedAccents = new Set(["ember", "surf", "mint"]);

function setAccent(accent) {
  if (!allowedAccents.has(accent)) {
    return;
  }

  root.dataset.accent = accent;
  window.localStorage.setItem(STORAGE_KEY, accent);

  document.querySelectorAll("[data-accent-picker]").forEach(group => {
    group.querySelectorAll("[data-accent-choice]").forEach(link => {
      const isActive = link.dataset.accentChoice === accent;

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

const queryAccent = new URLSearchParams(window.location.search).get("theme");
if (allowedAccents.has(queryAccent)) {
  setAccent(queryAccent);
} else {
  const storedAccent = window.localStorage.getItem(STORAGE_KEY);

  if (allowedAccents.has(storedAccent)) {
    setAccent(storedAccent);
  }
}

document.querySelectorAll("[data-accent-picker]").forEach(group => {
  group.addEventListener("click", event => {
    const link = event.target.closest("[data-accent-choice]");

    if (!link) {
      return;
    }

    setAccent(link.dataset.accentChoice);
  });
});
