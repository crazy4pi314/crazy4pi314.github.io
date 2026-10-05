const root = document.querySelector("[data-year-filter]");

if (root) {
  const select = root.querySelector(".year-filter-control");
  const posts = [...root.querySelectorAll("[data-year]")];
  const status = root.querySelector(".year-filter-status");
  const pager = root.querySelector(".pagination");

  const apply = (year) => {
    const filtering = year !== "all";
    let shown = 0;

    for (const post of posts) {
      const match = filtering ? post.dataset.year === year : post.dataset.currentPage === "true";
      post.hidden = !match;
      if (match) shown += 1;
    }

    if (pager) pager.hidden = filtering;
    status.hidden = !filtering;
    status.textContent = filtering
      ? `Showing ${shown} entr${shown === 1 ? "y" : "ies"} from ${year}`
      : "";

    const url = new URL(window.location.href);
    if (filtering) url.searchParams.set("year", year);
    else url.searchParams.delete("year");
    window.history.replaceState(null, "", url);
  };

  const initial = new URLSearchParams(window.location.search).get("year");
  if (initial && [...select.options].some((option) => option.value === initial)) {
    select.value = initial;
  }

  select.addEventListener("change", () => apply(select.value));
  root.querySelector(".year-filter-block").hidden = false;
  if (select.value !== "all") apply(select.value);
}
