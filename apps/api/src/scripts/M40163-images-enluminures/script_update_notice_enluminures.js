require("dotenv").config();
require("../../mongo");
const fs = require("fs");
const Enluminures = require("../../models/enluminures");
const csv = require("csv");
const { pathFileCsv, nameFileLog } = require("./utils");
const { exit } = require("process");
const { Observable } = require("rxjs/internal/Observable");
const { async } = require("rxjs/internal/scheduler/async");

let counter = 0;
const limit = 2000;

// Récupère les notices Enluminures a mettre à jour
async function readCsv() {
	let noticesEnluminures = [];
	let chunk;
	let i = 0;

	// vidage des logs précédent
	fs.access(nameFileLog, (err) => {
		if (!err) {
			fs.truncate(nameFileLog, 0);
		}
	});

	const stream = fs
		.createReadStream(pathFileCsv)
		.pipe(csv.parse({ delimiter: ";" }));

	const arrayObj = [];

	stream.on("readable", () => {
		while ((chunk = stream.read()) != null) {
			if (i > 0) {
				const REF = chunk[1].split("/")[1];
				if (arrayObj[REF]) {
					if (!arrayObj[REF].includes(chunk[1])) {
						arrayObj[REF] = [...arrayObj[REF], chunk[1]];
					}
				} else {
					arrayObj[REF] = [chunk[1]];
				}
			}
			i++;
		}
	});

	stream.on("end", () => {
		noticesEnluminures = Object.keys(arrayObj);
		console.log(
			"lecture terminée",
			"nombre element : " + noticesEnluminures.length,
		);

		let arrayUpdate = [];
		const i = 0;
		noticesEnluminures.forEach(async (ref) => {
			// Préparation du tableau pour le bulk
			// Récupération de la notice
			const notice = await Enluminures.findOne(
				{ REF: ref },
				{ REF: 1, VIDEO: 1 },
			);

			const clearNoticeVideo = [];
			notice.VIDEO.forEach((element) => {
				if (!clearNoticeVideo.includes(element)) {
					clearNoticeVideo.push(element);
				}
			});

			if (notice) {
				const noticeVIDEO = [
					...clearNoticeVideo,
					...arrayObj[ref].filter((el) => !notice.VIDEO.includes(el)),
				];
				const contientImage = noticeVIDEO.length > 0 ? "oui" : "non";

				arrayUpdate.push({
					updateOne: {
						filter: { REF: ref },
						// La mise à jour ajoute un élément dans le tableau VIDEO, pour réexécuter le script, il faut vider de champ avant VIDEO: []
						update: {
							VIDEO: noticeVIDEO,
							CONTIENT_IMAGE: contientImage,
						},
					},
				});
			}

			// Traitement par lot suivant le limite définit
			if (i % limit === 0 || i == noticesEnluminures.length) {
				updateNotices(arrayUpdate).then((res) => {
					return new Observable((observer) => {
						observer.next(res + " notices traitées");

						if (noticesEnluminures.length === res || res === 0) {
							console.log("mise à jour terminé");
							//  exit(1);
						}
					}).subscribe((message) => console.log(message));
				});
				arrayUpdate = [];
			}
		});
	});
	return false;
}

function updateNotices(noticesEnluminures) {
	return new Promise((resolve) => {
		let errorFind = false;

		do {
			if (noticesEnluminures.length > 0) {
				Enluminures.bulkWrite(noticesEnluminures)
					.then((res) => {
						counter += res.modifiedCount;
						errorFind = false;
						resolve(counter);
					})
					.catch((err) => {
						console.log("erreur", err);
						// Cas des duplications de clé REF
						console.log(
							"-----------------------REF :" + err.op.q.REF,
						);
						fs.writeFileSync(
							nameFileLog,
							"REF : " +
								err.op.q.REF +
								" MESSAGE : " +
								err.errmsg +
								"\n",
							{ flag: "a+" },
						);

						// Suppression de la ligne qui est en erreur pour poursuivre le traitement
						noticesEnluminures = noticesEnluminures.filter(
							(notice) =>
								notice.updateOne.filter.REF != err.op.q.REF,
						);
						errorFind = true;
					});
			} else {
				errorFind = false;
				console.log("terminé");
			}
		} while (errorFind);
	});
}

readCsv();
