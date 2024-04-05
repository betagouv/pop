import "isomorphic-fetch";
const { api_url } = require("../config);

// This class provides ~low level access to POP API.
// Use it via `request.fetchJSON`, `request.fetchFormData`, etc.
class request {
	// Prepare headers.
	_init(verb, data, headers) {
		headers = headers || {};
		headers["user-agent"] = "POP application";
		const initData = {
			cache: "no-cache",
			credentials: "include",
			headers,
			method: verb,
			mode: "cors",
			redirect: "follow",
			referrer: "no-referrer",
		};
		if (data) {
			initData.body = data;
		}
		return initData;
	}

	// get, post, etc. JSON data and rerieve JSON.
	// Usage: fetchJSON("POST", "/users", {name: "hello"});
	async fetchJSON(verb, url, data) {
		try {
			const response = await fetch(
				`${api_url}/${url.replace(/^\//, "")}`,
				this._init(verb, data && JSON.stringify(data), {
					"Content-Type": "application/json",
				}),
			);
			const jsonData = await response.json();
			if (response.status < 300 || jsonData.success === true) {
				return jsonData;
			}
			throw Error(jsonData);
		} catch (err) {
			Raven.captureException(err);
			throw Error({
				success: false,
				msg: "L'api est inaccessible.",
				erreur: err,
			});
		}
	}

	// get, post, etc. form data (in body) and rerieve JSON.
	// Usage: fetchFormData("POST", "/users", formData);
	async fetchFormData(verb, url, data) {
		try {
			const response = await fetch(
				`${api_url}/${url.replace(/^\//, "")}`,
				this._init(verb, data),
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
	}

	// For legacy reasons, unlike fetchJSON,
	// this function does not fail on 404
	// nor require a `success` status.
	async getJSON(url) {
		try {
			const response = await fetch(
				`${api_url}/${url.replace(/^\//, "")}`,
				this._init("GET"),
			);
			if (response.status === 404) {
				return null;
			}
			if (response.status !== 200) {
				Raven.captureException(response);
				throw Error(
					[
						`Un probleme a été detecté lors de l'enregistrement via l'API.`,
						"Les équipes techniques ont été notifiées.",
						`Status Code: ${response.status}`,
					].join(" "),
				);
			}
			try {
				const data = await response.json();
				return data;
			} catch (err) {
				Raven.captureException(err);
				throw Error("Problème lors de la récupération de la donnée");
			}
		} catch (err) {
			Raven.captureException(JSON.stringify(err));
			throw Error("L'api est inaccessible");
		}
	}
}

export default new request();
