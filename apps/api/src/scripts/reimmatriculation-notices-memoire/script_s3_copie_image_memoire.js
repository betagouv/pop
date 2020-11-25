require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require('fs');
const path = require('path');
const csv = require('csv');
const filenamify = require("filenamify");
const { async } = require("rxjs/internal/scheduler/async");

const s3 = new AWS.S3();
const { pathFileCsv, nameFileS3Log } = require('./utils');

// const pathFileCsv = path.resolve(__dirname,'reimmatriculation_notices_memoire.csv');

let i = 0;
const noticesMemoire = [];
let countUpdate = 0;

async function readCsv(){
    await fs.createReadStream(pathFileCsv)
    .pipe(csv.parse({delimiter: ';'}))
    .on('data', async (row) => {
        if(i > 0 && row[0] !== ""){
             await copyImageMemoire({"OLDREF": row[0], "NEWREF": row[3], "OLDIMG": row[1], "NAMEIMG": row[2], "NEWIMG": row[4]})
            .then((res) => {
                fs.writeFileSync(nameFileS3Log, `REF : ${res[0].NEWREF} - Retour : ${res[1]} \n`,{ flag: 'a+'})
            })
            .catch((err) => {});
        }
        i++;
    })
}

async function copyImageMemoire(notice){
    return new Promise((resolve, reject) => {
        try{
            const path = `memoire/${filenamify(notice.OLDREF)}/${filenamify(notice.NAMEIMG)}`;
            let params = {
                Bucket: process.env.BUCKET,
                Key: `${notice.OLDIMG}`
            };

            s3.getObject(params, (err, data) => {
                if(err){
                    reject(err.message);
                } else {

                    if(data.ContentLength > 0) {
                        console.log('nombre de notices :' + i)

                        s3.putObject(
                            {
                                Bucket: process.env.BUCKET,
                                Key: `${notice.NEWIMG}`,
                                Body: data.Body,
                                ContentType: data.ContentType,
                                ACL: 'public-read',
                                Metadata: data.Metadata
                            }
                            , (err, data) => {
            
                            if (err) {
                                reject(err.message);
                            } else {
                                countUpdate++;
                                if(countUpdate % 500 == 0 || countUpdate == i -1){
                                    console.log('Total images créées : ' + countUpdate)
                                }
                                resolve([notice, data]);
                            }
                        });
                    }
                }
                
            });
        } catch(exception){
            reject(exception);
        }
    });
}


readCsv();