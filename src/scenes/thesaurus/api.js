
var { api_url } = require('../../config')

var X2JS = require('X2JS');
var x2js = new X2JS();

class Thesaurus {
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
            xmlhttp.open('POST', `${api_url}/proxythesaurus/${service}`, true);
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
}

const t = new Thesaurus();
module.exports = t; 