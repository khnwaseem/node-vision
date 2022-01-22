var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
require('dotenv').config()


router.post('/classify', function(req, res, next) {
  // DON'T return the hardcoded response after implementing the backend

  // Your code starts here //

AWS.config.update({region:process.env.AWS_REGION,
accessKeyId: process.env.AWS_ACCESS_KEY_ID,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const client = new AWS.Rekognition();
var imageData = Buffer.from(req.files.file.data, 'base64');

  const params = {
    Image: {
          Bytes: imageData
        },
      "MaxLabels": 10
  }

  client.detectLabels(params, function(err, res) {
    if (err) {
      console.log(err, err.stack); // if an error occurred
    } else {
      let response = [];

      res.Labels.forEach(label => {
        response.push(label.Name)
        console.log(`Label:      ${label.Name}`)

      }) // for response.labels
      DetectLabel(response)

    } // if
  });


  // Your code ends here //
  
const DetectLabel = (response) => {
  res.json({
    "labels": response,
  });
}

});

module.exports = router;
