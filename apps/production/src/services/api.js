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

  // Send a report.
  sendReport(subject, to, body) {
    const data = { subject, to, body };
    if (process.env.NODE_ENV !== "production") {
      data.subject = "TEST " + data.subject;
    }
    return request.fetchJSON("POST", `/reporting/email`, data);
  }

  // Create an import.
  createImport(data, file) {
    let formData = new FormData();
    formData.append("import", JSON.stringify(data));
    formData.append("file", file, "import.csv");
    return request.fetchFormData("POST", `/import`, formData);
  }

  // Update and create N notices (via import).
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
            return this.updateNotice(e.notice.REF, e.collection, e.notice, e.files);
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
            `Un problème a été détecté : ${e.msg || "Erreur de connexion à l'API."} ` +
              `Tentative : ${attempts}/${MAX_ATTEMPTS}`
          );
          await timeout(TIME_BEFORE_RETRY);
        }
      }
      resolve();
    });
  }

  // Create a gallery.
  createGallery(obj, file) {
    let formData = new FormData();
    if (file) {
      formData.append("files", file, file.name);
    }
    formData.append("gallery", JSON.stringify(obj));
    return request.fetchFormData("POST", `/gallery`, formData);
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

  // Create a new notice.
  createNotice(collection, data, files = []) {
    // Clean object.
    for (let propName in data) {
      if (!data[propName]) {
        delete data[propName];
      }
    }
    let formData = new FormData();
    formData.append("notice", JSON.stringify(data));
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i], files[i].name);
    }
    return request.fetchFormData("POST", `/${collection}`, formData);
  }

  // Get one notice.
  getNotice(collection, ref) {
    return request.getJSON(`/${collection}/${ref}`);
  }

  // Delete one notice
  deleteNotice(collection, ref) {
    return request.fetchJSON("DELETE", `/${collection}/${ref}`);
  }
  // Get a new ID for some notices.
  getNewId(collection, prefix, dpt) {
    return request.fetchJSON("GET", `/${collection}/newId?prefix=${prefix}&dpt=${dpt}`);
  }
  // Get Top Concepts By Thesaurus Id.
  getTopConceptsByThesaurusId(thesaurusId) {
    return request.getJSON(`/thesaurus/getTopConceptsByThesaurusId?id=${thesaurusId}`);
  }
  // Get All Children Concept.
  getAllChildrenConcept(thesaurusId) {
    return request.getJSON(`/thesaurus/getAllChildrenConcept?id=${thesaurusId}`);
  }
  // Get Preferred Term By Concept Id.
  getPreferredTermByConceptId(thesaurusId) {
    return request.getJSON(`/thesaurus/getPreferredTermByConceptId?id=${thesaurusId}`);
  }
  // Delete All Thesaurus.
  deleteAllThesaurus(thesaurusId) {
    return request.getJSON(`/thesaurus/deleteAllThesaurus?id=${thesaurusId}`);
  }
  // Create Thesaurus.
  createThesaurus(thesaurusId, terms) {
    return request.fetchJSON("POST", `/thesaurus/createThesaurus?id=${thesaurusId}`, terms);
  }
  // Get Thesaurus.
  getThesaurus(thesaurusId, str) {
    return request.getJSON(`/thesaurus/search?id=${thesaurusId}&value=${str}`);
  }
  // Validate with thesaurus
  validateWithThesaurus(thesaurusId, str) {
    return request.getJSON(`/thesaurus/validate?id=${thesaurusId}&value=${str}`);
  }
}

const apiObject = new api();
export default apiObject;

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
