require("dotenv").config({
  path: require("find-config")(".env", { cwd: __dirname }),
});

const { resetInputsToDefaults } = require("digestible-wcag-email-selection");
const { getAwsSecrets } = require("../../../../lib/config.js");

(async function () {
  const {
    bucketName,
    currentSelectionFilename,
    recentSelectionsFilename,
  } = getAwsSecrets();

  await resetInputsToDefaults({
    s3: {
      bucket: {
        name: bucketName,
        filenames: {
          currentSelection: currentSelectionFilename,
          recentSelections: recentSelectionsFilename,
        },
      },
    },
  });
})();
