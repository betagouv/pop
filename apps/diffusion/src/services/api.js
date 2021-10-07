import fetch from "isomorphic-unfetch";
const { api_url } = require("../config");
import Sentry from "./sentry";

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

  // Get all producteurs.
  getProducteurs() {
    return new Promise((resolve, reject) => {
      return this._get(`${api_url}/producteur`)
        .then(producteurs => {
          resolve(producteurs);
        })
        .catch(e => reject(e));
    });
  }

  getImportCount(ref) {
    return this._get(`${api_url}/import/count`);
  }

  getGallery(id) {
    return this._get(`${api_url}/gallery/${id}`);
  }

  createGallery(params) {
    let formData = new FormData();
    formData.append("gallery", JSON.stringify({ params }));

    return fetch(`${api_url}/gallery`, {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      mode: "cors",
      redirect: "follow",
      referrer: "no-referrer",
      body: formData
    });
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
                Sentry.captureException(e);
                reject("Probleme lors de la récupération de la donnée", e);
              });
            return;
          }

          const message =
            `Un probleme a été detecté lors de la récupération de données via l'API. ` +
            `Les équipes techniques ont été notifiées. ` +
            `Status Code: ${response.status}`;
          Sentry.captureException(message);
          reject(message);
          return;
        })
        .catch(err => {
          Sentry.captureException(err);
          reject("L'api est inaccessible", err);
        });
    });
  }

  getMuseoCollection(ref) {
    // Attenttion ! La requete dans "query" est sensible aux retours chariots et aux espaces, y compris ceux de l'indentation
    const query = `{"preference":"res"}
    {"query":{"bool":{"must":[{"bool":{"should":[{"term":{"MUSEO.keyword":"`+ref+`"}}]}},{"match_all":{}}]}},"size":25,"from":0}
`;

    return new Promise((resolve, reject) => {
      fetch(`${api_url}/search/merimee,palissy,memoire,joconde,mnr,museo,enluminures,autor/_msearch`, {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "Application/x-ndjson" },
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
        body: query
      }).then(response => {
        response.json()
          .then(data => {
            resolve(data.responses[0].hits.total);
          })
          .catch(e => {
            Sentry.captureException(e);
            reject("Probleme lors de la récupération de la donnée", e);
          });
      })
      .catch(e => reject(e));;
    });
  }
}

const apiObject = new api();
export default apiObject;
