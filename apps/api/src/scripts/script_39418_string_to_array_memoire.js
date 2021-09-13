var notices = db.memoire.find().noCursorTimeout();
var noticeCount = db.memoire.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	
	//Transformation des champ string to array
	//DPT_LETTRE
	var arrayDPTLETTRE = (!Array.isArray(notice.DPT_LETTRE)) ? notice.DPT_LETTRE.split(';').map((element) => { return element.trim() !== "" }) : notice.DPT_LETTRE;

	//WCOM
	var arrayWCOM = (!Array.isArray(notice.WCOM)) ? notice.WCOM.split(';').map((element) => { return element.trim() !== "" }) : notice.WCOM;
 
	//ADRESSE
	var arrayADRESSE = (!Array.isArray(notice.ADRESSE)) ? notice.ADRESSE.split(';').map((element) => { return element.trim() !== "" }) : notice.ADRESSE;
 
	//WARDS
	var arrayWADRS = (!Array.isArray(notice.WADRS)) ? notice.WADRS.split(';').map((element) => { return element.trim() !== "" }) : notice.WADRS;
 
	//SERIE
	var arraySERIE = (!Array.isArray(notice.SERIE)) ? notice.SERIE.split(';').map((element) => { return element.trim() !== "" }) : notice.SERIE;
 
 
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