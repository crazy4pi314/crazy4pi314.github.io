const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");
const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginUnfurl = require("eleventy-plugin-unfurl");
// const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");

module.exports = function(eleventyConfig) {
    // eleventyConfig.addPlugin(pluginMermaid);

    // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addPlugin(pluginUnfurl);

    // Configuration API: use eleventyConfig.addLayoutAlias(from, to) to add
    // layout aliases! Say you have a bunch of existing content using
    // layout: post. If you don’t want to rewrite all of those values, just map
    // post to a new file like this:
    // eleventyConfig.addLayoutAlias("post", "layouts/my_new_post_layout.njk");

    // Merge data instead of overriding
    // https://www.11ty.dev/docs/data-deep-merge/
    eleventyConfig.setDataDeepMerge(true);

    // Add support for maintenance-free post authors
    // Adds an authors collection using the author key in our post frontmatter
    // Thanks to @pdehaan: https://github.com/pdehaan
    eleventyConfig.addCollection("authors", collection => {
        const blogs = collection.getFilteredByGlob("posts/*.md");
        return blogs.reduce((coll, post) => {
            const author = post.data.author;
            if (!author) {
                return coll;
            }
            if (!coll.hasOwnProperty(author)) {
                coll[author] = [];
            }
            coll[author].push(post.data);
            return coll;
        }, {});
    });

    function filterTagList(tags) {
        return (tags || []).filter(tag => ["all", "nav"].indexOf(tag) === -1);
    }

    eleventyConfig.addFilter("filterTagList", filterTagList)

    eleventyConfig.addCollection("tagList", collection => {
        const tagsObject = {}
        collection.getAll().forEach(item => {
            if (!item.data.tags) return;
            item.data.tags
                .filter(tag => !['post', 'all'].includes(tag))
                .forEach(tag => {
                    if (typeof tagsObject[tag] === 'undefined') {
                        tagsObject[tag] = 1
                    } else {
                        tagsObject[tag] += 1
                    }
                });
        });

        const tagList = []
        Object.keys(tagsObject).forEach(tag => {
            tagList.push({ tagName: tag, tagCount: tagsObject[tag] })
        })
        return tagList.sort((a, b) => b.tagCount - a.tagCount)

    });



    // Date formatting (human readable)
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
    });

    // Date formatting (machine readable)
    eleventyConfig.addFilter("machineDate", dateObj => {
        return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
    });

    // Minify CSS
    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    // Minify JS
    eleventyConfig.addFilter("jsmin", function(code) {
        let minified = UglifyJS.minify(code);
        if (minified.error) {
            console.log("UglifyJS error: ", minified.error);
            return code;
        }
        return minified.code;
    });

    // Minify HTML output
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
        if (outputPath && outputPath.indexOf(".html") > -1) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }
        return content;
    });

    // Don't process folders with static assets e.g. images
    eleventyConfig.addPassthroughCopy("favicon.ico");
    eleventyConfig.addPassthroughCopy("static"); 
    eleventyConfig.addPassthroughCopy("talks"); 
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("_includes/assets/");

    /* Markdown Plugins */
    let markdownIt = require("markdown-it");
    let markdownItAnchor = require("markdown-it-anchor");
    let options = {
        html: true,
        breaks: true,
        linkify: true
    };
    let opts = {
        permalink: false
    };

    eleventyConfig.setLibrary("md", markdownIt(options)
        .use(markdownItAnchor, opts)
    );

    return {
        templateFormats: ["md", "njk", "html", "liquid"],

        // If your site lives in a different subdirectory, change this.
        // Leading or trailing slashes are all normalized away, so don’t worry about it.
        // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
        // This is only used for URLs (it does not affect your file structure)
        pathPrefix: "/",

        markdownTemplateEngine: "liquid",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};