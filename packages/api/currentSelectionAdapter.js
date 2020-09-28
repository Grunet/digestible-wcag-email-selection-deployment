const {
  getDataFromCurrentSelection,
} = require("digestible-wcag-email-selection");

const { getAwsSecrets } = require("../../lib/config.js");

async function __getData() {
  const { bucketName, currentSelectionFilename } = getAwsSecrets();

  return getDataFromCurrentSelection({
    s3: {
      bucket: {
        name: bucketName,
        filenames: {
          currentSelection: currentSelectionFilename,
        },
      },
    },
  });
}

function createCurrentSelectionAdapter() {
  const DataLoader = require("dataloader");
  const loader = new DataLoader(async (keys) => {
    const data = await __getData();

    return keys.map((key) => data);
  });

  return {
    getDataFromCurrentSelection: async function () {
      return loader.load("arbitrary");
    },
  };
}

module.exports = {
  createCurrentSelectionAdapter: createCurrentSelectionAdapter,
};
