const fs = require('fs');
const path = require('path');

/**
 * Recursively find and replace occurrences of a string in files within a directory.
 * @param {string} searchStr - The string to search for.
 * @param {string} replaceStr - The string to replace with.
 * @param {string} dirPath - The path to the directory.
 */
function findAndReplaceInDir(searchStr, replaceStr, dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error('Error reading the directory:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats:', err);
          return;
        }

        if (stats.isFile()) {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              return;
            }

            if (data.includes(searchStr)) {
              const updatedData = data.replaceAll(new RegExp(searchStr, 'g'), replaceStr);
              fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) {
                  console.error('Error writing file:', err);
                } else {
                  console.log(`Replaced of ${searchStr} occurrences in ${filePath} by ${replaceStr}`);
                }
              });
            }
          });
        } else if (stats.isDirectory()) {
          findAndReplaceInDir(searchStr, replaceStr, filePath);
        }
      });
    });
  });
}

function main() {
  const dir = "./build"
  findAndReplaceInDir("OVERRIDE_API_URL", process.env.API_URL, dir)
  findAndReplaceInDir("OVERRIDE_POP_URL", process.env.POP_URL, dir)
  findAndReplaceInDir("OVERRIDE_BUCKET_URL", process.env.BUCKET_URL, dir)
  findAndReplaceInDir("OVERRIDE_PUBLIC_URL", process.env.PUBLIC_URL, dir)
}

main()
