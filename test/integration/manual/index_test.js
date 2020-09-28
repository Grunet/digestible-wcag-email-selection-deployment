require("dotenv").config({
  path: require("find-config")(".env", { cwd: __dirname }),
});

require("../../../packages/internals/index.js");
