/* eslint-disable func-names */
const { msg, success, error } = require("@mytools/print");
const { resolve } = require("path");
const fs = require("fs");

const getPackagesPath = require("./getPackagesPath");

const { getFileExtension } = require("./utils");

let buildName;
let ext = [];

/**
 * Extracts package json, extension, and resolved distention path for each given
 * path.
 *
 * @param {Array} defaultPaths  contains paths to resolve and extracts info form.
 *
 * @returns {Object[]} results
 * @returns {Array} results[].json - packages json related to given path
 * @returns {Object} results[].pkgInfo - {dist, ext}
 */
function byPath(defaultPaths) {
  const pkgInfo = {};

  const packagesJson = defaultPaths.map((pkgPath, i) => {
    const pkgJson = resolve(pkgPath, "package.json");

    try {
      const json = fs.readFileSync(pkgJson, "utf8");

      const { name, peerDependencies, dependencies, ...other } = JSON.parse(
        json
      );

      const pkgExt = ext[i] || getFileExtension(resolve(pkgPath, "src"));

      const sourcePath = resolve(pkgPath, "src", `index.${pkgExt}`);

      const dist = resolve(pkgPath, buildName);

      /**
       * Add extracted extra info to pkgInfo and keep pkgJson as it is.
       */
      pkgInfo[name] = {
        dist,
        ext: pkgExt
      };

      return {
        sourcePath,
        name,
        peerDependencies,
        dependencies,
        ...other
      };
    } catch (e) {
      error(`${e}`);
      return false;
    }
  });

  const filteredPkgJson = packagesJson.filter(Boolean);

  success(`> Done extracting ${filteredPkgJson.length} packages json`);

  return { json: filteredPkgJson, pkgInfo };
}

/**
 * Wrapper function inits paths, ext and build name.
 *
 * @param {string} bName -buildName
 * @returns {function}
 */
function getJsonByPath(bName) {
  buildName = bName || "dist";

  return function(...defaultPaths) {
    let path;

    if (defaultPaths.length === 0) {
      msg(`Getting all paths`);

      ({ path, ext } = getPackagesPath());
    } else {
      path = defaultPaths;
    }

    return byPath(path);
  };
}

module.exports = getJsonByPath;
