const conf = require("dotenv").config();
require("../mongo");
const fs = require('fs');
const Mnr = require("../models/mnr");
const { async } = require('rxjs/internal/scheduler/async');
const Gallery = require("../models/gallery");
const { Observable } = require("rxjs/internal/Observable");

/**
 * la variable correspond à l'url de consultation du permalien
 */
// Local
// const app_url = 'http://localhost:8081';
// Staging
// const app_url = 'http://pop-consultation-staging.eu-west-3.elasticbeanstalk.com';
// Production
const app_url = 'https://www.pop.culture.gouv.fr/';

// Récupération de la liste des notices MNR
async function getAllMnr(){
    return await Mnr.find({},{});
}

function generatePermaliens(){
    return new Observable( async (observer) => {
        fs.writeFileSync('./src/scripts/permaliens.csv', 'INV;PERMALIEN;\n', { flag: 'a+'} );
        const notices = await getAllMnr();
    
        let i = 0;
     
        // Construction des paramètres
        notices.forEach( async (notice, index) => {
            let params = {
                params: {
                    base: "mnr",
                    mode: "advanced",
                    qb: `[{\"field\":[\"INV.keyword\"],\"operator\":\"*\",\"value\":\"${notice.INV}\",\"combinator\":\"AND\",\"index\":0}]`,
                    view: "list"
                }
            };
            let gallery = new Gallery(params);
            await gallery.save().then((doc) => {
                i++;
               
                fs.writeFileSync('./src/scripts/permaliens.csv', notice.INV + ';' + app_url + '/gallery/' + doc._id + ';\n', { flag: 'a+'} );
                observer.next(i);
    
                if(i === notices.length - 1){
                    observer.complete();
                    process.exit();
                }
            });
        })
        
        return { unsubscribe(){} }
    });
}

generatePermaliens().subscribe((nbre) => {
    console.log(nbre + ' liens créés')
});


