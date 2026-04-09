const controlTags = new Set(["all", "nav", "post", "posts"]);

export default class JsonFeed {
  data() {
    return {
      permalink: "/feed.json",
      eleventyExcludeFromCollections: true,
      skipOgImage: true
    };
  }

  render({ collections, site }) {
    const items = collections.posts.slice(0, 10).map(post => {
      const tags = (post.data.tags || []).filter(tag => !controlTags.has(tag));

      return {
        id: new URL(post.url, site.url).href,
        url: new URL(post.url, site.url).href,
        title: post.data.title,
        summary: post.data.description,
        content_html: post.templateContent,
        date_published: new Date(post.date).toISOString(),
        tags
      };
    });

    return JSON.stringify(
      {
        version: "https://jsonfeed.org/version/1.1",
        title: site.title,
        home_page_url: site.url,
        feed_url: new URL("/feed.json", site.url).href,
        description: site.description,
        authors: [
          {
            name: site.author.name,
            url: site.author.url
          }
        ],
        items
      },
      null,
      2
    );
  }
}
