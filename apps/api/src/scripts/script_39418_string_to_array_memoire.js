const notices = db.memoire.find().noCursorTimeout();
let noticeCount = db.memoire.count();

function cleanData(array) {
	return array
		.map((element) => {
			return element.trim();
		})
		.filter((element) => element !== "");
}

notices.forEach((notice) => {
	const ref = notice.REF;

	//Transformation des champ string to array
	//DPT_LETTRE
	const arrayDPTLETTRE = !Array.isArray(notice.DPT_LETTRE)
		? cleanData(notice.DPT_LETTRE.split(";"))
		: cleanData(notice.DPT_LETTRE);

	//WCOM
	const arrayWCOM = !Array.isArray(notice.WCOM)
		? cleanData(notice.WCOM.split(";"))
		: cleanData(notice.WCOM);

	//ADRESSE
	const arrayADRESSE = !Array.isArray(notice.ADRESSE)
		? cleanData(notice.ADRESSE.split(";"))
		: cleanData(notice.ADRESSE);

	//WARDS
	const arrayWADRS = !Array.isArray(notice.WADRS)
		? cleanData(notice.WADRS.split(";"))
		: cleanData(notice.WADRS);

	//SERIE
	const arraySERIE = !Array.isArray(notice.SERIE)
		? cleanData(notice.SERIE.split(";"))
		: cleanData(notice.SERIE);

	//Update field REG, DPT, DPT_Lettre, COM, WCOM, INSEE, COM2, INSEE2, ATEL
	db.memoire.update(
		{ REF: ref },
		{
			$set: {
				DPT_LETTRE: arrayDPTLETTRE,
				WCOM: arrayWCOM,
				ADRESSE: arrayADRESSE,
				WADRS: arrayWADRS,
				SERIE: arraySERIE,
			},
		},
	);

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});
