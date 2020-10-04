# digestible-wcag-email-selection-deployment

Contains the things needed to deploy the corresponding repository's changes via a cloud provider.

## Local Testing Notes

- "docker-compose up [name-of-service]" will run (or re-run if others are still running) only that service

- Downloading a Linux distro to use with WSL 2 makes it possible to run the bash scripts on Windows ([Docker docs page on how to get all this setup](https://docs.docker.com/docker-for-windows/wsl/))
  - The distro needs to know where to find the AWS credentials on the Windows machine, which setting two AWS-CLI environment variables can do ([per this SO post's answer](https://stackoverflow.com/questions/52238512/how-to-access-aws-config-file-from-wsl-windows-subsystem-for-linux))
    - In addition to those, AWS_SDK_LOAD_CONFIG needs to be set to 1
  - The docker-compose.override.yml file has a Unix-specific file path for mounting the AWS credentials folder (which won't work on Windows)

## Deployment Notes

- Follow the instructions [here](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html) to deploy a local Docker image to AWS Elastic Container Registry

  - Using the 1 line AWS CLI piped-to-Docker option mentioned [here](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html#registry-auth-token) for getting the temporary access token needed for this seemed to be the simplest option
  - The AWS repository name doesn't need to be the same as the github repo name, but there doesn't seem to be a reason NOT to have them be the same
