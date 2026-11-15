import path from "node:path";

export default {
  layout: "layouts/post.njk",
  kind: "books",
  eleventyComputed: {
    permalink: (d) =>
      d.draft ? false : `/books/${path.basename(d.page.inputPath, ".md")}/`,
  },
};
