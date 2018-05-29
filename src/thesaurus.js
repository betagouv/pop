
var request = require('request');
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
                            resolve(resp);
                        } catch (e) {
                            reject('Response malformed')
                        }
                    } else {
                        console.log('Err', response, error)
                        reject(error)
                    }
                }
            );
        })
    }
}

const t = new Thesaurus();
module.exports = t;


