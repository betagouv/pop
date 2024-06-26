import Parse from "csv-parse/lib/es5";
import XLSX from "xlsx";

function readFile(file, encoding, cb) {
	const reader = new FileReader();
	reader.onload = () => {
		cb(reader.result);
	};
	reader.onabort = () => console.log("file reading was aborted");
	reader.onerror = () => console.log("file reading has failed");
	reader.readAsText(file, encoding || "ISO-8859-1");
}

function asyncReadFile(file, encoding) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onabort = () => reject("file reading was aborted");
		reader.onerror = () => reject("file reading has failed");
		reader.readAsText(file, encoding || "ISO-8859-1");
	});
}

function readODS(file, encoding) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const workbook = XLSX.read(reader.result, {
				type: "binary",
			});
			workbook.SheetNames.forEach((sheetName) => {
				const XL_row_object = XLSX.utils.sheet_to_json(
					workbook.Sheets[sheetName],
					{
						raw: true,
						defval: "",
					},
				);
				resolve(XL_row_object);
			});
		};
		reader.onabort = () => console.log("file reading was aborted");
		reader.onerror = () => console.log("file reading has failed");
		reader.readAsBinaryString(file);
	});
}

function readXML(file, encoding) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(reader.result, "text/xml");
			resolve(xmlDoc);
		};
		reader.onabort = () => console.log("file reading was aborted");
		reader.onerror = () => console.log("file reading has failed");
		reader.readAsText(file, encoding || "utf-8");
	});
}

function checkEncodingIssue(notices) {
	const encodingCaracters = ["Ã¨", "�"];
	for (let j = 0; j < notices.length; j++) {
		for (const key in notices[j]) {
			if (Object.hasOwn(notices[j], key)) {
				const str = JSON.stringify(notices[j][key]);
				for (let i = 0; str && i < encodingCaracters.length; i++) {
					if (str.indexOf(encodingCaracters[i]) !== -1) {
						return `Il semble que vous n'ayez pas selectionné le bon encodage.\nUn problème d'encodage a été détecté sur cette donnée : \n${str}`;
					}
				}
			}
		}
	}
	return null;
}

async function readCSV(file, delimiter, encoding, quote) {
	if (!file) {
		return [];
	}
	const res = await asyncReadFile(file, encoding);
	const parser = Parse({
		delimiter: delimiter,
		from: 1,
		quote: quote || "",
		relax_column_count: true,
	});

	return new Promise((resolve, reject) => {
		const output = [];
		let record = null;
		let header = null;

		parser.on("readable", () => {
			// biome-ignore lint/suspicious/noAssignInExpressions: temp before re-write
			while ((record = parser.read())) {
				// Delete empty lines.
				if (!record.join("").trim()) {
					continue;
				}

				if (!header) {
					header = [].concat(record);
					continue;
				}
				const obj = {};
				record.map((e, i) => {
					obj[header[i]] = e;
				});
				output.push(obj);
			}
		});

		// Catch any error
		parser.on("error", (err) => {
			reject(err.message);
		});

		// When we are done, test that the parsed output matched what expected
		parser.on("finish", () => {
			resolve(output);
		});

		parser.write(res);
		parser.end();
	});
}

function parseAjoutPilote(res, object) {
	const str = res.replace(/\-\r\n/g, "");
	const lines = str.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
	const notices = [];
	let obj = {};
	for (let i = 0; i < lines.length; i++) {
		if (lines[i] === "//") {
			notices.push(obj);
			obj = {};
		} else {
			const key = lines[i].trim();
			let value = "";
			let tag = true;
			while (tag) {
				value += lines[++i];
				if (
					!(
						lines[i + 1] &&
						lines[i + 1] !== "//" &&
						object &&
						!object.has(lines[i + 1])
					)
				) {
					tag = false;
				}
			}
			if (key) {
				obj[key] = value;
			}
		}
	}
	if (Object.keys(obj).length) {
		notices.push(obj);
	}
	return notices;
}

function renameFile(file, newName) {
	let newFile = null;
	try {
		newFile = new File([file], newName, { type: file.type });
	} catch (err) {
		newFile = new Blob([file], { type: "image/jpeg" });
		newFile.name = newName;
	}
	return newFile;
}

function formatDate(d = new Date()) {
	const months = [
		"janvier",
		"février",
		"mars",
		"avril",
		"mai",
		"juin",
		"juillet",
		"août",
		"septembre",
		"octobre",
		"novembre",
		"decembre",
	];
	const date = `0${d.getDate()}`.slice(-2);
	const month = months[d.getMonth()];
	const year = d.getFullYear();
	const minutes = `0${d.getMinutes()}`.slice(-2);
	const hours = `0${d.getHours()}`.slice(-2);

	return `${date} ${month} ${year}, ${hours}h${minutes}`;
}

export default {
	readFile,
	asyncReadFile,
	readXML,
	readCSV,
	readODS,
	parseAjoutPilote,
	renameFile,
	formatDate,
	checkEncodingIssue,
};
