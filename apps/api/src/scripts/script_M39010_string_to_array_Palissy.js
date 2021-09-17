var notices = db.palissy.find().noCursorTimeout();
var noticeCount = db.palissy.count();
notices.forEach(function( notice ){
	var ref = notice.REF;
	
	//Transformation des champ string to array
	//REG
	var arrayReg = (!Array.isArray(notice.REG)) ? notice.REG.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.REG;
 
	//DPT
	var arrayDpt = (!Array.isArray(notice.DPT)) ? notice.DPT.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.DPT;
 
	//DPT_Lettre
	var arrayDpt_Lettre = (notice.DPT_Lettre) ?  (!Array.isArray(notice.DPT_Lettre)) ? notice.DPT_Lettre.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.DPT_Lettre : [];
 
	//COM
	var arrayCom = (!Array.isArray(notice.COM)) ? notice.COM.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.COM;
 
	//WCOM
	var arrayWcom = (!Array.isArray(notice.WCOM)) ? notice.WCOM.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.WCOM;
 
	//INSEE
	var arrayInsee = (!Array.isArray(notice.INSEE)) ? notice.INSEE.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.INSEE;
 
	//COM2
	var arrayCom2 = (!Array.isArray(notice.COM2)) ? notice.COM2.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.COM2;
 
	//INSEE2
	var arrayInsee2 = (!Array.isArray(notice.INSEE2)) ? notice.INSEE2.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.INSEE2;
 
	//ATEL
	var arrayAtel = (!Array.isArray(notice.ATEL)) ? notice.ATEL.split(';').map((element) => { return  element.trim() } ).filter((element) => element !== "" ) : notice.ATEL;
 
	//Update field REG, DPT, DPT_Lettre, COM, WCOM, INSEE, COM2, INSEE2, ATEL
	db.palissy.update(
		{ REF : ref},
		{
			$set : {
				REG:  arrayReg,
				DPT: arrayDpt,
				DPT_Lettre: arrayDpt_Lettre,
				COM: arrayCom,
				WCOM: arrayWcom,
				INSEE: arrayInsee,
				COM2: arrayCom2,
				INSEE2: arrayInsee2,
				ATEL: arrayAtel
			}
		}
	)	
	
	noticeCount--;
	print(noticeCount + " notices restantes");
	
})