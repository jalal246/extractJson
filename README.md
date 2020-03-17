# get-info

> Utility functions deal with files in your project. Make production easier :mag_right:

`get-info` Contains a bunch od functions read packages in root project,
validate each package, return the path, JSON, and extension(js|ts) used for each
one. As it is essentially created to deal with monorepos, it works as well for a
single package project.

```bash
npm install get-info
```

## API

If not passed path or ext (more likely you don't need to), then all functions
can automatically read the current project directory whether it is
`packages/**/src` or `./src`

### getJsonByName

```js
/**
 * Extracts package json, extension, and resolved distention path for each given
 * name.
 *
 * @param {string} [buildName="dist"]
 * @param {string} paths contain paths to resolve and extracts info from
 * @param {string} names contain package names in repo.
 *
 * @returns {Object[]} results
 * @returns {Array} results[].json - packages json related to given package-name
 * @returns {Object} results[].pkgInfo - {dist, ext}
 */

const { json, pkgInfo } = getJsonByName(buildName, ...path)(...names);
```

#### Example(1)

```js
import { getJsonByName } from "get-info";

const { json, pkgInfo } = getJsonByName()("myFav/project another/project");

// json>> [{name: @myFav/project, version: "1.1.1", main: "index.js", ...}, {...}]
//
// pkgInfo>> {@myFav/project, ...}
//
// pkgInfo[@myFav/project]>> {ext: js, dist: "root/**/myFav-project/dist/"}
```

### getJsonByPath

```js
/**
 * Extracts package json, extension, and resolved distention path for each given
 * path.
 *
 * @param {string} [buildName="dist"]
 * @param {string} paths contain paths to resolve and extracts info from
 *
 * @returns {Object[]} results
 * @returns {Array} results[].json - packages json related to given path
 * @returns {Object} results[].pkgInfo - {dist, ext}
 */
const { json, pkgInfo } = getJsonByPath(buildName)(...paths);
```

#### Example(2)

```js
import { getJsonByPath } from "get-info";

const { json, pkgInfo } = getJsonByPath()();

// json>> [{name: get-info, version: "1.1.1", main: "index.js", ...}]
//
// pkgInfo>> {get-info}
//
// pkgInfo[get-info]>> {ext: js, dist: "root/**/get-info/dist/"}
```

### getPackagesPath

```js
/**
 * Gets packages path for a given project source root. It filters each path
 * returns only packages contain valid src/index and have package.json
 *
 * @param {string} [dir="./packages/*"]
 *
 * @returns {Object[]} results
 * @returns {Array} results[].path valid path directory
 * @returns {Array} results[].ext extension for each path (js|ts)
 */
const { path, ext } = getPackagesPath(dir);
```

#### Example(3)

```js
import { getPackagesPath } from "get-info";

const { path, ext } = getPackagesPath();

// path>> [
//   "./packages/myProj1",
//   "./packages/myProj2",
//   "./packages/myProj3"
// ];

// ext>> ["js", "ts", "ts"];
```

### Utils

Utility functions used in this project are also exported for further use.

#### utils.getFileExtension

```js
import { utils } from "get-info";

/**
 * Loop inside a given directory looking for index. When find it, gets its
 * extension.
 *
 * @param {string} dir - given directory
 * @returns {string} extension.
 */
const { getFileExtension } = utils;
const extension = getFileExtension(dir);
```

#### utils.validateAccess

```js
import { utils } from "get-info";
const { validateAccess } = utils;

/**
 * Validates access readability `package.json` & `src` for given path.
 *
 * @param {string} [dir="."]
 * @param {string} [ext=getFileExtension(dir/src)]
 * @param {string} [srcName="src"]
 *
 * @returns {Object} result
 * @returns {boolean} result.isValid
 * @returns {string} result.ext
 */
const { isValid, ext } = validateAccess(dir, ext, srcName);
```

#### utils.filterPathAccess

```js
import { utils } from "get-info";
const { filterPathAccess } = utils;

/**
 * Filters array of paths by validate each path. Makes sure it has
 * `package.json` and `src`.
 *
 * @param {Array} [pkgPath=[]]
 * @returns {Object} results[]
 * @returns {Array} results[].path filtered valid paths
 * @returns {Array} results[].ext extension for each path (js|ts)
 */
const { path, ext } = filterPathAccess(pkgPath);
```

### Related projects

- [packageSorter](https://github.com/jalal246/packageSorter) - Sorting packages
  for monorepos production.

- [builderz](https://github.com/jalal246/builderz) - Building your project with zero config.

- [corename](https://github.com/jalal246/corename) - Extracts package name.

- [move-position](https://github.com/jalal246/move-position) - Moves element
  index in an array.

- [textics](https://github.com/jalal246/textics) & [textics-stream](https://github.com/jalal246/textics-stream) - Counts lines, words, chars and spaces for a given string.

## Tests

```sh
npm test
```

## License

This project is licensed under the [GPL-3.0 License](https://github.com/jalal246/get-info/blob/master/LICENSE)
