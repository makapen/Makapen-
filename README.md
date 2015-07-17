# Makapen Website

This README outlines the details of collaborating on this yeoman project.

## Deploying to AWS

First, you'll need to obtain your own secret + key from AWS. These can be obtained from going to:

* Username Dropdown > Security Credentials > Users > Create New User (if not already created) > Select * your username > Select Create Access Key

Second, once your access key and secret have been activated, you will need to create a `.makapen` folder:

* `mkdir .makapen`
* `cd .makapen`

Create a .config file:

* `touch .config`

Open the file, and place the following code in the `.config` file (replace with your AWS credentials):

`{`
  `"accessKeyId": "YOUR KEY HERE",`
  `"secretAccessKey": "YOUR SECRET HERE",`
  `"aws_bucket": "bucket url",`
  `"raws_region": "region"`
`}`


### Development

This will host our app in unminified/packaged mode. It will be easy to debug, but not optimized for speed

* `env deployTarget=development ember divshot push development`
* Visit this app at development.greenkrate.divshot.io

### Staging

This will host our app in packaged form. It will point to the exact same data as production

* `env deployTarget=staging ember divshot push staging --config=./config/divshot/production.json`
* Visit this app at staging.greenkrate.divshot.io

### Production

Production should be the same as staging, so we only need to promote the deployed package

* `divshot promote staging production`
* Visit this app at app.greenkrate.com
