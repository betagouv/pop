import "isomorphic-fetch";
const { api_url } = require("../config.js");

/**
 * This class provides ~low level access to POP API.
 * Use it via `request.fetchJSON`, `request.fetchFormData`, etc.
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

  async fetchJSON(verb, url, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${api_url}/${url.replace(/^\//, "")}`,
          this._init(verb, data && JSON.stringify(data), { "Content-Type": "application/json" })
        );
        const jsonData = await response.json();
        if (response.status !== 200 || jsonData.success !== true) {
          return reject(jsonData);
        }
        resolve(jsonData);
      } catch (err) {
        Raven.captureException(err);
        reject({ success: false, msg: "L'api est inaccessible." });
      }
    });
  }

  async fetchFormData(verb, url, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${api_url}/${url.replace(/^\//, "")}`,
          this._init(verb, data)
        );
        const jsonData = await response.json();
        if (response.status !== 200 || jsonData.success !== true) {
          return reject(jsonData);
        }
        resolve(jsonData);
      } catch (err) {
        Raven.captureException(err);
        reject({ success: false, msg: "L'api est inaccessible." });
      }
    });
  }

  _errorTxt(response) {
    return [
      `Un probleme a été detecté lors de l'enregistrement via l'API.`,
      `Les équipes techniques ont été notifiées.`,
      `Status Code: ${response.status}`
    ].join(" ");
  }

  // LEGACY
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
          // Special case: we don't want to track unsuccessful login,
          // nor anything about "unauthorized". So there is a `reject`
          // operation, but no Raven.capture.
          // See: https://sentry.data.gouv.fr/betagouvfr/pop-culture/issues/644727/
          if (res.success === false && res.msg && response.status === 401) {
            reject(res.msg);
            return;
          }
          // Stringify response and send it to Sentry.
          Raven.captureException(JSON.stringify(res));
          reject("Problème lors de la récupération de la donnée", res);
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

  getJSON_IgnoreSuccessStatusAndNotFound(url, init) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, init);
        if (response.status === 404) {
          resolve(null);
          return;
        } else if (response.status !== 200) {
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
