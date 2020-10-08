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

- Following the guidance [here](https://aws.amazon.com/blogs/architecture/field-notes-integrating-http-apis-with-aws-cloud-map-and-amazon-ecs-services/) allows for the web server to be deployed in AWS API Gateway, with the following changes
  - A custom VPC + subnets don't seem to be needed (using the ECS default public ones available when creating the service seem to work)
  - Making sure all the port settings line up is subtle
    - In the task definition, if the networking mode is "awsvpc" you can only specify one port, which serves as both the container's port and the host's port (e.g. 4000:4000), i.e. the host can't listen on 80
    - To accomodate this, when setting up the "DNS records for service discovery" while creating the service in ECS, the port for the SRV type should be set to match the container's port
    - There are are also ports that can be set in the Security Group used by the service, but leaving them as is (with the default HTTP one being set to 80) doesn't seem to harm any of the traffic from the API
    - Running the troubleshooting commands mentioned [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-service-discovery.html#create-service-discovery-verify) was helpful in identifying the port issues
  - "Auto-Assign Public IP" needs to be set to Yes, otherwise the task instance has trouble pulling the container image from ECR (as also mentioned [in this troubleshooting page](https://aws.amazon.com/premiumsupport/knowledge-center/ecs-pull-container-api-error-ecr/))
