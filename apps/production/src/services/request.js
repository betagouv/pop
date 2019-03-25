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
    return new Promise(async (resolve, reject) => {
      try {
        const init = this._init("PUT", data, contentType ? { "content-type": contentType } : {});
        const response = await fetch(url, init);
        if (response.status !== 200) {
          Raven.captureException(JSON.stringify(response));
          return reject(this._errorTxt(response));
        }
        return resolve(data);
      } catch (err) {
        Raven.captureException(JSON.stringify(err));
        return reject("L'api est inaccessible", err);
      }
    });
  }

  post(url, data, contentType) {
    return new Promise(async (resolve, reject) => {
      try {
        const init = this._init("POST", data, contentType ? { "Content-Type": contentType } : {});
        const response = await fetch(url, init);
        if (response.status === 500) {
          Raven.captureException(JSON.stringify(response));
          return reject(this._errorTxt(response));
        }
        try {
          const data = await response.json();
          if (data && data.success === false && data.msg) {
            return reject(data.msg);
          } else if (response.status !== 200) {
            Raven.captureException(JSON.stringify(response));
            return reject(this._errorTxt(response));
          }
          return resolve(data);
        } catch (e) {
          Raven.captureException(JSON.stringify(e));
          return reject("Problème lors de la récupération de la donnée", e);
        }
      } catch (err) {
        Raven.captureException(JSON.stringify(err));
        return reject("L'api est inaccessible", err);
      }
    });
  }

  delete(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, this._init("DELETE", null));
        if (response.status !== 200) {
          Raven.captureException(JSON.stringify(response));
          return reject(this._errorTxt(response));
        }
        return resolve();
      } catch (err) {
        Raven.captureException(JSON.stringify(err));
        return reject("L'api est inaccessible", err);
      }
    });
  }

  get(url, init) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, init);
        if (response.status === 404) {
          return resolve(null);
        } else if (response.status !== 200) {
          Raven.captureException(JSON.stringify(response));
          return reject(this._errorTxt(response));
        }
        try {
          return resolve(await response.json());
        } catch (e) {
          Raven.captureException(JSON.stringify(e));
          return reject("Problème lors de la récupération de la donnée", e);
        }
      } catch (e) {
        Raven.captureException(JSON.stringify(err));
        return reject("L'api est inaccessible", err);
      }
    });
  }
}

export default new request();
