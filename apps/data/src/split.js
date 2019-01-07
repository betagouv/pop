const csvSplitStream = require('csv-split-stream');
const fs = require('fs');

csvSplitStream
  .split(
    fs.createReadStream('./storage/joconde.csv'),
    { lineLimit: 300000 },
    index => fs.createWriteStream(`./storage/joconde-${index}.csv`)
  )
  .then(csvSplitResponse => {
    console.log('csvSplitStream succeeded.', csvSplitResponse);
  })
  .catch(csvSplitError => {
    console.log('csvSplitStream failed!', csvSplitError);
  });
