require("dotenv").config({
  path: require("find-config")(".env", { cwd: __dirname }),
});

require("../../../packages/selection_changer/index.js");
