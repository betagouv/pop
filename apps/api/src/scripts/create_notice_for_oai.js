var notices = db.merimee.find().noCursorTimeout();
var noticeCount = db.merimee.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	var date
	if(aRow.DMAJ == ""){
		date = aRow.DMIS
	}else{
		date = aRow.DMAJ
	}
	//Create documents in notice OAI
	db.noticesOAI.insert(
		{ 
			REF : ref,
			BASE : "merimee",
			DMAJ: date
		}
	)
	noticeCount--;
	print(noticeCount + " notices merimee restantes");
})

notices = db.joconde.find().noCursorTimeout();
noticeCount = db.joconde.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	var date
	if(aRow.DMAJ == ""){
		date = aRow.DMIS
	}else{
		date = aRow.DMAJ
	}
	//Create documents in notice OAI
	db.noticesOAI.insert(
		{ 
			REF : ref,
			BASE : "joconde",
			DMAJ: date
		}
	)
	noticeCount--;
	print(noticeCount + " notices joconde restantes");
})

notices = db.palissy.find().noCursorTimeout();
noticeCount = db.palissy.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	var date
	if(aRow.DMAJ == ""){
		date = aRow.DMIS
	}else{
		date = aRow.DMAJ
	}
	//Create documents in notice OAI
	db.noticesOAI.insert(
		{ 
			REF : ref,
			BASE : "palissy",
			DMAJ: date
		}
	)
	noticeCount--;
	print(noticeCount + " notices palissy restantes");
})


notices = db.autor.find().noCursorTimeout();
noticeCount = db.autor.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	var date
	if(aRow.DMAJ == ""){
		date = aRow.DMIS
	}else{
		date = aRow.DMAJ
	}
	//Create documents in notice OAI
	db.noticesOAI.insert(
		{ 
			REF : ref,
			BASE : "autor",
			DMAJ: date
		}
	)
	noticeCount--;
	print(noticeCount + " notices autor restantes");
})


notices = db.memoire.find().noCursorTimeout();
noticeCount = db.memoire.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	var date
	if(aRow.DMAJ == ""){
		date = aRow.DMIS
	}else{
		date = aRow.DMAJ
	}
	//Create documents in notice OAI
	db.noticesOAI.insert(
		{ 
			REF : ref,
			BASE : "memoire",
			DMAJ: date
		}
	)
	noticeCount--;
	print(noticeCount + " notices memoire restantes");
})


notices = db.mnr.find().noCursorTimeout();
noticeCount = db.mnr.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	var date
	if(aRow.DMAJ == ""){
		date = aRow.DMIS
	}else{
		date = aRow.DMAJ
	}
	//Create documents in notice OAI
	db.noticesOAI.insert(
		{ 
			REF : ref,
			BASE : "mnr",
			DMAJ: date
		}
	)
	noticeCount--;
	print(noticeCount + " notices mnr restantes");
})


notices = db.museo.find().noCursorTimeout();
noticeCount = db.museo.count();
notices.forEach(function( aRow ){
	var ref = aRow.REF;
	var date
	if(aRow.DMAJ == ""){
		date = aRow.DMIS
	}else{
		date = aRow.DMAJ
	}
	//Create documents in notice OAI
	db.noticesOAI.insert(
		{ 
			REF : ref,
			BASE : "museo",
			DMAJ: date
		}
	)
	noticeCount--;
	print(noticeCount + " notices museo restantes");
})




