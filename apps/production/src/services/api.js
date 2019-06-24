const { api_url } = require("../config.js");
import "isomorphic-fetch";
import request from "./request";

// Buisness level access to POP API.
class api {
  // Authentication
  signin(email, password) {
    return request.fetchJSON("POST", "/auth/signin", { email, password });
  }

  // Get auth user by her token.
  getAuthUser() {
    return request.fetchJSON("GET", "/auth/user");
  }

  // Update password for one user (RPC style).
  updatePassword({ email, pwd, pwd1, pwd2 }) {
    return request.fetchJSON("POST", "/auth/updatePassword", { email, pwd, pwd1, pwd2 });
  }

  // Ask for new password.
  forgetPassword(email) {
    return request.fetchJSON("POST", `/auth/forgetPassword`, { email });
  }

  // Create a user.
  async createUser({ email, group, role, institution, prenom, nom, museofile }) {
    const props = { email, group, role, institution, prenom, nom, museofile };
    return request.fetchJSON("POST", "/users", props);
  }

  // Update a user.
  async updateUser({ email, group, role, institution, prenom, nom, museofile }) {
    const props = { email, group, role, institution, prenom, nom, museofile };
    return request.fetchJSON("PUT", `/users/${email}`, props);
  }

  // Delete one user by her email.
  deleteUser(email) {
    return request.fetchJSON("DELETE", `/users/${email}`);
  }

  // Get all users.
  getUsers() {
    return request.fetchJSON("GET", `/users`);
  }

  // TODO
  sendReport(subject, to, body) {
    const data = { subject, to, body };
    if (process.env.NODE_ENV !== "production") {
      data.subject = "TEST " + data.subject;
    }
    return request.fetchJSON("POST", `/reporting/email`, data);
  }

  // TODO
  createImport(data, file) {
    let formData = new FormData();
    formData.append("import", JSON.stringify(data));
    formData.append("file", file, "import.csv");
    return request.post(`${api_url}/import`, formData);
  }

  // TODO
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

  // TODO
  createGallery(obj, file) {
    let formData = new FormData();
    console.log("add file", file);
    if (file) {
      formData.append("files", file, file.name);
    }
    formData.append("gallery", JSON.stringify(obj));
    return request.post(`${api_url}/gallery`, formData);
  }

  // TODO
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
    let formData = new FormData();
    formData.append("notice", JSON.stringify(data));
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i], files[i].name);
    }
    return request.fetchFormData("PUT", `/${collection}/${ref}`, formData);
  }

  // TODO
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

  // TODO
  getNotice(collection, ref) {
    return request.get(`${api_url}/${collection}/${ref}`);
  }

  // TODO
  deleteNotice(collection, ref) {
    return request.delete(`${api_url}/${collection}/${ref}`);
  }
  // TODO
  getNewId(collection, prefix, dpt) {
    return request.get(`${api_url}/${collection}/newId?prefix=${prefix}&dpt=${dpt}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
  }
  // TODO
  getTopConceptsByThesaurusId(thesaurusId) {
    return request.get(`${api_url}/thesaurus/getTopConceptsByThesaurusId?id=${thesaurusId}`);
  }
  // TODO
  getAllChildrenConcept(thesaurusId) {
    return request.get(`${api_url}/thesaurus/getAllChildrenConcept?id=${thesaurusId}`);
  }
  // TODO
  getPreferredTermByConceptId(thesaurusId) {
    return request.get(`${api_url}/thesaurus/getPreferredTermByConceptId?id=${thesaurusId}`);
  }
  // TODO
  deleteAllThesaurus(thesaurusId) {
    return request.get(`${api_url}/thesaurus/deleteAllThesaurus?id=${thesaurusId}`);
  }
  // TODO
  createThesaurus(thesaurusId, terms) {
    return request.post(
      `${api_url}/thesaurus/createThesaurus?id=${thesaurusId}`,
      JSON.stringify(terms),
      "application/json"
    );
  }
  // TODO
  getThesaurus(thesaurusId, str) {
    return request.get(`${api_url}/thesaurus/search?id=${thesaurusId}&value=${str}`);
  }
  // TODO
  validateWithThesaurus(thesaurusId, str) {
    return request.get(`${api_url}/thesaurus/validate?id=${thesaurusId}&value=${str}`);
  }
}

const apiObject = new api();
export default apiObject;

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
