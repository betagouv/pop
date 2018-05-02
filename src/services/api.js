const ROUTE = 'http://localhost:3000'


class api {
    get() {
        return this._get(`${ROUTE}/api`)
    }

    search(collection, value) {
        return this._get(`${ROUTE}/api/search?collection=${collection}&query=${value}`)
    }

    getNotice(ref) {
        return this._get(`${ROUTE}/api/notice?ref=${ref}`)
    }

    _get(url) {
        console.log('GET ',url)
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                if (response.status !== 200) {
                    reject('Looks like there was a problem. Status Code: ' + response.status)
                }
                response.json().then((data) => {    // Examine the text in the response
                    resolve(data);
                });
            }
            )
                .catch((err) => {
                    reject('Fetch Error :-S', err)
                });
        })
    }
}

const apiObject = new api();
export default apiObject;