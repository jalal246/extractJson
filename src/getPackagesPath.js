/* eslint-disable no-console */
const glob = require("glob");

const { validateAccess, filterPathAccess } = require("./utils");

/**
 *
 * Gets packages path for a given project source root. It filters each path
 * using `validateAccess`
 *
 * @param {string} [dir="./packages/*"]
 *
 * @returns {Object[]} results
 * @returns {Array} results[].path valid path directory
 * @returns {Array} results[].ext extension for each path (js|ts)
 */
function getPackagesPath(dir = "./packages/*") {
  let path = [];
  let ext = [];

  path = glob.sync(dir);

  /**
   * If length is zero, not monorepo.
   */
  if (path.length === 0) {
    const { isValid, ext: fileExt } = validateAccess(".");

    if (isValid) {
      path.push(".");
      ext.push(fileExt);
    } else {
      console.error(
        "getPackagesPath: Unable to read package form project root directory"
      );
    }
  } else {
    ({ path, ext } = filterPathAccess(path));
  }

  // success(`> Found ${path.length} packages `);

  return { path, ext };
}

module.exports = getPackagesPath;
