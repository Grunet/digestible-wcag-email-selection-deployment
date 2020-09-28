const { get: getSecretOrEnvVar } = require("docker-secrets-nodejs");

function getAwsSecrets() {
  return {
    //The env variable fallbacks are the uppercase versions of the secret names
    bucketName: getSecretOrEnvVar("dwcag_apikeys_s3_bucket_selection"),
    currentSelectionFilename: getSecretOrEnvVar(
      "dwcag_apikeys_s3_bucket_selection_key_current"
    ),
    recentSelectionsFilename: getSecretOrEnvVar(
      "dwcag_apikeys_s3_bucket_selection_key_recent"
    ),
  };
}

module.exports = {
  getAwsSecrets: getAwsSecrets,
};
