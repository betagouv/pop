const { ovh } = require("../../config");

const mappings = {
	properties: {
		created: {
			type: "long",
		},
		email: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
			},
		},
		importedAt: {
			type: "date",
		},
		institution: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
			},
		},
		rejected: {
			type: "long",
		},
		unChanged: {
			type: "long",
		},
		updated: {
			type: "long",
		},
		user: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
			},
		},
	},
};

module.exports = {
	mappings: ovh ? mappings : { import: mappings },
};
