const express = require('express');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const request = require('request');
const X2JS = require('x2js');

const Thesaurus = require('./../models/thesaurus');

const x2js = new X2JS();
const router = express.Router()


router.get('/search', (req, res) => {
    var id = req.query.id;
    var value = req.query.value;
    var q = Thesaurus.find({ 'arc': id, 'value': { $regex: new RegExp('^' + value) } }).limit(10);
    q.exec((err, values) => {
        res.send(values);
    });
})

router.get('/validate', (req, res) => {
    var id = req.query.id;
    var value = req.query.value;
    var q = Thesaurus.find({ 'arc': id, 'value': value }).limit(1);
    q.exec((err, values) => {
        const exist = values.length ? true : false;
        res.send({ exist });
    });
})

// router.get('/update', (req, res) => {
//     var thesaurusId = req.query.id;
//     return new Promise(async (resolve, reject) => {
//         try {
//             const allTerms = []
//             // je récupère les top concepts des thesaurus
//             console.log('START GET TOP CONCEPT FOR THESAURUS ', thesaurusId)
//             const topconcepts = await (getTopConceptsByThesaurusId(thesaurusId));
//             const arr = [];

//             console.log('END TOP CONCEPT ', topconcepts.length)
//             // je vais chercher tous les enfants recursivement
//             console.log('START GET ALL CONCEPTS FOR THESAURUS ', thesaurusId)
//             for (var i = 0; i < topconcepts.length; i++) {
//                 await (getAllChildrenConcept(topconcepts[i], arr))
//             }

//             console.log('GOT CHILDREN CONCEPT ', arr.length)
//             console.log('START GET ALL PREFERED TERMS FOR THESAURUS ', thesaurusId)
//             //je prend tous les term préféré de tous les concepts
//             for (var i = 0; i < arr.length; i++) {
//                 const r = await (getPreferredTermByConceptId(arr[i]))
//                 for (var j = 0; j < r.length; j++) {
//                     if (r[j].languageId === 'fr-FR') {
//                         allTerms.push(r[j].lexicalValue)
//                     }
//                 }
//             }
//             console.log('GOT TERMS ', allTerms.length)
//             // je supprime les terms qui existent 
//             Thesaurus.remove({ arc: thesaurusId }, function () {

//                 // je créé tous les terms qui existent 
//                 const arr = allTerms.map(e => new Thesaurus({ arc: thesaurusId, value: e }));
//                 Thesaurus.insertMany(arr, function (err, docs) {
//                     console.log(err)
//                     console.log('SAVED ', docs.length)
//                     resolve();
//                 });
//                 console.log(allTerms)
//             });
//             res.status(200).send('OK');
//             console.log('DONE UPDATE ', thesaurusId)
//         }
//         catch (e) {
//             res.status(500).send('error');
//             console.log('FAIL UPDATE ', thesaurusId)
//         }
//     })
// })


module.exports = router

// function getAllChildrenConcept(conceptId, arr) {
//     return new Promise(async (resolve, reject) => {
//         arr.push(conceptId)
//         const childs = await (getChildrenByConceptId(conceptId));
//         const ArrP = [];
//         if (childs) {
//             for (var i = 0; i < childs.length; i++) {
//                 ArrP.push(getAllChildrenConcept(childs[i], arr));
//             }
//         }
//         await (Promise.all(ArrP))
//         resolve();
//     })
// }


function getChildrenByConceptId(conceptId) {
    const body = `<soap:getChildrenByConceptId> 
          <conceptId>${conceptId}</conceptId> 
         </soap:getChildrenByConceptId>`
    return post(body, 'thesaurusConcept')
}

function getPreferredTermByConceptId(conceptId) {
    const body = `<soap:getPreferredTermByConceptId> 
            <conceptId>${conceptId}</conceptId> 
        </soap:getPreferredTermByConceptId>`
    return post(body, 'thesaurusConcept')
}

function getTopConceptsByThesaurusId(thesaurusId) {
    const body = `<soap:getTopConceptsByThesaurusId> 
            <thesaurusId>${thesaurusId}</thesaurusId> 
        </soap:getTopConceptsByThesaurusId>`
    return post(body, 'thesaurusConcept')
}

function post(req, service) {

    let envelopedBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://soap.ginco.mcc.fr/"> 
    <soapenv:Header/> 
    <soapenv:Body>${req}</soapenv:Body> 
    </soapenv:Envelope>`

    return new Promise((resolve, reject) => {
        request.post(
            {
                url: `https://ginco.culture.fr/ginco-webservices/services/${service}`,
                body: envelopedBody,
                headers: { 'Content-Type': 'text/xml;charset=UTF-8' }
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    try {
                        const bodyjson = x2js.xml2js(body);
                        const key = Object.keys(bodyjson.Envelope.Body)[0];
                        const resp = bodyjson.Envelope.Body[key].return;
                        if (resp && !Array.isArray(resp)) {
                            resolve([resp]);
                        } else {
                            resolve(resp);
                        }
                    } catch (e) {
                        reject('Response malformed')
                    }
                } else {
                    // console.log('Err', response, error)
                    reject(error)
                }
            }
        );
    })
}
