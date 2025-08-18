// gatsby-node.js
const fs = require("fs");
const path = require("path");

exports.createPages = async ({ actions, reporter }) => {
  const { createPage } = actions;

  try {
    // Look under src/data/divisions.json
    const dataFile = path.join(process.cwd(), "src", "data", "divisions.json");
    if (!fs.existsSync(dataFile)) {
      reporter.panicOnBuild(`Missing data file at ${dataFile}`);
      return;
    }

    const raw = fs.readFileSync(dataFile, "utf8");
    let divisions = [];
    try {
      divisions = JSON.parse(raw);
    } catch (e) {
      reporter.panicOnBuild(`src/data/divisions.json is not valid JSON: ${e.message}`);
      return;
    }

    if (!Array.isArray(divisions)) {
      reporter.panicOnBuild(`src/data/divisions.json must export an array`);
      return;
    }

    const template = path.join(process.cwd(), "src", "templates", "division.js");

    divisions.forEach((division) => {
      if (!division?.slug) {
        reporter.warn(`Skipping a division without a "slug": ${JSON.stringify(division)}`);
        return;
      }

      const pagePath = `/divisions/${division.slug}/`;

      reporter.info(`Creating division page → ${pagePath}`);
      createPage({
        path: pagePath,
        component: template,
        context: {
          division,
        },
      });
    });
  } catch (err) {
    reporter.panicOnBuild(`createPages failed: ${err.message}`);
  }
};
