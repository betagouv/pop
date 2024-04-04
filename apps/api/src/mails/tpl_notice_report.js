const { formatDate } = require("../controllers/utils/date");

/**
 * Liste des personnes à contacter pour chaque collection
 */
const CONTACT_LIST = {
	enluminures: "wilfried.muller@culture.gouv.fr",
	memoire: "anne.cook@culture.gouv.fr",
	"monuments-historiques": "antonella.rotolo@culture.gouv.fr",
	mnr: "isabelle.rouge-ducos@culture.gouv.fr",
	inventaire:
		"jean.davoigneau@culture.gouv.fr ; ines.graillat@culture.gouv.fr",
	joconde:
		"sophie.daenens@culture.gouv.fr et angelina.meslem@culture.gouv.fr",
};

/**
 * Création du template de mail pour les rapports d'import
 * @param {Object} params
 * @returns
 */
function generateTemplateReport(params) {
	const {
		importedNotices,
		collection,
		email,
		institution,
		importId,
		fileNames,
	} = params;

	let arr = [];
	let header = [];
	// Ajout du Header
	if (
		params.collection !== "joconde" &&
		params.collection !== "enluminures"
	) {
		header = addHeader(collection, institution, email, fileNames);
	} else {
		header = addHeader(collection, institution, email);
	}
	arr = [arr, ...header];

	// Ajout du body
	arr = [...arr, ...addCommonBody(importedNotices)];

	if (params.collection === "joconde") {
		arr = [...arr, ...addJocondeReport(importedNotices)];
	} else if (params.collection !== "enluminures") {
		arr = [...arr, ...addReport(importedNotices)];
	}

	// Ajout du footer
	arr = [...arr, ...addFooter(importId)];

	return arr.join("");
}

/**
 * Ajout du complément pour l'import Joconde
 * @param {Object} notices
 * @returns
 */
function addJocondeReport(notices) {
	let arr = [];
	let obj = {};
	let count = 0;

	const URL = `${process.env.POP_URL}/notice/joconde/`;

	for (let i = 0; i < notices.length; i++) {
		for (let j = 0; j < notices[i]._warnings.length; j++) {
			count++;
			if (obj[notices[i]._warnings[j]] !== undefined) {
				obj[notices[i]._warnings[j]].count =
					obj[notices[i]._warnings[j]].count + 1;
				obj[notices[i]._warnings[j]].notices.push(
					`<a href="${URL}${notices[i].REF}">${notices[i].REF}<a/> (${notices[i].INV})`,
				);
			} else {
				obj[notices[i]._warnings[j]] = {
					count: 1,
					notices: [
						`<a href="${URL}${notices[i].REF}">${notices[i].REF}<a/> (${notices[i].INV})`,
					],
				};

				let idThesaurus = notices[i]._warnings[j].substr(
					notices[i]._warnings[j].indexOf(")]") - 3,
					3,
				);
				if (!Number.isNaN(parseInt(idThesaurus))) {
					obj[notices[i]._warnings[j]].idThesaurus = idThesaurus;
				}
			}
		}
	}

	const newObj = Object.entries(obj)
		.sort(function (a, b) {
			// Compare
			if (a[1].idThesaurus < b[1].idThesaurus) return -1;
			if (a[1].idThesaurus > b[1].idThesaurus) return 1;
			return 0;
		})
		.reduce((a, key) => {
			a[key[0]] = obj[key[0]];
			return a;
		}, {});

	obj = newObj;

	const urlOpenTheso = "https://opentheso.huma-num.fr/opentheso/";

	arr.push(`<p>${count} avertissement(s) dont : </p>`);
	arr.push(`<ul>`);
	for (let key in obj) {
		const count = obj[key].count;
		const nots = obj[key].notices;
		const { terme, champ, thesaurus } = regexIt(key);

		// Mantis 38569 - Ajout condition pour avoir le vrai message si le champ n'est pas un thesaurus (et non plus des champs undefined)
		if (terme !== undefined) {
			arr.push(
				`<li>${count} sur le terme <strong>${terme}</strong> du champ <strong>${champ}</strong> est non conforme au thésaurus <strong>${thesaurus}</strong> :</li>`,
			);
		} else {
			if (key !== undefined) {
				const libRefus = "ne fait pas partie du thésaurus";
				const arrayKey = key.split(/[\[\]]/g);

				if (arrayKey.length < 2) {
					continue;
				}

				const val = arrayKey[1];
				const autoriteThesaurus = arrayKey[3];

				// Mise en gras des valeurs saisies qui posent problème sur le Thésaurus.
				key = key.replace(`[${val}]`, `[<strong>${val}</strong>]`);

				// Mise en place du lien cliquable pour les référentiels thesaurus
				const idthesaurus = autoriteThesaurus.split(/[()]/g)[1];
				key = key.replace(
					`[${autoriteThesaurus}]`,
					`<a href="${urlOpenTheso}?idt=${idthesaurus}">${autoriteThesaurus}</a>`,
				);

				// Si des propositions ont été trouvé, alors on met les propositions en caractères gras
				if (arrayKey[5]) {
					const listProposition = arrayKey[5]
						.split(" ou ")
						.filter((element) => element !== "")
						.map((element) => `<strong>${element}</strong>`)
						.join(" ou ");
					key = key.replace(
						`[${arrayKey[5]}]`,
						`[${listProposition}]`,
					);
				}
			}

			arr.push(`<li>${count} avec pour message "${key}" :</li>`);
		}
		arr.push(`<ul>`);
		arr.push(...nots.map((e) => `<li>${e}</li>`));
		arr.push(`</ul>`);
	}

	arr.push(`</ul>`);

	return arr;
}

/**
 * Retourne le Header dans le mail
 * @param {String} collection
 * @param {String} institution
 * @param {String} email
 * @returns Array
 */
function addHeader(collection, institution, email, fileNames = []) {
	const contact = CONTACT_LIST[collection] || "";
	const arr = [];
	arr.push(`<h1>Rapport de chargement ${collection} du ${formatDate()}</h1>`);
	arr.push(`<h2>Établissement : ${institution}</h2>`);
	arr.push(`<h2>Producteur : ${email}</h2>`);
	arr.push(`<h2>Contact : ${contact}</h2>`);

	if (fileNames.length > 0) {
		arr.push(`<h2>Fichier(s) importé(s) :</h2>`);
		arr.push(`<ul>`);
		arr.push(...fileNames.map((e) => `<li>${e}</li>`));
		arr.push(`</ul>`);
	}
	return arr;
}

/**
 * Retourne le body commun entre les templates de mail
 * @param {Object} notices
 * @returns Array
 */
function addCommonBody(notices) {
	let arr = [];
	const created = notices.filter((e) => e._status === "created");
	const updated = notices.filter((e) => e._status === "updated");
	const rejected = notices.filter((e) => e._status === "rejected");

	const imagesNumber = notices.reduce((acc, val) => {
		if (val._status === "created" || val._status === "updated") {
			return acc + val._files.length;
		}
		return acc;
	}, 0);

	arr.push(`<p>Nombre de notices chargées: ${notices.length}</p>`);
	arr.push(`<ul>`);
	arr.push(
		`<li>${notices.length - rejected.length} notice(s) valide(s)</li>`,
	);
	arr.push(`<li style="list-style-type:none">`);
	arr.push(`<ul>`);
	arr.push(`<li>${created.length} notice(s) créée(s)</li>`);
	arr.push(`<li>${updated.length} notice(s) mise(s) à jour</li>`);
	arr.push(
		`<li>${
			notices.length - rejected.length - created.length - updated.length
		} notice(s) importée(s) sans mise à jour</li>`,
	);
	arr.push(`<li>${imagesNumber} image(s) chargée(s)</li>`);
	arr.push(`</ul>`);
	arr.push(`</li >`);
	arr.push(`<li>${rejected.length} notice(s) rejetée(s)</li>`);
	arr.push(`</ul>`);

	return arr;
}

/**
 * Retourne le footer
 * @param {String} importId
 * @returns Array
 */
function addFooter(importId) {
	const arr = [];
	const diffUrl = `${process.env.POP_URL}/search/list?import=["${importId}"]`;
	const fileUrl = `${process.env.BUCKET_URL}import/${importId}/import.csv`;
	arr.push(`<h1>Liens</h1>`);
	arr.push(
		`<a href='${diffUrl}'>Consulter les notices en diffusion</a><br/>`,
	);
	arr.push(`<a href='${fileUrl}'>Télécharger le détail de l'import</a>`);
	return arr;
}

/**
 * Retourne la mise en forme pour les templates de mail sauf Joconde et Enluminures
 * @param {Object} notices
 * @returns
 */
function addReport(notices) {
	const fieldToExport = [{ name: "Identifiant", key: "REF" }];
	const arr = [];
	const created = notices.filter((e) => e._status === "created");
	const updated = notices.filter((e) => e._status === "updated");
	const rejected = notices.filter((e) => e._status === "rejected");
	arr.push(`<h1>Notices créées</h1>`);
	{
		const columns = [
			...fieldToExport.map((e) => e.name),
			"Etat",
			"Details",
		];
		const lines = [];
		for (var i = 0; i < created.length; i++) {
			const fields = fieldToExport.map((e) => `"${created[i][e.key]}"`);
			lines.push([...fields, "Création", ""]);
			for (var j = 0; j < created[i]._warnings.length; j++) {
				lines.push([
					...fields,
					"Avertissement",
					created[i]._warnings[j],
				]);
			}
		}
		const table = createHTMLTable(columns, lines);
		arr.push(...table);
	}
	{
		arr.push(`<h1>Notices modifiées</h1>`);
		const columns = [
			...fieldToExport.map((e) => e.name),
			"Etat",
			"Details",
		];
		const lines = [];
		for (var i = 0; i < updated.length; i++) {
			const fields = fieldToExport.map((e) => `"${updated[i][e.key]}"`);
			lines.push([...fields, "Modification", ""]);
			for (var j = 0; j < updated[i]._warnings.length; j++) {
				lines.push([
					...fields,
					"Avertissement",
					updated[i]._warnings[j],
				]);
			}
		}
		const table = createHTMLTable(columns, lines);
		arr.push(...table);
	}
	{
		arr.push(`<h1>Notices rejetées</h1>`);
		const columns = [
			...fieldToExport.map((e) => e.name),
			"Etat",
			"Details",
		];
		const lines = [];
		for (const rejection of rejected) {
			const fields = fieldToExport.map((e) => `"${rejection[e.key]}"`);

			lines.push([...fields, "Rejet", ""]);
			if (rejection._warnings != null) {
				for (const warning of rejection._warnings) {
					lines.push([...fields, "Avertissement", warning]);
				}
			}

			if (rejection._errors != null) {
				for (const error of rejection._errors) {
					lines.push([...fields, "Erreur", error]);
				}
			}
		}

		const table = createHTMLTable(columns, lines);
		arr.push(...table);
	}
	return arr.join("");
}

/**
 * Fonction utilisée pour les templates de mail sauf Joconde et Enluminures
 * @param {Array} columns
 * @param {Array} objs
 * @returns
 */
function createHTMLTable(columns, objs) {
	if (!objs.length) {
		return ["<div >Aucune</div>"];
	}
	const arr = [];
	arr.push(
		`<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">`,
	);
	arr.push(`<tr>`);
	arr.push(
		...columns.map(
			(e) =>
				`<th style="font-family:Arial, Helvetica, sans-serif; font-size:14px;border:1px solid black;">${e}</th>`,
		),
	);
	arr.push(`</tr>`);
	arr.push(
		...objs.map((line) => {
			const arr2 = [];
			arr2.push("<tr>");
			arr2.push(
				line
					.map(
						(d) =>
							`<td style="font-family:Arial, Helvetica, sans-serif; padding: 10px; font-size:14px;border:1px solid black;">${d}</td>`,
					)
					.join(""),
			);
			arr2.push("</tr>");
			return arr2.join("");
		}),
	);
	arr.push(`</table > `);
	return arr;
}

/**
 * Fonction utilisée pour le template Joconde
 * @param {String} str
 * @returns
 */
function regexIt(str) {
	const arr = [];
	const regex =
		/Le champ (.+) avec la valeur (.+) n'est pas conforme avec le thesaurus http:\/\/data\.culture\.fr\/thesaurus\/resource\/ark:\/(.+)/gm;
	let m;

	while ((m = regex.exec(str)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}

		// The result can be accessed through the `m`-variable.
		m.forEach((match, groupIndex) => {
			arr.push(match);
		});
	}

	return { terme: arr[2], champ: arr[1], thesaurus: arr[3] };
}

module.exports = {
	generateTemplateReport,
};
