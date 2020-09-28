const { changeSelectedEmail } = require("digestible-wcag-email-selection");

const { getAwsSecrets } = require("../../lib/config.js");

async function changeSelection() {
  const {
    bucketName,
    currentSelectionFilename,
    recentSelectionsFilename,
  } = getAwsSecrets();

  await changeSelectedEmail({
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
}

module.exports = {
  changeSelectedEmail: changeSelection,
};
