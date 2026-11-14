import path from "node:path";

export default {
  layout: "layouts/post.njk",
  kind: "briefs",
  eleventyComputed: {
    permalink: (d) =>
      d.draft ? false : `/briefs/${path.basename(d.page.inputPath, ".md")}/`,
  },
};
