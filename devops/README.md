# You are required to solve at least one of the challenges.

## CI/CD + Ansible

1. Download the attached `project.zip`
1. Upgrade build.gradle to latest version, you can use either `kotlin` or `groovy`
1. Write `Jenkinsfile` (Jenkins pipeline) to execute gradle build on Jenkins server. You are free to choose between scripted or declarative build pipeline.
1. Deploy a Jenkins server using Ansible
1. Setup the pipeline for your project to `Jenkinsfile`
1. Build

## AWS + Terraform + Ansible

1. Create Ubuntu (latest) EC2 instance using `Terraform`
1. Write `Ansible` provider for `Terraform` to install MongoDB (or any other DB)
1. Write `Ansible` role to secure your DB instalation by creating user name and password for admin
1. Write `Ansible` role to create `Test_DB` database
