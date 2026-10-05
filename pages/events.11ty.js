// Top-level Events listing page, gated by the `features.eventsPage` flag in _data/site.json.
// Individual event pages are always built; only this listing page and its nav entry are toggled.
const site = require("../_data/site.json");
const enabled = Boolean(site.features && site.features.eventsPage);

class EventsPage {
  data() {
    return {
      layout: "layouts/events.njk",
      title: "Events",
      date: new Date("2021-01-01"),
      permalink: enabled ? "/events/index.html" : false,
      metaDescription: "All the places you can find Sarah online.",
      subtitle: "",
      emoji: "💻",
      eleventyExcludeFromCollections: !enabled,
      ...(enabled && { eleventyNavigation: { key: "Events", order: 4 } }),
    };
  }

  render() {
    return "";
  }
}

module.exports = EventsPage;
