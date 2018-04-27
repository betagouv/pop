var fs = require('fs');
var csvparse = require('csv-parse');
var transform = require('stream-transform');

// var parser = csvparse({ delimiter: '|', from: 1, quote: '' })
// var input = fs.createReadStream('./data/test.csv','latin1');
// var transformer = transform(function(record, callback){
//     callback(null, record.join(' ') + '\n');
// }, {parallel: 1});
// input.pipe(parser).pipe(transformer).pipe(process.stdout);


const str = '<A HREF="mailto:mediatheque.dapa@culture.gouv.fr?Subject=Contact base MERIMEE&body=Bonjour, %0D%0A%0D%0A">Contact service producteur</A>'
var regex = /(?<=mailto:)\s*[\w\d._@]*/
var result = str.match(regex);

console.log('SDSQD', result)