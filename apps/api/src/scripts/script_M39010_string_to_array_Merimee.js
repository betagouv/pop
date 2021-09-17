var notices = db.merimee.find().noCursorTimeout();
var noticeCount = db.merimee.count();
notices.forEach(function( notice ){
	var ref = notice.REF;
	
	//Transformation des champ string to array
	//REG
	var arrayReg = (!Array.isArray(notice.REG)) ? notice.REG.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.REG;
 
	//DPT
	var arrayDpt = (!Array.isArray(notice.DPT)) ? notice.DPT.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.DPT;
 
	//DPT_Lettre
	var arrayDpt_Lettre = (notice.DPT_Lettre) ? (!Array.isArray(notice.DPT_Lettre)) ? notice.DPT_Lettre.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.DPT_Lettre : [];
 
	//COM
	var arrayCom = (!Array.isArray(notice.COM)) ? notice.COM.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.COM;
 
	//WCOM
	var arrayWcom = (!Array.isArray(notice.WCOM)) ? notice.WCOM.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.WCOM;
 
	//INSEE
	var arrayInsee = (!Array.isArray(notice.INSEE)) ? notice.INSEE.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.INSEE;

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