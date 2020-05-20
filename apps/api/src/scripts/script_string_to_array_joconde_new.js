var notices = db.joconde.find().noCursorTimeout();
var noticeCount = db.joconde.count();

var word = ''
var check = 0

notices.forEach(function( aRow ){
	var ref = aRow.REF;
	//Transformation string AUTR, DEPO, LIEUX, REPR, WWW to array
	//Procédure pour AUTR
	
	var autr = aRow.AUTR;
	var arrayAutr;
	var typeAutr = typeof autr;
	if(typeAutr == "string"){
		autr = Array.from(autr)
		autr.forEach(function( item ){
			if(item == '('){
			  check = 1
			}
			if(!check && item != ',' && item != ';' && item != ':' && item != '#' && item !='\n'){
			   word = word.concat(item)
			}	
			if(check) {
			   word = word.concat(item)
			   if(item == ')'){
				 check = 0 
			   }
			}
			if( !check && item == ',' || item == ';' || item == ':' || item == '#' || item == '\n'){
				word = word.trim()
				arrayAutr.push(word)
				word = ''  
			}
		})
	
		if(word != ""){
		   word = word.trim()
		   arrayAutr.push(word)
		   word = ''
		}

		arrayAutr.forEach(function( item ){
			var pos = arrayAutr.indexOf(item);
			if(item == ""){
			arrayAutr.splice(pos, 1); 
			}
		})
		
	//Update field AUTR
	db.joconde.update(
		{ REF : ref},
		{
			$set : {
				AUTR : arrayAutr
			}
		}
	)
	}

	
	//Procédure pour DEPO
	var depo = aRow.DEPO;
	var arrayDepo;
	var typeDepo = typeof depo;
	if(typeDepo == "string"){
		depo = Array.from(depo)
		depo.forEach(function( item ){
			if(item == '('){
			  check = 1
			}
			if(!check && item != ',' && item != ';' && item != ':' && item != '#' && item !='\n'){
			   word = word.concat(item)
			}	
			if(check) {
			   word = word.concat(item)
			   if(item == ')'){
				 check = 0 
			   }
			}
			if( !check && item == ',' || item == ';' || item == ':' || item == '#' || item == '\n'){
				word = word.trim()
				arrayDepo.push(word)
				word = ''  
			}
		})
	
		if(word != ""){
		   word = word.trim()
		   arrayDepo.push(word)
		   word = ''
		}

		arrayDepo.forEach(function( item ){
			var pos = arrayDepo.indexOf(item);
			if(item == ""){
			arrayDepo.splice(pos, 1); 
			}
		})
		
		//Update field DEPO
		db.joconde.update(
			{ REF : ref},
			{
				$set : {
					DEPO : arrayDepo
				}
			}
		)
	}

	
	
	//Procédure pour LIEUX
	var lieux = aRow.LIEUX;
	var arrayLieux;
	var typeLieux = typeof lieux;
	if(typeLieux == "string"){
		lieux = Array.from(lieux)
		lieux.forEach(function( item ){
			if(item == '('){
			  check = 1
			}
			if(!check && item != ',' && item != ';' && item != ':' && item != '#' && item !='\n'){
			   word = word.concat(item)
			}	
			if(check) {
			   word = word.concat(item)
			   if(item == ')'){
				 check = 0 
			   }
			}
			if( !check && item == ',' || item == ';' || item == ':' || item == '#' || item == '\n'){
				word = word.trim()
				arrayLieux.push(word)
				word = ''  
			}
		})
	
		if(word != ""){
		   word = word.trim()
		   arrayLieux.push(word)
		   word = ''
		}

		arrayLieux.forEach(function( item ){
			var pos = arrayLieux.indexOf(item);
			if(item == ""){
			arrayLieux.splice(pos, 1); 
			}
		})
		
		//Update field LIEUX
		db.joconde.update(
			{ REF : ref},
			{
				$set : {
					LIEUX : arrayLieux
				}
			}
		)
	}

	
	
	//Procédure pour REPR
	var repr = aRow.REPR;
	var arrayRepr;
	var typeRepr = typeof repr;
	if(typeRepr == "string"){
		repr = Array.from(repr)
		repr.forEach(function( item ){
			if(item == '('){
			  check = 1
			}
			if(!check && item != ',' && item != ';' && item != ':' && item != '#' && item !='\n'){
			   word = word.concat(item)
			}	
			if(check) {
			   word = word.concat(item)
			   if(item == ')'){
				 check = 0 
			   }
			}
			if( !check && item == ',' || item == ';' || item == ':' || item == '#' || item == '\n'){
				word = word.trim()
				arrayRepr.push(word)
				word = ''  
			}
		})
	
		if(word != ""){
		   word = word.trim()
		   arrayRepr.push(word)
		   word = ''
		}

		arrayRepr.forEach(function( item ){
			var pos = arrayRepr.indexOf(item);
			if(item == ""){
			arrayRepr.splice(pos, 1); 
			}
		})
		
		//Update field REPR
		db.joconde.update(
			{ REF : ref},
			{
				$set : {
					REPR : arrayRepr
				}
			}
		)
	}

	
	
	//Procédure pour WWW
	var www = aRow.WWW;
	var arrayWww;
	var typeWww = typeof www;
	if(typeWww == "string"){
		www = Array.from(www)
		www.forEach(function( item ){
			if(item == '('){
			  check = 1
			}
			if(!check && item != ',' && item != ';' && item != ':' && item != '#' && item !='\n'){
			   word = word.concat(item)
			}	
			if(check) {
			   word = word.concat(item)
			   if(item == ')'){
				 check = 0 
			   }
			}
			if( !check && item == ',' || item == ';' || item == ':' || item == '#' || item == '\n'){
				word = word.trim()
				arrayWww.push(word)
				word = ''  
			}
		})
	
		if(word != ""){
		   word = word.trim()
		   arrayWww.push(word)
		   word = ''
		}

		arrayWww.forEach(function( item ){
			var pos = arrayWww.indexOf(item);
			if(item == ""){
			arrayWww.splice(pos, 1); 
			}
		})
		
		//Update field WWW
		db.joconde.update(
			{ REF : ref},
			{
				$set : {
					WWW : arrayWww
				}
			}
		)
	}

	
	noticeCount--;
	print(noticeCount + " notices restantes");
	
})