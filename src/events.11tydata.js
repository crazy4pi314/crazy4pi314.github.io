export default {
  eleventyComputed: {
    permalink: data => data.site.features.eventsPage ? "/events/index.html" : false
  }
};
