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
        const ct = contentType ? { "Content-Type": contentType } : {};
        const response = await fetch(url, this._init("PUT", data, ct));

        if (response.status !== 200) {
          Raven.captureException(JSON.stringify(response));
          reject(this._errorTxt(response));
          return;
        }
        resolve(data);
      } catch (err) {
        Raven.captureException(JSON.stringify(err));
        reject("L'api est inaccessible", err);
      }
    });
  }

  post(url, data, contentType) {
    return new Promise(async (resolve, reject) => {
      try {
        const ct = contentType ? { "Content-Type": contentType } : {};
        const response = await fetch(url, this._init("POST", data, ct));

        if (response.status === 500) {
          Raven.captureException(JSON.stringify(response));
          reject(this._errorTxt(response));
          return;
        }
        try {
          const res = await response.json();
          if (res.success) {
            resolve(res);
            return;
          }
          Raven.captureException(JSON.stringify(err));
          reject("Problème lors de la récupération de la donnée", err);
        } catch (err) {
          Raven.captureException(JSON.stringify(err));
          reject("Problème lors de la récupération de la donnée", err);
        }
      } catch (err) {
        Raven.captureException(JSON.stringify(err));
        reject("L'api est inaccessible", err);
      }
    });
  }

  delete(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, this._init("DELETE", null));

        if (response.status !== 200) {
          Raven.captureException(JSON.stringify(response));
          reject(this._errorTxt(response));
          return;
        }

        resolve();
      } catch (err) {
        Raven.captureException(JSON.stringify(err));
        reject("L'api est inaccessible", err);
      }
    });
  }

  get(url, init) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, init);

        if (response.status === 404) {
          resolve(null);
          return;
        }

        if (response.status !== 200) {
          Raven.captureException(JSON.stringify(response));
          reject(this._errorTxt(response));
          return;
        }
        try {
          const data = await response.json();
          resolve(data);
        } catch (err) {
          Raven.captureException(JSON.stringify(err));
          reject("Problème lors de la récupération de la donnée", err);
        }
      } catch (err) {
        Raven.captureException(JSON.stringify(err));
        reject("L'api est inaccessible", err);
      }
    });
  }
}

export default new request();
