var notices = db.joconde.find().noCursorTimeout();
var noticeCount = db.joconde.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	var _img = aRow.IMG;
	var contient_image = "non";
	//Update field WWW
	
	
	if (_img && _img.length > 0){
		contient_image = "oui";
	}
	
	db.joconde.update(
		{ REF : ref},
		{
			$set : {
				CONTIENT_IMAGE : contient_image
			}

		}	
	)		
	
	noticeCount--;
	print(noticeCount + " notices restantes");
	
})