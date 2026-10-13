export default {
  eleventyComputed: {
    permalink: data => (data.site.features.search ? "/search/index.html" : false),
    eleventyExcludeFromCollections: data => !data.site.features.search
  }
};
