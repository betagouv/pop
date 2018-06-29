const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();
const multer = require('multer')
const fs = require('fs');
const upload = multer({ dest: 'uploads/' })
const Joconde = require('../models/joconde');

var s3 = new AWS.S3();


router.post('/update', (req, res) => {
    var ref = req.query.ref;
    Joconde.findOneAndUpdate({ REF: ref }, req.body, { upsert: true }).then((e) => {
        res.sendStatus(200)
    });
})

router.post('/create', upload.any(), (req, res) => {

    const files = req.files || [];
    const notice = JSON.parse(req.body.notice);

    const arr = [];
    for (var i = 0; i < req.files.length; i++) {
        arr.push(uploadFile(`joconde/${notice.REF}/${req.files[i].originalname}`, req.files[i]))
    }

  
    // console.log('NOTICE', notice);
    arr.push(Joconde.create(notice))

    Promise.all(arr)
        .then(() => {
            res.sendStatus(200)
        })
        .catch((e) => {
            res.sendStatus(500)
        })
})




function uploadFile(path, file) {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync(file.path);
        const params = {
            Bucket: "pop-phototeque",
            Key: path,
            Body: data,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };

        s3.putObject(params, (err) => {
            fs.unlinkSync(file.path);
            if (err) {
                console.log(err);
                reject();
            } else {
                resolve()
            }
        });
    })
}



router.get('/', (req, res) => {
    var ref = req.query.ref;
    Joconde.findOne({ REF: ref }, (err, notice) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(notice);
        }
    });
})

module.exports = router



