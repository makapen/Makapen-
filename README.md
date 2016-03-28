# Makapen Website

This README outlines the details of collaborating on this yeoman project.

## Deploying to AWS

###Setting up your environment
1. **First**, you'll need your own secret + key from AWS. These can be obtained from going to:

	* Username Dropdown >
	* Security Credentials >
	* Users >
	* Create New User (if not already created) >
	* Select Username >
	* Select Create Access Key


2. **Second**, once your access key and secret have been activated, you will need to create a `.makapen` folder in your `~` root drive:

	<pre>
	mkdir .makapen
	cd .makapen
	</pre>

3. **Third**, create a .config file while inside your `.makapen` folder:

	<pre>touch .config</pre>

4. **Lastly**, open the file, and place the following code in the `.config.json` file (replace with your AWS credentials):
	<pre>
	{
		"accessKeyId": "YOUR KEY HERE",
		"secretAccessKey": "YOUR SECRET HERE",
		"aws_bucket": "bucket url",
		"raws_region": "region"
	}
	</pre>

5. Now your project is ready to run. To run on `http://localhost:8000/` with livereload, type this into your command line:
	<pre>grunt server</pre>



### Push to Staging

This will host our website in packaged form.

<pre>grunt publish-staging</pre>

* Visit this app at <a href="http://makapen.s3-website-us-west-2.amazonaws.com/">http://makapen.s3-website-us-west-2.amazonaws.com/</a>

### Push to Production

This will host the live website.
<pre>grunt publish-production</pre>

* Visit this app at <a href="http://makapen.co/">http://makapen.co/</a>
