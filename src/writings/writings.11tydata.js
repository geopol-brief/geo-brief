import path from "node:path";

export default {
  layout: "layouts/post.njk",
  kind: "writings",
  eleventyComputed: {
    permalink: (d) =>
      d.draft ? false : `/writings/${path.basename(d.page.inputPath, ".md")}/`,
  },
};
