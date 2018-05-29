var X2JS = require('X2JS');
var x2js = new X2JS();

class Thesaurus {
    getTermsBeginWithSomeStringByThesaurus(req, thesaurusId, preferredTermOnly = false, startIndex = 1, limit = 10) {
        const body = `
        <soap:getTermsBeginWithSomeStringByThesaurus>
            <request>${req}</request>
            <thesaurusId>${thesaurusId}</thesaurusId>
            <preferredTermOnly>${preferredTermOnly}</preferredTermOnly>
            <startIndex>${startIndex}</startIndex>
            <limit>${limit}</limit>
        </soap:getTermsBeginWithSomeStringByThesaurus>`
        return this._post(body, 'thesaurusTerm')
    }

    getPreferredTermByConceptId(thesaurusId) {
        const body = `<soap:getPreferredTermByConceptId>
                <conceptId>${thesaurusId}</conceptId>
            </soap:getPreferredTermByConceptId>`
        return this._post(body, 'thesaurusConcept')
    }

    getTopConceptsByThesaurusId(thesaurusId) {
        const body = `<soap:getTopConceptsByThesaurusId>
                <thesaurusId>${thesaurusId}</thesaurusId>
            </soap:getTopConceptsByThesaurusId>`
        return this._post(body, 'thesaurusConcept')
    }

    _post(req, service) {
        return new Promise((resolve, reject) => {
            let str = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://soap.ginco.mcc.fr/">
            <soapenv:Header/>
            <soapenv:Body>${req}</soapenv:Body>
            </soapenv:Envelope>`
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', `http://localhost:3000/thesaurus/${service}`, true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        const bodyjson = x2js.xml2js(xmlhttp.response);
                        const key = Object.keys(bodyjson.Envelope.Body)[0];
                        const resp = bodyjson.Envelope.Body[key].return;
                        resolve(resp);
                        return;
                    }
                }
                // reject('Error on request')
            }
            xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
            xmlhttp.send(str);
        })
    }

    // _post(req, service) {




    //     return new Promise((resolve, reject) => {
    //         fetch(`http://localhost:3000/thesaurus/${service}`, {
    //             body: envelopedBody, // must match 'Content-Type' header
    //             headers: {
    //                 'user-agent': 'POP',
    //                 "Content-Type": "text/xml; charset=utf-8"
    //             },
    //             method: 'POST', 
    //         }).then((response) => {
    //             if (response.statusCode == 200) {
    //                 try {

    //                 } catch (e) {
    //                     reject('Response malformed')
    //                 }
    //             } else {
    //                 console.log('Error : ', response)
    //                 reject('Err')
    //             }
    //         }).catch((err) => {
    //             reject('Fetch Error :-S', err)
    //         });
    //     })
    // }
}

const t = new Thesaurus();
module.exports = t;


