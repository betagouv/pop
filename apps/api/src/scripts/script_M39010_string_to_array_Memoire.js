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
	//REG
	const arrayPays = !Array.isArray(notice.PAYS)
		? cleanData(notice.PAYS.split(";"))
		: cleanData(notice.PAYS);

	//REG
	const arrayReg = !Array.isArray(notice.REG)
		? cleanData(notice.REG.split(";"))
		: cleanData(notice.REG);

	//DPT
	const arrayDpt = !Array.isArray(notice.DPT)
		? cleanData(notice.DPT.split(";"))
		: cleanData(notice.DPT);

	//COM
	const arrayCom = !Array.isArray(notice.COM)
		? cleanData(notice.COM.split(";"))
		: cleanData(notice.COM);

	//INSEE
	const arrayInsee = !Array.isArray(notice.INSEE)
		? cleanData(notice.INSEE.split(";"))
		: cleanData(notice.INSEE);

	//MCL
	const arrayMcl = !Array.isArray(notice.MCL)
		? cleanData(notice.MCL.split(";"))
		: cleanData(notice.MCL);

	//AUTOEU
	const arrayAutoeu = !Array.isArray(notice.AUTOEU)
		? cleanData(notice.AUTOEU.split(";"))
		: cleanData(notice.AUTOEU);

	//AUTR
	const arrayAutr = notice.AUTR
		? !Array.isArray(notice.AUTR)
			? cleanData(notice.AUTR.split(";"))
			: cleanData(notice.AUTR)
		: [];

	//SCLE
	const arrayScle = !Array.isArray(notice.SCLE)
		? cleanData(notice.SCLE.split(";"))
		: cleanData(notice.SCLE);

	//DATOEU
	const arrayDatoeu = !Array.isArray(notice.DATOEU)
		? cleanData(notice.DATOEU.split(";"))
		: cleanData(notice.DATOEU);

	//DOM
	const arrayDom = !Array.isArray(notice.DOM)
		? cleanData(notice.DOM.split(";"))
		: cleanData(notice.DOM);

	//MCPER
	const arrayMcper = !Array.isArray(notice.MCPER)
		? cleanData(notice.MCPER.split(";"))
		: cleanData(notice.MCPER);

	//AUTG
	const arrayAutg = !Array.isArray(notice.AUTG)
		? cleanData(notice.AUTG.split(";"))
		: cleanData(notice.AUTG);

	//AUTOR
	const arrayAutor = !Array.isArray(notice.AUTOR)
		? cleanData(notice.AUTOR.split(";"))
		: cleanData(notice.AUTOR);

	//COTECOR
	const arrayCotecor = !Array.isArray(notice.COTECOR)
		? cleanData(notice.COTECOR.split(";"))
		: cleanData(notice.COTECOR);

	//AUTTI
	const arrayAutti = !Array.isArray(notice.AUTTI)
		? cleanData(notice.AUTTI.split(";"))
		: cleanData(notice.AUTTI);

	//AUT
	const arrayAut = notice.AUT
		? !Array.isArray(notice.AUT)
			? cleanData(notice.AUT.split(";"))
			: cleanData(notice.AUT)
		: [];

	//Update field REG, DPT, DPT_Lettre, COM, WCOM, INSEE, COM2, INSEE2, ATEL
	db.memoire.update(
		{ REF: ref },
		{
			$set: {
				PAYS: arrayPays,
				REG: arrayReg,
				DPT: arrayDpt,
				COM: arrayCom,
				INSEE: arrayInsee,
				MCL: arrayMcl,
				AUTOEU: arrayAutoeu,
				AUTR: arrayAutr,
				SCLE: arrayScle,
				DATOEU: arrayDatoeu,
				DOM: arrayDom,
				MCPER: arrayMcper,
				AUTG: arrayAutg,
				AUTOR: arrayAutor,
				COTECOR: arrayCotecor,
				AUTTI: arrayAutti,
				AUT: arrayAut,
			},
		},
	);

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});
