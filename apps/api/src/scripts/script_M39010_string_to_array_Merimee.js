const notices = db.merimee.find().noCursorTimeout();
let noticeCount = db.merimee.count();

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

	//DPT_LETTRE
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

	//Update fields REG, DPT, DPT_Lettre, COM, WCOM, INSEE
	db.merimee.update(
		{ REF: ref },
		{
			$set: {
				REG: arrayReg,
				DPT: arrayDpt,
				DPT_LETTRE: arrayDpt_Lettre,
				COM: arrayCom,
				WCOM: arrayWcom,
				INSEE: arrayInsee,
			},
		},
	);

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});
