var notices = db.memoire.find().noCursorTimeout();
var noticeCount = db.memoire.count();

function cleanData(array){
    return array.map((element) => { return  element.trim() } ).filter((element) => element !== "" );
}

notices.forEach(function( notice ){
	var ref = notice.REF;
	
	//Transformation des champ string to array
	//DPT_LETTRE
	var arrayDPTLETTRE = (!Array.isArray(notice.DPT_LETTRE)) ? cleanData(notice.DPT_LETTRE.split(';')) : cleanData(notice.DPT_LETTRE);

	//WCOM
	var arrayWCOM = (!Array.isArray(notice.WCOM)) ? cleanData(notice.WCOM.split(';')) : cleanData(notice.WCOM);
 
	//ADRESSE
	var arrayADRESSE = (!Array.isArray(notice.ADRESSE)) ? cleanData(notice.ADRESSE.split(';')) : cleanData(notice.ADRESSE);
 
	//WARDS
	var arrayWADRS = (!Array.isArray(notice.WADRS)) ? cleanData(notice.WADRS.split(';')) : cleanData(notice.WADRS);
 
	//SERIE
	var arraySERIE = (!Array.isArray(notice.SERIE)) ? cleanData(notice.SERIE.split(';')) : cleanData(notice.SERIE);
 
 
	//Update field REG, DPT, DPT_Lettre, COM, WCOM, INSEE, COM2, INSEE2, ATEL
	db.memoire.update(
		{ REF : ref},
		{
			$set : {
				DPT_LETTRE : arrayDPTLETTRE,
				WCOM :  arrayWCOM,
				ADRESSE : arrayADRESSE,
				WADRS: arrayWADRS,
				SERIE : arraySERIE
			}
		}
	)	
	
	noticeCount--;
	print(noticeCount + " notices restantes");
	
})