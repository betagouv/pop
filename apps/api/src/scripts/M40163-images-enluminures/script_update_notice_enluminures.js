require("dotenv").config();
require("../../mongo");
const fs = require('fs');
const Enluminures = require("../../models/enluminures");
const csv = require('csv');
const { pathFileCsv, nameFileLog } = require('./utils');
const { exit } = require("process");
const { Observable } = require("rxjs/internal/Observable");
const { async } = require('rxjs/internal/scheduler/async');

let counter = 0;
const limit = 2000;
    
// Récupère les notices Enluminures a mettre à jour    
async function readCsv(){
    let noticesEnluminures = [];
    let chunk;
    let i = 0;

    // vidage des logs précédent
    fs.access(nameFileLog, (err) => {
        if(!err){
            fs.truncate(nameFileLog, 0);
        }
    });

    let stream = fs.createReadStream(pathFileCsv).pipe(csv.parse({delimiter: ';'}));

    stream.on('readable', function() {
        while ((chunk=stream.read()) != null) {
            if(i > 0){
                let REF = chunk[1].split('/')[1];
                noticesEnluminures.push({ REF: REF, IMG: chunk[1] })
            }
            i++;
        }
    });

    stream.on('end', function() {
 
        console.log('lecture terminée', 'nombre element : ' + noticesEnluminures.length);

        let arrayUpdate = [];
        let i = 0;
        noticesEnluminures.forEach( async (n) => {
            // Préparation du tableau pour le bulk
            // Récupération de la notice
            const notice = await Enluminures.findOne({ REF: n.REF }, 'VIDEO')

            console.log("Notice :", notice, n.REF)

            if(!notice.VIDEO.includes(n.IMG)){
                notice.VIDEO.push(n.IMG);

                console.log("image", n.IMG)

                arrayUpdate.push({
                    updateOne: {
                        filter: { REF: n.REF },
                        // La mise à jour ajoute un élément dans le tableau VIDEO, pour réexécuter le script, il faut vider de champ avant VIDEO: []
                        update: { VIDEO: notice.VIDEO }
                        /*update: {
                            $push: { 
                                VIDEO: row[1]
                            }
                        }*/
                    }
                })
            }

            // Traitement par lot suivant le limite définit
            if(i % limit === 0 || i == noticesEnluminures.length){
                updateNotices(arrayUpdate).then((res) => {
                    return new Observable((observer) => {
                        observer.next(res + ' notices traitées');

                        if(noticesEnluminures.length === res || res === 0){
                            console.log('mise à jour terminé');
                          //  exit(1);
                        }
                    }).subscribe((message) => console.log(message));
                  
                });
                arrayUpdate = [];
            }
        });
    });

    
    return false;
}

function updateNotices(noticesEnluminures){

    return new Promise((resolve) => {
        let errorFind = false;

        console.log('Notices update')
        console.log(noticesEnluminures)

        do{
            if(noticesEnluminures.length > 0){
                Enluminures.bulkWrite(noticesEnluminures)
                .then(res => {
                    counter += res.modifiedCount
                    errorFind = false;
                    resolve(counter);
                })
                .catch((err) => { console.log('erreur', err)
                    // Cas des duplications de clé REF
                    console.log('-----------------------REF :' + err.op.q.REF);
                    fs.writeFileSync(nameFileLog, 'REF : ' + err.op.q.REF +' MESSAGE : ' + err.errmsg + '\n', { flag: 'a+'} );
            
                    // Suppression de la ligne qui est en erreur pour poursuivre le traitement
                    noticesEnluminures = noticesEnluminures.filter((notice) => notice.updateOne.filter.REF != err.op.q.REF);
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