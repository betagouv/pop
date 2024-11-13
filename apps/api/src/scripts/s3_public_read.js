const s3 = require("../s3");
require("dotenv").config();

// Function to make all files in a bucket publicly readable
async function makePublicReadable(bucketName) {
	try {
		// Get a list of all objects in the bucket
		const data = await s3.listObjectsV2({ Bucket: bucketName }).promise();

		// Loop through each object and make it publicly readable
		data.Contents.forEach((object) => {
			const params = {
				Bucket: bucketName,
				Key: object.Key,
				ACL: "public-read",
			};

			s3.putObjectAcl(params, (err, data) => {
				if (err) {
					console.log(err);
				} else {
					console.log(`Made ${object.Key} publicly readable`);
				}
			});
		});
	} catch (err) {
		console.log(err);
	}
}

// Call the function
makePublicReadable("pop-general");
