const notices = db.palissy.find().noCursorTimeout();
let noticeCount = db.palissy.count();

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
	//REG
	const arrayReg = !Array.isArray(notice.REG)
		? cleanData(notice.REG.split(";"))
		: cleanData(notice.REG);

	//DPT
	const arrayDpt = !Array.isArray(notice.DPT)
		? cleanData(notice.DPT.split(";"))
		: cleanData(notice.DPT);

	//DPT_Lettre
	const arrayDpt_Lettre = notice.DPT_LETTRE
		? !Array.isArray(notice.DPT_LETTRE)
			? cleanData(notice.DPT_LETTRE.split(";"))
			: cleanData(notice.DPT_LETTRE)
		: [];

	//COM
	const arrayCom = !Array.isArray(notice.COM)
		? cleanData(notice.COM.split(";"))
		: cleanData(notice.COM);

	//WCOM
	const arrayWcom = !Array.isArray(notice.WCOM)
		? cleanData(notice.WCOM.split(";"))
		: cleanData(notice.WCOM);

	//INSEE
	const arrayInsee = !Array.isArray(notice.INSEE)
		? cleanData(notice.INSEE.split(";"))
		: cleanData(notice.INSEE);

	//COM2
	const arrayCom2 = !Array.isArray(notice.COM2)
		? cleanData(notice.COM2.split(";"))
		: cleanData(notice.COM2);

	//INSEE2
	const arrayInsee2 = !Array.isArray(notice.INSEE2)
		? cleanData(notice.INSEE2.split(";"))
		: cleanData(notice.INSEE2);

	//ATEL
	const arrayAtel = !Array.isArray(notice.ATEL)
		? cleanData(notice.ATEL.split(";"))
		: cleanData(notice.ATEL);

	//Update field REG, DPT, DPT_Lettre, COM, WCOM, INSEE, COM2, INSEE2, ATEL
	db.palissy.update(
		{ REF: ref },
		{
			$set: {
				REG: arrayReg,
				DPT: arrayDpt,
				DPT_LETTRE: arrayDpt_Lettre,
				COM: arrayCom,
				WCOM: arrayWcom,
				INSEE: arrayInsee,
				COM2: arrayCom2,
				INSEE2: arrayInsee2,
				ATEL: arrayAtel,
			},
		},
	);

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});
