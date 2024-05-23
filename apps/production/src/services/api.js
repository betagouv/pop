import "isomorphic-fetch";
import request from "./request";

// Buisness level access to POP API.
class api {
	// Authentication
	signin(email, password) {
		return request.fetchJSON("POST", "/auth/signin", { email, password });
	}
	// Logout
	logout() {
		return request.fetchJSON("GET", "/auth/logout");
	}

	// Get auth user by her token.
	getAuthUser() {
		return request.fetchJSON("GET", "/auth/user");
	}

	// Update password for one user (RPC style).
	updatePassword({ email, pwd, pwd1, pwd2 }) {
		return request.fetchJSON("POST", "/auth/updatePassword", {
			email,
			pwd,
			pwd1,
			pwd2,
		});
	}

	// Ask for new password.
	forgetPassword(email) {
		return request.fetchJSON("POST", "/auth/forgetPassword", { email });
	}

	// Create a user.
	async createUser({
		email,
		group,
		role,
		institution,
		prenom,
		nom,
		museofile,
	}) {
		const props = {
			email,
			group,
			role,
			institution,
			prenom,
			nom,
			museofile,
		};
		return request.fetchJSON("POST", "/users", props);
	}

	// Update a user.
	async updateUser({
		email,
		group,
		role,
		institution,
		prenom,
		nom,
		museofile,
		isBloqued,
	}) {
		const props = {
			email,
			group,
			role,
			institution,
			prenom,
			nom,
			museofile,
			isBloqued,
		};
		return request.fetchJSON("PUT", `/users/${email}`, props);
	}

	// Delete one user by her email.
	deleteUser(email) {
		return request.fetchJSON("DELETE", `/users/${email}`);
	}

	// Get all users.
	getUsers() {
		return request.fetchJSON("GET", "/users");
	}

	// Get all producteurs.
	getProducteurs() {
		return request.fetchJSON("GET", "/producteur");
	}

	//Get one producteur
	getProducteurByLabel(label) {
		return request.fetchJSON("GET", `/producteur/label?label=${label}`);
	}

	// Create a producteur.
	async createProducteur({ label, base }) {
		const props = { label, base };
		return request.fetchJSON("POST", "/producteur", props);
	}

	// Update a producteur.
	async updateProducteur({ _id, label, base }) {
		const props = { _id, label, base };
		return request.fetchJSON("PUT", `/producteur/${_id}`, props);
	}

	// Get prefix list from producteur list
	async getPrefixesFromProducteurs(producteurs) {
		const producteurList = producteurs.join(",");
		return request.fetchJSON(
			"GET",
			`/producteur/prefixesFromProducteurs?producteurs=${producteurList}`,
		);
	}

	// Get all groups.
	getGroups() {
		return request.fetchJSON("GET", "/groups");
	}

	// Get all groups.
	getGroupByLabel(label) {
		return request.fetchJSON("GET", `/groups/label?label=${label}`);
	}

	// Create a group.
	async createGroup({ label, producteurs }) {
		const props = { label, producteurs };
		return request.fetchJSON("POST", "/groups", props);
	}

	// Get all delete historiques.
	getDeleteHistoriques(limit = null) {
		let route = "/deleteHistorique";
		if (limit) {
			route += `?limit=${limit}`;
		}
		return request.fetchJSON("GET", route);
	}

	// Create delete historique.
	async createDeleteHistorique(ref, base) {
		const props = { ref, base };
		return request.fetchJSON("POST", "/deleteHistorique", props);
	}

	// can edit notice depending on producteurs, groups, user
	canEdit(REF, MUSEO, PRODUCTEUR, COLLECTION) {
		return request.fetchJSON(
			"GET",
			`/groups/canEdit?ref=${REF}&museo=${MUSEO}&producteur=${PRODUCTEUR}&collection=${COLLECTION}`,
		);
	}

	// Update a group.
	async updateGroup({ _id, label, producteurs }) {
		const props = { _id, label, producteurs };
		return request.fetchJSON("PUT", `/groups/${_id}`, props);
	}

	// Send a report.
	sendReport(subject, to, body) {
		const data = { subject, to, body };
		if (process.env.NODE_ENV !== "production") {
			data.subject = `TEST ${data.subject}`;
		}
		return request.fetchJSON("POST", "/reporting/email", data);
	}

	// Create an import.
	createImport(data, file) {
		const formData = new FormData();
		formData.append("import", JSON.stringify(data));
		formData.append("file", file, "import.csv");
		return request.fetchFormData("POST", "/import", formData);
	}

	// Update an import.
	updateImport(id, data, file) {
		const formData = new FormData();
		formData.append("import", JSON.stringify(data));
		formData.append("file", file, "import.csv");
		return request.fetchFormData("PUT", `/import/${id}`, formData);
	}

	// Update and create N notices (via import).
	async bulkUpdateAndCreate(arr, cb) {
		const MAX_ATTEMPTS = 2;
		const TIME_BEFORE_RETRY = 3000;
		let attempts = 0;
		const total = arr.length;
		const progress = (100 * (total - arr.length)) / total;
		const BULK_SIZE = 5;
		const BULK_SIZE_AUTOR = 200;

		// Lists for "autor" notices
		let autorCurrentNoticesCreate = [];
		let autorCurrentNoticesUpdate = [];
		let currentNoticesCreate = [];
		let currentNoticesUpdate = [];
		const listNoticesError = [];

		// Get All "autor" notices for CREATE if it exists
		autorCurrentNoticesCreate = arr.reduce(
			(accumulatorNotices, currentNotice) => {
				if (
					currentNotice.collection === "autor" &&
					currentNotice.action === "created"
				) {
					accumulatorNotices.push(currentNotice);
				}
				return accumulatorNotices;
			},
			[],
		);

		// Get All "autor" notices for UPDATE if it exists
		autorCurrentNoticesUpdate = arr.reduce(
			(accumulatorNotices, currentNotice) => {
				if (
					currentNotice.collection === "autor" &&
					currentNotice.action === "updated"
				) {
					accumulatorNotices.push(currentNotice);
				}
				return accumulatorNotices;
			},
			[],
		);

		// DELETE those "autor" notices from currentNotices
		arr = arr.filter(
			(notice) =>
				!autorCurrentNoticesCreate.includes(notice) &&
				!autorCurrentNoticesUpdate.includes(notice),
		);

		while (
			autorCurrentNoticesCreate.length ||
			autorCurrentNoticesUpdate.length
		) {
			try {
				// CREATE "autor" notices
				if (autorCurrentNoticesCreate.length > 0) {
					currentNoticesCreate = autorCurrentNoticesCreate.splice(
						0,
						BULK_SIZE_AUTOR,
					);
					await this.createNoticeAutor(currentNoticesCreate);
				}
				// UPDATE "autor" notices
				if (autorCurrentNoticesUpdate.length > 0) {
					currentNoticesUpdate = autorCurrentNoticesUpdate.splice(
						0,
						BULK_SIZE_AUTOR,
					);
					await this.updateNoticeAutor(currentNoticesUpdate);
				}
				cb(
					progress,
					`Notices restantes  ${
						total -
						(autorCurrentNoticesUpdate.length +
							autorCurrentNoticesCreate.length)
					}/${total}`,
				);
			} catch (e) {
				// I add the currents one back to the list.
				// I put it at the beginning because if there is a server error on this one,
				// I dont want to wait the end to know (but maybe I should)
				let currentNoticesAutor = autorCurrentNoticesCreate;
				currentNoticesAutor = currentNoticesAutor.concat(
					autorCurrentNoticesUpdate,
				);
				arr.splice(0, 0, ...currentNoticesAutor);
				if (++attempts >= MAX_ATTEMPTS) {
					reject("Import échoué. Trop d'erreurs ont été détectées");
					return;
				}
				cb(
					progress,
					`Un problème a été détecté : ${
						e.msg || "Erreur de connexion à l'API."
					} ` + `Tentative : ${attempts}/${MAX_ATTEMPTS}`,
				);
				await timeout(TIME_BEFORE_RETRY);
			}
		}

		while (arr.length) {
			const currentNotices = arr.splice(0, BULK_SIZE);
			let element = "";
			let index = 0;
			try {
				// add other bases
				if (currentNotices.length > 0) {
					for (let i = 0; i < currentNotices.length; i++) {
						element = currentNotices[i];
						if (element.action === "updated") {
							await this.updateNotice(
								element.notice.REF,
								element.collection,
								element.notice,
								element.files,
								"import",
							);
						} else {
							await this.createNotice(
								element.collection,
								element.notice,
								element.files,
							);
						}
						index = i;
					}
				}
				cb(
					progress,
					`Notices restantes  ${total - arr.length}/${total}`,
				);
			} catch (e) {
				// I add the currents one back to the list.
				// I put it at the beginning because if there is a server error on this one,
				// I dont want to wait the end to know (but maybe I should)
				arr.splice(0, 0, ...currentNotices);
				if (++attempts >= MAX_ATTEMPTS) {
					// reject("Import échoué. Trop d'erreurs ont été détectées");
					// Création ligne d'erreur pour le fichier de log
					const error = {};
					error[element.notice.REF] = {
						notice: element.notice,
						message: e,
					};
					listNoticesError.push(error);
					// Suppression de la ligne dans les imports
					arr = arr.filter(
						(el) => el.notice.REF !== element.notice.REF,
					);
					// return;
				} else {
					cb(
						progress,
						`Un problème a été détecté : ${
							e.msg || "Erreur de connexion à l'API."
						} ` + `Tentative : ${attempts}/${MAX_ATTEMPTS}`,
					);
					await timeout(TIME_BEFORE_RETRY);
				}
			}
		}
		return listNoticesError;
	}

	// Create a gallery.
	createGallery(obj, file) {
		const formData = new FormData();
		if (file) {
			formData.append("files", file, file.name);
		}
		formData.append("gallery", JSON.stringify(obj));
		return request.fetchFormData("POST", "/gallery", formData);
	}

	// Update one notice.
	async updateNotice(ref, collection, data, files, updateMode) {
		const formData = new FormData();
		formData.append("notice", JSON.stringify(data));
		for (let i = 0; i < files.length; i++) {
			formData.append("file", files[i], files[i].name);
		}
		formData.append("updateMode", updateMode);
		return request.fetchFormData("PUT", `/${collection}/${ref}`, formData);
	}

	// Create a new notice.
	async createNotice(collection, data, files = []) {
		// Clean object.
		for (const propName in data) {
			if (!data[propName]) {
				delete data[propName];
			}
		}
		const formData = new FormData();
		formData.append("notice", JSON.stringify(data));
		for (let i = 0; i < files.length; i++) {
			formData.append("file", files[i], files[i].name);
		}
		return request.fetchFormData("POST", `/${collection}`, formData);
	}

	// Create a new autor notice.
	async createNoticeAutor(autorNotices) {
		const formData = new FormData();
		formData.append("autorNotices", JSON.stringify(autorNotices));
		return request.fetchFormData("POST", "/autor", formData);
	}

	// Update autor notice.
	async updateNoticeAutor(autorNotices) {
		const formData = new FormData();
		formData.append("autorNotices", JSON.stringify(autorNotices));
		return request.fetchFormData("PUT", "/autor", formData);
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
		return request.fetchJSON(
			"GET",
			`/${collection}/newId?prefix=${prefix}&dpt=${dpt}`,
		);
	}
	// Get Top Concepts By Thesaurus Id.
	getTopConceptsByThesaurusId(thesaurusId) {
		return request.getJSON(
			`/thesaurus/getTopConceptsByThesaurusId?id=${thesaurusId}`,
		);
	}
	// Get All Children Concept.
	getAllChildrenConcept(thesaurusId) {
		return request.getJSON(
			`/thesaurus/getAllChildrenConcept?id=${thesaurusId}`,
		);
	}
	// Get Preferred Term By Concept Id.
	getPreferredTermByConceptId(thesaurusId) {
		return request.getJSON(
			`/thesaurus/getPreferredTermByConceptId?id=${thesaurusId}`,
		);
	}
	// Delete All Thesaurus.
	deleteAllThesaurus(thesaurusId) {
		return request.getJSON(
			`/thesaurus/deleteAllThesaurus?id=${thesaurusId}`,
		);
	}
	// Create Thesaurus.
	createThesaurus(thesaurusId, terms) {
		return request.fetchJSON(
			"POST",
			`/thesaurus/createThesaurus?id=${thesaurusId}`,
			terms,
		);
	}
	// Get Thesaurus.
	getThesaurus(thesaurusId, str) {
		return request.getJSON(
			`/thesaurus/search?id=${thesaurusId}&value=${str}`,
		);
	}
	// Validate with thesaurus
	validateWithThesaurus(thesaurusId, str) {
		return request.getJSON(
			`/thesaurus/validate?id=${thesaurusId}&value=${str}`,
		);
	}
	// Validation OpenTheso par autocomplétion
	validateOpenTheso(thesaurusId, str) {
		return request.getJSON(
			`/thesaurus/autocompleteByIdthesaurusAndValue?id=${thesaurusId}&value=${str}`,
		);
	}
	// Récupération du prefLabel par l'identifiant Ark
	getPrefLabelByIdArk(IdArk) {
		return request.fetchJSON(
			"GET",
			`/thesaurus/getPrefLabelByIdArk?id=${IdArk}`,
		);
	}
	// Récupération des thésaurus correspondant l'identifiant et à la saisie (autcomplétion - commence par)
	autocompleteThesaurus(thesaurusId, str) {
		return request.getJSON(
			`/thesaurus/autocompleteThesaurus?id=${thesaurusId}&value=${str}`,
		);
	}

	getThesaurusById(idThesaurus) {
		return request.fetchJSON(
			"GET",
			`/thesaurus/getAllThesaurusById?id=${idThesaurus}`,
		);
	}

	getMaintenance() {
		return request.getJSON("/maintenance");
	}

	getNoticesByRef(collection, refs) {
		return request.fetchJSON("POST", `/notices/batch/${collection}`, {
			refs,
		});
	}

	getLastThesaurusUpdate() {
		return request.fetchJSON("GET", "/thesaurus/last-update");
	}
}

const apiObject = new api();
export default apiObject;

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
