class api {
    get() {
        return this._get(`http://localhost:3000/api`)
    }

    search(value){
        return this._get(`http://localhost:3000/api/search?query=${value}`)
    }

    _get(url){
        return new Promise((resolve,reject) => {
            fetch(url).then((response)=> {
                    if (response.status !== 200) {
                        reject('Looks like there was a problem. Status Code: ' + response.status)
                    }
                    response.json().then( (data) =>{    // Examine the text in the response
                        resolve(data);
                    });
                }
            )
            .catch( (err)=> {
                reject('Fetch Error :-S', err)
            });
      })
    }
}

const apiObject = new api();
export default apiObject;