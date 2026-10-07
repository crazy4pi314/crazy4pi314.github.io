const root = document.querySelector("[data-year-filter]");

if (root) {
  const select = root.querySelector(".year-filter-control");
  const posts = [...root.querySelectorAll("[data-year]")];
  const status = root.querySelector(".year-filter-status");
  const pager = root.querySelector(".pagination");
  const loader = root.querySelector(".feed-loader");
  const loadButton = root.querySelector(".feed-loader__button");
  const loadStatus = root.querySelector(".feed-loader__status");
  const batchSize = 6;
  const currentIndexes = posts
    .filter((post) => post.dataset.currentPage === "true")
    .map((post) => Number(post.dataset.feedIndex));
  let visibleCount = Math.max(Math.max(...currentIndexes, -1) + 1, Math.min(batchSize, posts.length));
  let observer;

  const showLoaded = () => {
    posts.forEach((post, index) => {
      post.hidden = index >= visibleCount;
    });
    loader.hidden = visibleCount >= posts.length;
    if (visibleCount >= posts.length) observer?.disconnect();
    else if (observer) {
      observer.unobserve(loader);
      requestAnimationFrame(() => observer.observe(loader));
    }
  };

  const loadMore = ({ focus = false } = {}) => {
    if (select.value !== "all" || visibleCount >= posts.length) return;
    const firstNew = posts[visibleCount];
    visibleCount = Math.min(visibleCount + batchSize, posts.length);
    showLoaded();
    loadStatus.textContent = `Showing ${visibleCount} of ${posts.length} entries`;
    if (focus) firstNew.querySelector(".u-url")?.focus();
  };

  const apply = (year) => {
    const filtering = year !== "all";
    let shown = 0;

    if (filtering) {
      for (const post of posts) {
        const match = post.dataset.year === year;
        post.hidden = !match;
        if (match) shown += 1;
      }
      loader.hidden = true;
    } else {
      showLoaded();
    }

    if (pager) pager.hidden = true;
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
  loadButton.addEventListener("click", () => loadMore({ focus: true }));
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) loadMore();
    }, { rootMargin: "0px 0px 600px" });
    observer.observe(loader);
  }
  root.querySelector(".year-filter-block").hidden = false;
  apply(select.value);
}
