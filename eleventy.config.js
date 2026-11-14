import markdownIt from "markdown-it";
import topics from "./src/_data/topics.js";

const md = markdownIt({ html: true, linkify: true });
const pad = (n) => String(n).padStart(2, "0");
const topicMap = Object.fromEntries(topics.map((t) => [t.key, t]));
const byDateDesc = (a, b) => b.date - a.date;
const published = (p) => !p.data.draft;

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  // Render a markdown string stored in front matter (used for the English body).
  eleventyConfig.addFilter("md", (s) => (s ? md.render(String(s)) : ""));
  eleventyConfig.addFilter("ymd", (d) => {
    const x = new Date(d);
    return `${x.getUTCFullYear()}.${pad(x.getUTCMonth() + 1)}.${pad(x.getUTCDate())}`;
  });
  eleventyConfig.addFilter("ym", (d) => {
    const x = new Date(d);
    return `${x.getUTCFullYear()}.${pad(x.getUTCMonth() + 1)}`;
  });
  eleventyConfig.addFilter("iso", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("rfc822", (d) => new Date(d).toUTCString());
  eleventyConfig.addFilter("topicKo", (k) => (topicMap[k] ? topicMap[k].ko : k));
  eleventyConfig.addFilter("topicEn", (k) => (topicMap[k] ? topicMap[k].en : k));
  eleventyConfig.addFilter("withTag", (items, key) =>
    items.filter((i) => (i.data.tags || []).includes(key))
  );
  eleventyConfig.addFilter("head", (arr, n) => arr.slice(0, n));
  eleventyConfig.addFilter("xmlEscape", (s) =>
    String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  );

  eleventyConfig.addCollection("briefs", (api) =>
    api.getFilteredByGlob("src/briefs/*.md").filter(published).sort(byDateDesc)
  );
  eleventyConfig.addCollection("writings", (api) =>
    api.getFilteredByGlob("src/writings/*.md").filter(published).sort(byDateDesc)
  );
  eleventyConfig.addCollection("posts", (api) =>
    [...api.getFilteredByGlob("src/briefs/*.md"), ...api.getFilteredByGlob("src/writings/*.md")]
      .filter(published)
      .sort(byDateDesc)
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "11ty.js"],
  };
}
