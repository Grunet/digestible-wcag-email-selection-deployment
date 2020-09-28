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

const DataLoader = require("dataloader");
const loader = new DataLoader(async (keys) => {
  const data = await __getData();

  return keys.map((key) => data);
});

async function getDataWithBatchedRequests() {
  return loader.load("arbitrary");
}

module.exports = {
  getCurrentSelectionData: getDataWithBatchedRequests,
};
