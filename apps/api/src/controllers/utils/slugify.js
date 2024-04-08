const slugify = require("@sindresorhus/slugify");

function splitFilename(filename) {
	// Find the last occurrence of the dot character in the filename
	const dotIndex = filename.lastIndexOf(".");

	// If there is no dot, or it is the first character (hidden files without extension in Unix-like systems),
	// consider the entire string as the filename with no extension
	if (dotIndex < 1) {
		return { name: filename, extension: "" };
	}

	// Split the filename into the base name and the extension
	const name = filename.substring(0, dotIndex);
	const extension = filename.substring(dotIndex + 1);

	return { name, extension };
}

function slugifyFilename(path) {
	const { name, extension } = splitFilename(path);

	if (extension !== "") {
		return `${slugify(name)}.${extension}`;
	}
	return `${slugify(name)}`;
}

module.exports = { slugifyFilename };
