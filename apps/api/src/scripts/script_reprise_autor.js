var notices = db.autor.find().noCursorTimeout();
var noticeCount = db.autor.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	
	//Procédure pour BASE
	var base = "Ressources biographiques (Autor)";
	//Update field WWW
	db.autor.update(
		{ REF : ref},
		{
			$set : {
				BASE : base
			}
		}
	)
	
	noticeCount--;
	print(noticeCount + " notices restantes");
	
})