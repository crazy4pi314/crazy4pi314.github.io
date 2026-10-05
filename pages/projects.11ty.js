// Top-level Projects listing page, gated by the `features.projectsPage` flag in _data/site.json.
// Individual project pages are always built; only this listing page and its nav entry are toggled.
const site = require("../_data/site.json");
const enabled = Boolean(site.features && site.features.projectsPage);

class ProjectsPage {
  data() {
    return {
      layout: "layouts/projects.njk",
      title: "Projects",
      date: new Date("2021-01-01"),
      permalink: enabled ? "/projects/index.html" : false,
      metaDescription: "",
      subtitle: "",
      emoji: "💻",
      eleventyExcludeFromCollections: !enabled,
      ...(enabled && { eleventyNavigation: { key: "Projects", order: 4 } }),
    };
  }

  render() {
    return "";
  }
}

module.exports = ProjectsPage;
