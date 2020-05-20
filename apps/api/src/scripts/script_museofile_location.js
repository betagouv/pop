var notices = db.museo.find().noCursorTimeout();
var noticeCount = db.museo.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	
	//Update field WWW
	db.museo.update(
		{ REF : ref},
		{
			$rename : {
				'location' : 'POP_COORDONNEES'
				}
			
		}
	)
	
	noticeCount--;
	print(noticeCount + " notices restantes");
	
})