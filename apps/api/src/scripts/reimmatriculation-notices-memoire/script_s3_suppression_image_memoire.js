require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require('fs');
const path = require('path');
const csv = require('csv');
const filenamify = require("filenamify");
const { async } = require("rxjs/internal/scheduler/async");

const s3 = new AWS.S3();

const pathFileCsv = path.resolve(__dirname,'reimmatriculation_notices_memoire.csv');

let i = 0;
const noticesMemoire = [];
let countDelete = 0;

async function readCsv(){
    await fs.createReadStream(pathFileCsv)
    .pipe(csv.parse({delimiter: ';'}))
    .on('data', async (row) => {
        if(i > 0 && row[0] !== ""){
            deleteImageMemoire({"OLDREF": row[0], "NEWREF": row[3], "OLDIMG": row[1], "NAMEIMG": row[2], "NEWIMG": row[4]})
            .then((res) => {
                noticesMemoire.push({"NEWREF": row[3]});
            })
            .catch((err) => {});
        }
        i++;
    })
}

async function deleteImageMemoire(notice){
    return new Promise((resolve, reject) => {
        try{
            const path = `memoire/${filenamify(notice.OLDREF)}/${filenamify(notice.NAMEIMG)}`;
            let params = {
                Bucket: process.env.BUCKET,
                Key: `${notice.NEWIMG}`
            };

            s3.deleteObject(params, (err, data) => {
                if (err) {
                    console.log(new Error(JSON.stringify(err)));
                    reject(err);
                }

                countDelete++;
                if(countDelete % 500 == 0 || countDelete == i -1){
                    console.log('Total images supprimées : ' + countDelete)
                }
                resolve(data);

            });

        } catch(exception){
            reject(exception);
        }
    });
}


readCsv();