---
title: The Small-Web Toolkit
description: A quick tour of the pieces that make this starter feel current without sanding off its handmade vibe.
date: 2026-04-07
tags:
  - post
  - eleventy
  - webc
  - accessibility
eyebrow: field-note-003.md
---
The stack here is intentionally practical.

`Eleventy` handles the publishing flow. `WebC` gives us reusable little interface chunks. `is-land` keeps optional JavaScript from becoming a tax on every page view. `eleventy-plugin-og-image` makes social cards part of the build instead of a separate design chore.

I also wanted a setup that feels open to tinkering:

1. Markdown posts should stay first-class.
2. Tag URLs should stay clean and predictable.
3. Feeds should exist automatically.
4. Accessibility checks should fit into the normal workflow.

That combination is more interesting to me than a theme that looks polished in screenshots but feels brittle the moment you try to make it your own.

```yaml
---
title: A New Entry
description: This file lives in src/posts/
postSidebar: false
tags:
  - post
  - eleventy
---
```

That `postSidebar: false` flag is small, but it is the kind of thing that makes a starter feel considerate to edit.

Here are a few more examples from the kinds of files this starter is made of:

```js
import EleventyFetch from "@11ty/eleventy-fetch";

const data = await EleventyFetch("https://registry.npmjs.org/@11ty/eleventy/latest", {
  duration: "1d",
  type: "json"
});
```

```html
<nav class="accent-picker" aria-label="Switch the accent palette">
  <a href="?theme=ember">ember</a>
  <a href="?theme=surf">surf</a>
  <a href="?theme=mint">mint</a>
</nav>
```

```css
.author-panel {
  border: 2px solid var(--color-line);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), var(--accent-soft));
}
```

```bash
npm install
npm run start
```
