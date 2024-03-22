const slugify = require("@sindresorhus/slugify");

function slugifyFilename(filename) {
  const extension = filename.split('.').pop();

  return slugify(filename.replace(`.${extension}`, '')) + '.' + extension;
}

module.exports = {slugifyFilename};
