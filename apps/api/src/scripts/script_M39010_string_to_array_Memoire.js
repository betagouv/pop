var notices = db.memoire.find().noCursorTimeout();
var noticeCount = db.memoire.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	
	//Transformation des champ string to array
	//REG
	var arrayPays = (!Array.isArray(notice.PAYS)) ? notice.PAYS.split(';').map((element) => { return element.trim() !== "" }) : notice.PAYS;

	//REG
	var arrayReg = (!Array.isArray(notice.REG)) ? notice.REG.split(';').map((element) => { return element.trim() !== "" }) : notice.REG;
 
	//DPT
	var arrayDpt = (!Array.isArray(notice.DPT)) ? notice.DPT.split(';').map((element) => { return element.trim() !== "" }) : notice.DPT;
 
	//COM
	var arrayCom = (!Array.isArray(notice.COM)) ? notice.COM.split(';').map((element) => { return element.trim() !== "" }) : notice.COM;
 
	//INSEE
	var arrayInsee = (!Array.isArray(notice.INSEE)) ? notice.INSEE.split(';').map((element) => { return element.trim() !== "" }) : notice.INSEE;
 
	//MCL
	var arrayMcl = (!Array.isArray(notice.MCL)) ? notice.MCL.split(';').map((element) => { return element.trim() !== "" }) : notice.MCL;

	//AUTOEU
	var arrayAutoeu = (!Array.isArray(notice.AUTOEU)) ? notice.AUTOEU.split(';').map((element) => { return element.trim() !== "" }) : notice.AUTOEU;
 
	//AUTR
	var arrayAutr = (!Array.isArray(notice.AUTR)) ? notice.AUTR.split(';').map((element) => { return element.trim() !== "" }) : notice.AUTR;
 
	//SCLE
	var arrayScle = (!Array.isArray(notice.SCLE)) ? notice.SCLE.split(';').map((element) => { return element.trim() !== "" }) : notice.SCLE;
 
	//DATOEU
	var arrayDatoeu = (!Array.isArray(notice.DATOEU)) ? notice.DATOEU.split(';').map((element) => { return element.trim() !== "" }) : notice.DATOEU;
 
	//DOM
	var arrayDom = (!Array.isArray(notice.DOM)) ? notice.DOM.split(';').map((element) => { return element.trim() !== "" }) : notice.DOM;
 
	//MCPER
	var arrayMcper = (!Array.isArray(notice.MCPER)) ? notice.MCPER.split(';').map((element) => { return element.trim() !== "" }) : notice.MCPER;
 
	//AUTG
	var arrayAutg = (!Array.isArray(notice.AUTG)) ? notice.AUTG.split(';').map((element) => { return element.trim() !== "" }) : notice.AUTG;
 
	//AUTOR
	var arrayAutor = (!Array.isArray(notice.AUTOR)) ? notice.AUTOR.split(';').map((element) => { return element.trim() !== "" }) : notice.AUTOR;
 
	//COTECOR
	var arrayCotecor = (!Array.isArray(notice.COTECOR)) ? notice.COTECOR.split(';').map((element) => { return element.trim() !== "" }) : notice.COTECOR;
 
	//AUTTI
	var arrayAutti = (!Array.isArray(notice.AUTTI)) ? notice.AUTTI.split(';').map((element) => { return element.trim() !== "" }) : notice.AUTTI;
 
	//AUT
	var arrayAut = (!Array.isArray(notice.AUT)) ? notice.AUT.split(';').map((element) => { return element.trim() !== "" }) : notice.AUT;
 
	//Update field REG, DPT, DPT_Lettre, COM, WCOM, INSEE, COM2, INSEE2, ATEL
	db.memoire.update(
		{ REF : ref},
		{
			$set : {
				PAYS: arrayPays,
				REG:  arrayReg,
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
				AUT: arrayAut
			}
		}
	)	
	
	noticeCount--;
	print(noticeCount + " notices restantes");
	
})