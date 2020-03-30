const { expect } = require("chai");
const { getJsonByName } = require("../src");

describe("getJsonByName", () => {
  it("Default: gets current path with ext and json", () => {
    const { json, pkgInfo } = getJsonByName();

    expect(json).to.be.an("Array");
    expect(pkgInfo).to.be.an("Object");

    expect(json.length).to.be.equal(1);

    expect(json[0]).to.have.own.property("dependencies");

    /**
     * By default, will read the project scr and package json.
     */
    const { name, dependencies } = json[0];

    expect(name).to.be.equal("get-info");
    expect(dependencies).to.be.an("Object");

    const { srcPath, ext } = pkgInfo[name];

    expect(srcPath).to.be.an("string");
    expect(ext).to.be.equal("js");
  });

  it("gets array of json with default path", () => {
    const { json } = getJsonByName("get-info");

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(1);

    expect(json[0].name).to.be.equal("get-info");
  });

  // it("gets array of json with a given path", () => {
  //   const { path } = getPackagesPath("./test/packages-valid/*");

  //   const { json } = getJsonByName("dist", ...path)();

  //   expect(json).to.be.an("Array");
  //   expect(json.length).to.be.equal(5);

  //   expect(json[0].name).to.be.equal("@folo/forms");
  //   expect(json[1].name).to.be.equal("@folo/layout");
  //   expect(json[3].name).to.be.equal("@folo/values");
  //   expect(json[4].name).to.be.equal("@folo/withcontext");
  // });

  // it("gets array of json with a given path and names", () => {
  //   const { path } = getPackagesPath("./test/packages-valid/*");

  //   const { json } = getJsonByName("dist", ...path)("@folo/forms");

  //   expect(json).to.be.an("Array");
  //   expect(json.length).to.be.equal(1);

  //   expect(json[0].name).to.be.equal("@folo/forms");
  // });

  it("returns empty array when name is wrong", () => {
    const { json } = getJsonByName("nothingTrue");

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(0);
  });
});
