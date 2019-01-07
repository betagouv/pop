require('es6-promise').polyfill();
require('isomorphic-fetch');


const { api_url } = require('../config.js');

class api {
  getNotice(collection, ref) {
    return new Promise((resolve, reject) => {
      this._get(`${api_url}/${collection}/${ref}`)
        .then(notice => {
          if (notice) notice.collection = collection;
          resolve(notice);
        })
        .catch(e => reject(e));
    });
  }

  getMuseo(ref) {
    return this._get(`${api_url}/museo/${ref}`);
  }

  _get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (response.status === 404) {
            resolve(null);
            return;
          }

          if (response.status === 200) {
            response
              .json()
              .then(data => {
                // Examine the text in the response
                resolve(data);
              })
              .catch(e => {
                Raven.captureException(e);
                reject('Probleme lors de la récupération de la donnée', e);
              });
            return;
          }

          const message =
            `Un probleme a été detecté lors de la récupération de données via l'API. ` +
            `Les équipes techniques ont été notifiées. ` +
            `Status Code: ${response.status}`;
          Raven.captureException(message);
          reject(message);
          return;
        })
        .catch(err => {
          Raven.captureException(err);
          reject("L'api est inaccessible", err);
        });
    });
  }
}

const apiObject = new api();
export default apiObject;
