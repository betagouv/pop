const { api_url } = require('../config.js');

class api {

    search(collection, params) {
        const arr = [];
        for (var key in params) {
            arr.push(`${key}=${params[key]}`)
        }
        return this._get(`${api_url}/api/search?collection=${collection}&${arr.join('&')}`)
    }

    update(id, collection, data) {
        return this._post(`${api_url}/api/update?collection=${collection}&id=${id}`, data)
    }


    getNotice(ref) {
        return this._get(`${api_url}/api/notice?ref=${ref}`)
    }


    getNoticesByRef(refs) {
        const arr = [];
        return new Promise(async (resolve, reject) => {
            for (var i = 0; i < refs.length; i++) {
                const notice = await (this.getNotice(refs[i]));
                arr.push(notice);
            }
            resolve(arr);
        })
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