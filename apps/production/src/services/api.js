const { api_url } = require("../config.js");
import "isomorphic-fetch";
import request from "./request";

// Buisness level access to POP API.
class api {
  // Authentication
  signin(email, password) {
    const obj = { email, password };
    return request.post(`${api_url}/auth/signin`, JSON.stringify(obj), "application/json");
  }

  // Get auth user by her token.
  getAuthUser(token) {
    return request.get(`${api_url}/auth/user`, { headers: { Authorization: token } });
  }

  // Update password for one user (RPC style).
  updatePassword({ email, pwd, pwd1, pwd2 }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${api_url}/auth/updatePassword`,
          request._init("POST", JSON.stringify({ email, pwd, pwd1, pwd2 }), {
            "Content-Type": "application/json"
          })
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

  // Ask for new password.
  forgetPassword(email) {
    const obj = { email };
    return request.post(`${api_url}/auth/forgetPassword`, JSON.stringify(obj), "application/json");
  }

  // Create a user.
  async createUser(props) {
    return new Promise(async (resolve, reject) => {
      const { email, group, role, institution, prenom, nom, museofile } = props;
      try {
        const response = await fetch(
          `${api_url}/users`,
          request._init(
            "POST",
            JSON.stringify({ email, group, role, institution, prenom, nom, museofile }),
            { "Content-Type": "application/json" }
          )
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

  // Update a user.
  async updateUser(props) {
    return new Promise(async (resolve, reject) => {
      const { email, group, role, institution, prenom, nom, museofile } = props;
      try {
        const response = await fetch(
          `${api_url}/users/${email}`,
          request._init(
            "PUT",
            JSON.stringify({ email, group, role, institution, prenom, nom, museofile }),
            { "Content-Type": "application/json" }
          )
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

  deleteUser(email) {
    return request.delete(`${api_url}/users/${email}`);
  }

  getUsers() {
    const token = localStorage.getItem("token");
    return request.get(`${api_url}/users`, { headers: { Authorization: token } });
  }

  sendReport(subject, to, body) {
    const obj = { subject, to, body };
    if (process.env.NODE_ENV !== "production") {
      obj.subject = "TEST " + obj.subject;
    }
    return request.post(`${api_url}/mail`, JSON.stringify(obj), "application/json");
  }

  createImport(data, file) {
    let formData = new FormData();
    formData.append("import", JSON.stringify(data));
    formData.append("file", file, "import.csv");
    return request.post(`${api_url}/import`, formData);
  }

  bulkUpdateAndCreate(arr, cb) {
    return new Promise(async (resolve, reject) => {
      const MAX_ATTEMPTS = 5;
      const BULK_SIZE = 5;
      const TIME_BEFORE_RETRY = 30000;
      let attempts = 0;
      const total = arr.length;

      while (arr.length) {
        const currentNotices = arr.splice(0, BULK_SIZE);
        let currentQueries = currentNotices.map(e => {
          if (e.action === "updated") {
            return this.legacyUpdateNotice(e.notice.REF, e.collection, e.notice, e.files);
          } else {
            return this.createNotice(e.collection, e.notice, e.files);
          }
        });
        const progress = (100 * (total - arr.length)) / total;
        try {
          await Promise.all(currentQueries);
          cb(progress, `Notices restantes  ${total - arr.length}/${total}`);
        } catch (e) {
          //I add the currents one back to the list. I put it at the beginning because if there is a server error on this one, I dont want to wait the end to know ( but maybe I should)
          arr.splice(0, 0, ...currentNotices);
          if (++attempts >= MAX_ATTEMPTS) {
            reject("Import échoué. Trop d'erreurs ont été détectées");
            return;
          }
          cb(
            progress,
            `Un problème de connexion à été détecté. Tentative : ${attempts}/${MAX_ATTEMPTS}, ${e}`
          );
          await timeout(TIME_BEFORE_RETRY);
        }
      }
      resolve();
    });
  }

  createGallery(obj, file) {
    let formData = new FormData();
    console.log("add file", file);
    if (file) {
      formData.append("files", file, file.name);
    }
    formData.append("gallery", JSON.stringify(obj));
    return request.post(`${api_url}/gallery`, formData);
  }

  legacyUpdateNotice(ref, collection, data, files = []) {
    let formData = new FormData();
    formData.append("notice", JSON.stringify(data));
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i], files[i].name);
    }
    return request.put(`${api_url}/${collection}/${ref}`, formData);
  }

  // Update one notice.
  updateNotice(ref, collection, data, files = []) {
    return new Promise(async (resolve, reject) => {
      let formData = new FormData();
      formData.append("notice", JSON.stringify(data));
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i], files[i].name);
      }
      try {
        const response = await fetch(
          `${api_url}/${collection}/${ref}`,
          request._init("PUT", formData)
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

  createNotice(collection, data, files = []) {
    for (let propName in data) {
      // Clean object.
      if (!data[propName]) {
        delete data[propName];
      }
    }
    let formData = new FormData();
    formData.append("notice", JSON.stringify(data));
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i], files[i].name);
    }
    return request.post(`${api_url}/${collection}`, formData);
  }

  getNotice(collection, ref) {
    return request.get(`${api_url}/${collection}/${ref}`);
  }

  deleteNotice(collection, ref) {
    return request.delete(`${api_url}/${collection}/${ref}`);
  }

  getNewId(collection, prefix, dpt) {
    return request.get(`${api_url}/${collection}/newId?prefix=${prefix}&dpt=${dpt}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
  }
  getTopConceptsByThesaurusId(thesaurusId) {
    return request.get(`${api_url}/thesaurus/getTopConceptsByThesaurusId?id=${thesaurusId}`);
  }
  getAllChildrenConcept(thesaurusId) {
    return request.get(`${api_url}/thesaurus/getAllChildrenConcept?id=${thesaurusId}`);
  }
  getPreferredTermByConceptId(thesaurusId) {
    return request.get(`${api_url}/thesaurus/getPreferredTermByConceptId?id=${thesaurusId}`);
  }
  deleteAllThesaurus(thesaurusId) {
    return request.get(`${api_url}/thesaurus/deleteAllThesaurus?id=${thesaurusId}`);
  }
  createThesaurus(thesaurusId, terms) {
    return request.post(
      `${api_url}/thesaurus/createThesaurus?id=${thesaurusId}`,
      JSON.stringify(terms),
      "application/json"
    );
  }

  getThesaurus(thesaurusId, str) {
    return request.get(`${api_url}/thesaurus/search?id=${thesaurusId}&value=${str}`);
  }

  validateWithThesaurus(thesaurusId, str) {
    return request.get(`${api_url}/thesaurus/validate?id=${thesaurusId}&value=${str}`);
  }
}

const apiObject = new api();
export default apiObject;

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
