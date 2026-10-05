export default {
  eleventyComputed: {
    permalink: data => data.site.features.projects ? "/projects/index.html" : false
  }
};
