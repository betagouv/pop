const { api_url } = require('../config.js');

class api {

    update(id, collection, data) {
        return this._post(`${api_url}/notice?collection=${collection}&id=${id}`, data)
    }

    getNotice(ref) {
        return this._get(`${api_url}/notice?ref=${ref}`)
    }

    getThesaurus(thesaurusId, str) {
        return this._get(`${api_url}/thesaurus?id=${thesaurusId}&search=${str}`)
    }

    _post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, same-origin, *omit
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json'
                },
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // *client, no-referrer
            }).then((response) => {
                if (response.status !== 200) {
                    reject('Looks like there was a problem. Status Code: ' + response.status)
                }
                resolve()
                // response.json().then((data) => {    // Examine the text in the response
                //     (data);
                // });
            }).catch((err) => {
                reject('Fetch Error :-S', err)
            });
        })
    }

    _get(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                if (response.status !== 200) {
                    reject('Looks like there was a problem. Status Code: ' + response.status)
                }
                response.json().then((data) => {    // Examine the text in the response
                    resolve(data);
                });
            }).catch((err) => {
                reject('Fetch Error :-S', err)
            });
        })
    }
}

const apiObject = new api();
export default apiObject;