var notices = db.memoire.find().noCursorTimeout();
var noticeCount = db.memoire.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	
	//Transformation string AUTP to array
	//Procédure pour AUTP
	var autp = aRow.AUTP;
	var arrayAutp;
	var typeAutp = typeof autp;
	if(typeAutp == "string"){
		arrayAutp = autp.split(';');
		
		for(var i=0; i<arrayAutp.length; i++){
			arrayAutp[i] = arrayAutp[i].trim();
		}
		
		//Delete elements with empty string
		arrayAutp.forEach(function( item ){
			var pos = arrayAutp.indexOf(item);
			if(item == ""){
				arrayAutp.splice(pos, 1); 
			}
		})
		//Update field AUTP
		db.memoire.update(
			{ REF : ref},
			{
				$set : {
					AUTP : arrayAutp
				}
			}
		)
	}
	
	noticeCount--;
	print(noticeCount + " notices restantes");
	
})