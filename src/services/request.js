import "isomorphic-fetch";

/**
 * This class provides ~low level access to POP API.
 * Use it via `request.post`, `request.put`, etc.
 */
class request {

  _init(verb, data, headers) {
    headers = headers || {};
    headers["user-agent"] = "POP application";
    if (localStorage.getItem("token")) {
      headers["authorization"] = localStorage.getItem("token");
    }
    const initData = {
      cache: "no-cache",
      credentials: "same-origin",
      headers,
      method: verb,
      mode: "cors",
      redirect: "follow",
      referrer: "no-referrer"
    };
    if (data) {
      initData.body = data;
    }
    return initData;
  }

  _errorTxt(response) {
    return [
      `Un probleme a été detecté lors de l'enregistrement via l'API.`,
      `Les équipes techniques ont été notifiées.`,
      `Status Code: ${response.status}`
    ].join(" ");
  }

  put(url, data, contentType) {
    return new Promise((resolve, reject) => {
      fetch(
        url,
        this._init(
          "PUT",
          data,
          contentType ? { "content-type": contentType } : {}
        )
      )
        .then(response => {
          if (response.status !== 200) {
            Raven.captureException(this._errorTxt(response));
            reject(this._errorTxt(response));
            return;
          }
          resolve();
        })
        .catch(err => {
          Raven.captureException(err);
          reject("L'api est inaccessible", err);
        });
    });
  }

  post(url, data, contentType) {
    return new Promise((resolve, reject) => {
      fetch(
        url,
        this._init(
          "POST",
          data,
          contentType ? { "Content-Type": contentType } : {}
        )
      )
        .then(response => {
          if (response.status === 500) {
            Raven.captureException(this._errorTxt(response));
            reject(this._errorTxt(response));
            return;
          }

          response
            .json()
            .then(data => {
              if (data.success) {
                resolve(data);
              } else {
                reject(data.msg);
              }
            })
            .catch(e => {
              Raven.captureException(e);
              reject("Probleme lors de la récupération de la donnée", e);
            });
        })
        .catch(err => {
          Raven.captureException(err);
          reject("L'api est inaccessible", err);
        });
    });
  }

  delete(url) {
    return new Promise((resolve, reject) => {
      fetch(url, this._init("DELETE", null))
        .then(response => {
          if (response.status !== 200) {
            Raven.captureException(this._errorTxt(response));
            reject(this._errorTxt(response));
            return;
          }
          resolve();
        })
        .catch(err => {
          Raven.captureException(err);
          reject("L'api est inaccessible", err);
        });
    });
  }

  get(url, init) {
    return new Promise((resolve, reject) => {
      fetch(url, init)
        .then(response => {
          if (response.status === 404) {
            resolve(null);
            return;
          }

          if (response.status !== 200) {
            Raven.captureException(this._errorTxt(response));
            reject(this._errorTxt(response));
            return;
          }

          response
            .json()
            .then(data => {
              resolve(data);
            })
            .catch(e => {
              Raven.captureException(e);
              reject("Probleme lors de la récupération de la donnée", e);
            });
          return;
        })
        .catch(err => {
          Raven.captureException(err);
          reject("L'api est inaccessible", err);
        });
    });
  }
}

export default new request();
