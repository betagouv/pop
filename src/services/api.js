const { api_url } = require('../config.js');

class api {

    sendReport(subject, to, body) {
        const obj = { subject, to, body };
        console.log(JSON.stringify(obj))
        return this._post(`${api_url}/mail`, JSON.stringify(obj), 'application/json')
    }

    updateNotice(ref, collection, data) {
        var formData = new FormData();
        formData.append('notice', JSON.stringify(data));
        return this._post(`${api_url}/${collection}/update?ref=${ref}`, formData)
    }

    createNotice(collection, data, images = []) {
        //clean object
        for (var propName in data) {
            if (!data[propName]) {
                delete data[propName];
            }
        }
        var formData = new FormData();
        formData.append('notice', JSON.stringify(data));

        for (var i = 0; i < images.length; i++) {
            formData.append('file', images[i]);
        }
        return this._post(`${api_url}/${collection}/create`, formData)
    }

    getNotice(collection, ref) {
        return this._get(`${api_url}/${collection}?ref=${ref}`)
    }

    updateThesaurus(thesaurusId, str) {
        return this._get(`${api_url}/thesaurus/update?id=${thesaurusId}`)
    }


    getThesaurus(thesaurusId, str) {
        return this._get(`${api_url}/thesaurus/search?id=${thesaurusId}&value=${str}`)
    }

    validateWithThesaurus(thesaurusId, str) {
        return this._get(`${api_url}/thesaurus/validate?id=${thesaurusId}&value=${str}`)
    }

    _post(url, data, contentType) {
        return new Promise((resolve, reject) => {

            console.log('POST ', data)

            const headers = {}
            headers['user-agent'] = 'POP application';
            if (contentType) {
                headers['Content-Type'] = contentType
            }

            fetch(url, {
                body: data, // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, same-origin, *omit
                headers,
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // *client, no-referrer
            }).then((response) => {
                if (response.status !== 200) {
                    reject(`Un probleme a été detecté lors de l'enregistrement via l'API. Les équipes techniques ont été notifiées. Status Code: ${response.status}`);
                    return;
                };
                resolve()
                // response.json().then((data) => {    // Examine the text in the response
                //     (data);
                // });
            }).catch((err) => {
                reject('L\'api est inaccessible', err)
            });
        })
    }

    _get(url) {
        return new Promise((resolve, reject) => {

            console.log('GET', url)
            fetch(url).then((response) => {
                if (response.status !== 200) {
                    reject(`Un probleme a été detecté lors de la récupération de donnée via l'API. Les équipes techniques ont été notifiées. Status Code: ${response.status}`);
                }
                response.json()
                    .then((data) => {    // Examine the text in the response
                        resolve(data);
                    })
                    .catch((e) => {
                        resolve(null);
                    })
            }).catch((err) => {
                reject('L\'api est inaccessible', err)
            });
        })
    }
}

const apiObject = new api();
export default apiObject;