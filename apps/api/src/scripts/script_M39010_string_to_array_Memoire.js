var notices = db.memoire.find().noCursorTimeout();
var noticeCount = db.memoire.count();

function cleanData(array){
    return array.map((element) => { return  element.trim() } ).filter((element) => element !== "" );
}

notices.forEach(function( notice ){
	var ref = notice.REF;
	
	//Transformation des champ string to array
	//REG
	var arrayPays = (!Array.isArray(notice.PAYS)) ? cleanData(notice.PAYS.split(';')) : cleanData(notice.PAYS);

	//REG
	var arrayReg = (!Array.isArray(notice.REG)) ? cleanData(notice.REG.split(';')) : cleanData(notice.REG);
 
	//DPT
	var arrayDpt = (!Array.isArray(notice.DPT)) ? cleanData(notice.DPT.split(';')) : cleanData(notice.DPT);
 
	//COM
	var arrayCom = (!Array.isArray(notice.COM)) ? cleanData(notice.COM.split(';')) : cleanData(notice.COM);
 
	//INSEE
	var arrayInsee = (!Array.isArray(notice.INSEE)) ? cleanData(notice.INSEE.split(';')) : cleanData(notice.INSEE);
 
	//MCL
	var arrayMcl = (!Array.isArray(notice.MCL)) ? cleanData(notice.MCL.split(';')) : cleanData(notice.MCL);

	//AUTOEU
	var arrayAutoeu = (!Array.isArray(notice.AUTOEU)) ? cleanData(notice.AUTOEU.split(';')) : cleanData(notice.AUTOEU);
 
	//AUTR
	var arrayAutr = (notice.AUTR) ? (!Array.isArray(notice.AUTR)) ? cleanData(notice.AUTR.split(';')) : cleanData(notice.AUTR) : [];
 
	//SCLE
	var arrayScle = (!Array.isArray(notice.SCLE)) ? cleanData(notice.SCLE.split(';')) : cleanData(notice.SCLE);
 
	//DATOEU
	var arrayDatoeu = (!Array.isArray(notice.DATOEU)) ? cleanData(notice.DATOEU.split(';')) : cleanData(notice.DATOEU);
 
	//DOM
	var arrayDom = (!Array.isArray(notice.DOM)) ? cleanData(notice.DOM.split(';')) : cleanData(notice.DOM);
 
	//MCPER
	var arrayMcper = (!Array.isArray(notice.MCPER)) ? cleanData(notice.MCPER.split(';')) : cleanData(notice.MCPER);
 
	//AUTG
	var arrayAutg = (!Array.isArray(notice.AUTG)) ? cleanData(notice.AUTG.split(';')) : cleanData(notice.AUTG);
 
	//AUTOR
	var arrayAutor = (!Array.isArray(notice.AUTOR)) ? cleanData(notice.AUTOR.split(';')) : cleanData(notice.AUTOR);
 
	//COTECOR
	var arrayCotecor = (!Array.isArray(notice.COTECOR)) ? cleanData(notice.COTECOR.split(';')) : cleanData(notice.COTECOR);
 
	//AUTTI
	var arrayAutti = (!Array.isArray(notice.AUTTI)) ? cleanData(notice.AUTTI.split(';')) : cleanData(notice.AUTTI);
 
	//AUT
	var arrayAut = (notice.AUT) ?  (!Array.isArray(notice.AUT)) ? cleanData(notice.AUT.split(';')) : cleanData(notice.AUT) : [];
 
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