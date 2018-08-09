const { api_url } = require('../config.js');

class api {

    createUser(email, group, role, institution) {
        const obj = { email, group, role, institution };
        return this._post(`${api_url}/auth/signup`, JSON.stringify(obj), 'application/json')
    }

    signin(email, password) {
        const obj = { email, password };
        return this._post(`${api_url}/auth/signin`, JSON.stringify(obj), 'application/json')
    }

    getUsers() {
        return this._get(`${api_url}/auth/`)
    }

    sendReport(subject, to, body) {
        const obj = { subject, to, body };
        return this._post(`${api_url}/mail`, JSON.stringify(obj), 'application/json')
    }

    updateNotice(ref, collection, data, images = []) {
        var formData = new FormData();
        formData.append('notice', JSON.stringify(data));
        for (var i = 0; i < images.length; i++) {
            formData.append('file', images[i]);
        }
        return this._put(`${api_url}/${collection}/${ref}`, formData)
    }

    createNotice(collection, data, images = []) {
        for (var propName in data) {        //clean object
            if (!data[propName]) {
                delete data[propName];
            }
        }
        var formData = new FormData();
        formData.append('notice', JSON.stringify(data));

        for (var i = 0; i < images.length; i++) {
            formData.append('file', images[i]);
        }
        console.log('POST COLLECTION ', collection)
        return this._post(`${api_url}/${collection}`, formData)
    }

    getNotice(collection, ref) {
        return this._get(`${api_url}/${collection}/${ref}`)
    }

    deleteNotice(collection, ref) {
        return this._delete(`${api_url}/${collection}/${ref}`)
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

    _put(url, data, contentType) {
        return new Promise((resolve, reject) => {
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
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // *client, no-referrer
            }).then((response) => {
                if (response.status !== 200) {
                    Raven.captureException(`Un probleme a été detecté lors de l'enregistrement via l'API. Les équipes techniques ont été notifiées. Status Code: ${response.status}`)
                    reject(`Un probleme a été detecté lors de l'enregistrement via l'API. Les équipes techniques ont été notifiées. Status Code: ${response.status}`);
                    return;
                };
                resolve()
            }).catch((err) => {
                Raven.captureException(err)
                reject('L\'api est inaccessible', err)
            });
        })
    }


    _post(url, data, contentType) {
        return new Promise((resolve, reject) => {
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
                    Raven.captureException(`Un probleme a été detecté lors de l'enregistrement via l'API. Les équipes techniques ont été notifiées. Status Code: ${response.status}`)
                    reject(`Un probleme a été detecté lors de l'enregistrement via l'API. Les équipes techniques ont été notifiées. Status Code: ${response.status}`);
                    return;
                };

                response.json().then((data) => {    // Examine the text in the response
                    resolve(data);
                }).catch((e) => {
                    Raven.captureException(e)
                    reject('Probleme lors de la récupération de la donnée', e);
                })
                
            }).catch((err) => {
                Raven.captureException(err)
                reject('L\'api est inaccessible', err)
            });
        })
    }
    _delete(url) {
        return new Promise((resolve, reject) => {
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
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // *client, no-referrer
            }).then((response) => {
                if (response.status !== 200) {
                    Raven.captureException(`Un probleme a été detecté lors de l'enregistrement via l'API. Les équipes techniques ont été notifiées. Status Code: ${response.status}`)
                    reject(`Un probleme a été detecté lors de l'enregistrement via l'API. Les équipes techniques ont été notifiées. Status Code: ${response.status}`);
                    return;
                };
                resolve()
            }).catch((err) => {
                Raven.captureException(err)
                reject('L\'api est inaccessible', err)
            });
        })
    }

    _get(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                if (response.status === 404) {
                    resolve(null);
                    return;
                }

                if (response.status !== 200) {
                    Raven.captureException(`Un probleme a été detecté lors de l'enregistrement via l'API. Les équipes techniques ont été notifiées. Status Code: ${response.status}`)
                    reject(`Un probleme a été detecté lors de l'enregistrement via l'API. Les équipes techniques ont été notifiées. Status Code: ${response.status}`);
                    return;
                };

                response.json().then((data) => {    // Examine the text in the response
                    resolve(data);
                }).catch((e) => {
                    Raven.captureException(e)
                    reject('Probleme lors de la récupération de la donnée', e);
                })
                return;

            }).catch((err) => {
                Raven.captureException(err)
                reject('L\'api est inaccessible', err)
            });
        })
    }
}

const apiObject = new api();
export default apiObject;