require("dotenv").config();
require("../../mongo");
const fs = require('fs');
const Memoire = require("../../models/memoire");
const path = require('path');
const csv = require('csv');
const { async } = require('rxjs/internal/scheduler/async');
const { pathFileCsv, nameFileLog } = require('./utils');
const { exit } = require("process");
const { Observable } = require("rxjs/internal/Observable");

let counter = 0;
const limit = 2000;
    
// Récupère les notices Mémoire a mettre à jour    
async function readCsv(){

    let noticesMemoire = [];
    let i = 0;

    // vidage des logs précédent
    fs.truncate(nameFileLog, 0);

    fs.createReadStream(pathFileCsv)
    .pipe(csv.parse({delimiter: ';'}))
    .on('data', (row) => {
        if(i > 0 && row[0] !== ""){
            noticesMemoire.push({
                updateOne: {
                    filter: { REF: row[3] },
                    update: { REF: row[0], IMG: row[4] }
                }
            })
        }
        i++;
    })
    .on('end', () => {
        console.log('lecture terminée', 'nombre element : ' + noticesMemoire.length);

        let arrayUpdate = [];
        let i = 0;
        noticesMemoire.forEach((notice) => {
            // Préparation du tableau pour le bulk
            arrayUpdate.push(notice);

            // Traitement par lot suivant le limite définit
            if(i % limit === 0 || i == noticesMemoire.length){
                updateNoticesMemoire(arrayUpdate).then((res) => {
                    return new Observable((observer) => {
                        observer.next(res + ' notices traitées');

                        if(noticesMemoire.length === res || res === 0){
                            console.log('mise à jour terminé');
                            exit(1);
                        }
                    }).subscribe((message) => console.log(message));
                  
                });
                arrayUpdate = [];
            }
        });
    });
    return false;
}

function updateNoticesMemoire(noticesMemoire){

    return new Promise((resolve) => {
        let errorFind = false;

        do{
            if(noticesMemoire.length > 0){
                Memoire.bulkWrite(noticesMemoire)
                .then(res => {
                    counter += res.modifiedCount
                    errorFind = false;
                    resolve(counter);
                })
                .catch((err) => {
                    // Cas des duplications de clé REF
                    console.log('-----------------------REF :' + err.op.q.REF);
                    fs.writeFileSync(nameFileLog, 'ANCIENNE REF : ' + err.op.q.REF +' NOUVELLE REF : ' + err.errmsg + '\n', { flag: 'a+'} );
            
                    // Suppression de la ligne qui est en erreur pour poursuivre le traitement
                    noticesMemoire = noticesMemoire.filter((notice) => notice.updateOne.filter.REF != err.op.q.REF);
                    errorFind = true;
                });
            } else {
                errorFind = false;
                console.log('terminé')
                
            }
        } while(errorFind);
    })
 
    
}

readCsv();