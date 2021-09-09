require("dotenv").config();
require("../../mongo");
const fs = require('fs');
const Memoire = require("../../models/memoire");
const path = require('path');
const csv = require('csv');
const { async } = require('rxjs/internal/scheduler/async');
const { pathFileCsv, nameFileLog, validationLog } = require('./utils');
const { exit } = require("process");
const { Observable } = require("rxjs/internal/Observable");

let counter = 0;
const limit = 2000;
    
// Récupère les notices Mémoire a mettre à jour    
async function readCsv(){

    let noticesMemoire = [];
    let i = 0;

    // vidage des logs précédent
    fs.truncate(validationLog, 0);

    fs.createReadStream(pathFileCsv)
    .pipe(csv.parse({delimiter: ';'}))
    .on('data', (row) => {
        if(i > 0 && row[0] !== ""){
            noticesMemoire.push({
                OLD_REF: row[0],
                NEW_REF: row [3]
            })
        }
        i++;
    })
    .on('end', () => {
        console.log('lecture terminée', 'nombre element : ' + noticesMemoire.length);

        noticesMemoire.forEach((notice) => {
            updateNoticesMemoire(notice).then((res) => {
                return new Observable((observer) => {
                    observer.next(res + ' notices traitées');

                    if(noticesMemoire.length === res || res === 0){
                        console.log('mise à jour terminé');
                        exit(1);
                    }
                }).subscribe((message) => console.log(message));
            });
        });
    });
    return false;
}

function updateNoticesMemoire(notice){

    return new Promise((resolve) => {

        if(notice){
            Memoire.find({ REF: notice.NEW_REF })
            .then(res => {
                if(res.length > 0){
                    counter++;
                } else {
                    fs.writeFileSync(validationLog, 'ANCIENNE REF : ' + notice.OLD_REF +' NOUVELLE REF : ' + notice.NEW_REF + '\n', { flag: 'a+'} );
                }
                resolve(counter);
            })
        } 
    })
 
    
}

readCsv();