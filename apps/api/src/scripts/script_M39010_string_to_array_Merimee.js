var notices = db.merimee.find().noCursorTimeout();
var noticeCount = db.merimee.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	
	//Transformation des champ string to array
	//REG
	var arrayReg = (!Array.isArray(notice.REG)) ? notice.REG.split(';').map((element) => { return element.trim() !== "" }) : notice.REG;
 
	//DPT
	var arrayDpt = (!Array.isArray(notice.DPT)) ? notice.DPT.split(';').map((element) => { return element.trim() !== "" }) : notice.DPT;
 
	//DPT_Lettre
	var arrayDpt_Lettre = (!Array.isArray(notice.DPT_Lettre)) ? notice.DPT_Lettre.split(';').map((element) => { return element.trim() !== "" }) : notice.DPT_Lettre;
 
	//COM
	var arrayCom = (!Array.isArray(notice.COM)) ? notice.COM.split(';').map((element) => { return element.trim() !== "" }) : notice.COM;
 
	//WCOM
	var arrayWcom = (!Array.isArray(notice.WCOM)) ? notice.WCOM.split(';').map((element) => { return element.trim() !== "" }) : notice.WCOM;
 
	//INSEE
	var arrayInsee = (!Array.isArray(notice.INSEE)) ? notice.INSEE.split(';').map((element) => { return element.trim() !== "" }) : notice.INSEE;

	//Update fields REG, DPT, DPT_Lettre, COM, WCOM, INSEE
	db.merimee.update(
		{ REF : ref},
		{
			$set : {
				REG:  arrayReg,
				DPT: arrayDpt,
				DPT_Lettre: arrayDpt_Lettre,
				COM: arrayCom,
				WCOM: arrayWcom,
				INSEE: arrayInsee
			}
		}
	)	
	
	noticeCount--;
	print(noticeCount + " notices restantes");
	
})