# Makapen Website

This README outlines the details of collaborating on this yeoman project.

## Deploying to AWS

**First**, you'll need to obtain your own secret + key from AWS. These can be obtained from going to:

* Username Dropdown > Security Credentials > Users > Create New User (if not already created) > Select Username > Select Create Access Key

**Second**, once your access key and secret have been activated, you will need to create a `.makapen` folder:

`mkdir .makapen` <br />
`cd .makapen`

Create a .config file:

`touch .config`

**Lastly**, open the file, and place the following code in the `.config` file (replace with your AWS credentials):
<pre>
  { <br />
    "accessKeyId": "YOUR KEY HERE", <br />
    "secretAccessKey": "YOUR SECRET HERE", <br />
    "aws_bucket": "bucket url", <br />
    "raws_region": "region" <br />
  }
</pre>


### Development


### Staging


### Production
