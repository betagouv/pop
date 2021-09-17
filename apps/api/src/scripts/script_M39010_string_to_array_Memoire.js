var notices = db.memoire.find().noCursorTimeout();
var noticeCount = db.memoire.count();
notices.forEach(function( notice ){
	var ref = notice.REF;
	
	//Transformation des champ string to array
	//REG
	var arrayPays = (!Array.isArray(notice.PAYS)) ? notice.PAYS.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.PAYS;

	//REG
	var arrayReg = (!Array.isArray(notice.REG)) ? notice.REG.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.REG;
 
	//DPT
	var arrayDpt = (!Array.isArray(notice.DPT)) ? notice.DPT.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.DPT;
 
	//COM
	var arrayCom = (!Array.isArray(notice.COM)) ? notice.COM.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.COM;
 
	//INSEE
	var arrayInsee = (!Array.isArray(notice.INSEE)) ? notice.INSEE.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.INSEE;
 
	//MCL
	var arrayMcl = (!Array.isArray(notice.MCL)) ? notice.MCL.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.MCL;

	//AUTOEU
	var arrayAutoeu = (!Array.isArray(notice.AUTOEU)) ? notice.AUTOEU.split(';').map((element) => { return  element.trim() } ) : notice.AUTOEU;
 
	//AUTR
	var arrayAutr = (notice.AUTR) ? (!Array.isArray(notice.AUTR)) ? notice.AUTR.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.AUTR : [];
 
	//SCLE
	var arrayScle = (!Array.isArray(notice.SCLE)) ? notice.SCLE.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.SCLE;
 
	//DATOEU
	var arrayDatoeu = (!Array.isArray(notice.DATOEU)) ? notice.DATOEU.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.DATOEU;
 
	//DOM
	var arrayDom = (!Array.isArray(notice.DOM)) ? notice.DOM.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.DOM;
 
	//MCPER
	var arrayMcper = (!Array.isArray(notice.MCPER)) ? notice.MCPER.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.MCPER;
 
	//AUTG
	var arrayAutg = (!Array.isArray(notice.AUTG)) ? notice.AUTG.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.AUTG;
 
	//AUTOR
	var arrayAutor = (!Array.isArray(notice.AUTOR)) ? notice.AUTOR.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.AUTOR;
 
	//COTECOR
	var arrayCotecor = (!Array.isArray(notice.COTECOR)) ? notice.COTECOR.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.COTECOR;
 
	//AUTTI
	var arrayAutti = (!Array.isArray(notice.AUTTI)) ? notice.AUTTI.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.AUTTI;
 
	//AUT
	var arrayAut = (notice.AUT) ?  (!Array.isArray(notice.AUT)) ? notice.AUT.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.AUT : [];
 
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