var fs = require('fs');
var csvparse = require('csv-parse');
var transform = require('stream-transform');


const param = {}


function parseFile(file, cb) {
	return new Promise((resolve, reject) => {
		let header = null;
		let linesCount = null;
		let counter = 1;
		let linesWithIssues = []

		const input = require('fs').createReadStream(file, 'latin1');

		var lineReader = require('readline').createInterface({ input });

		lineReader.on('line', (line) => {
			const record = line.split('|');
			const obj = {};
			if (!header) {
				header = record;
			} else {
				for (var i = 0; i < record.length; i++) {
					obj[header[i]] = record[i];
				}
				cb(obj);
			}

		});

		input.on('end', () => {
			resolve();
		})
	})
}

async function run() {
	await parseFile('./data/merimee-INV-valid.csv', agregate)
	console.log('END 1')
	await parseFile('./data/merimee-ETAT-valid.csv', agregate)
	console.log('END 2')
	await parseFile('./data/merimee-MH-valid.csv', agregate)
	console.log('END 3')

	const arr = [];
	for (var key in param) {
		arr.push(key)
	}


	fs.writeFileSync('log.json', JSON.stringify(arr), 'latin1');
	console.log('DONE')
}

function agregate(obj) {
	if (obj.DENO) {
		const arr = obj.DENO.split(';');
		for (var i = 0; i < arr.length; i++) {
			const key = arr[i].trim();
			if (key === 'vanne') {
				console.log('obj',obj)
			}

			if (!param[key]) { param[key] = 0; }
			param[key] = param[key] + 1;
		}
	}
}

run();