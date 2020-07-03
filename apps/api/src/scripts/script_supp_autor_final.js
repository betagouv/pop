var notices = db.autor.find().noCursorTimeout();
var noticeCount = db.autor.count();

notices.forEach(function( aRow ){
	var ref = aRow.REF
	// remove RESID and create string AUTORLOCA
	if("RESID" in aRow){
		let autorl = ""
		aRow.RESID.forEach(function( resid ) {
			if(resid != ""){
				if(autorl != ""){
					autorl = autorl + " , " + resid
				}else{
					autorl = resid
				}
			}
		})
		//Update field AUTORLOCA
		db.autor.update(
			{ REF : ref},
				{
					$set : {
						AUTORLOCA : autorl
					}
				}
			)
	}
	
	//put EMET in PRODUCTEUR
	if("EMET" in aRow){
		if( aRow.EMET != ""){
			let emet = aRow.EMET
			//Update field PRODUCTEUR
			db.autor.update
			(
				{ REF : ref},
				{
					$set : 
					{
						PRODUCTEUR : emet
					}
				}
			)
		}
	}
	
	// create field NOMPRENOM
	if("NOM" in aRow && "PNOM" in aRow){
		if( aRow.NOM != "" && aRow.PNOM != "" ){
			//Update field NOMPRENOM
			db.autor.update(
			{ REF : ref},
				{
					$set : {
						NOMPRENOM : aRow.NOM + " " + aRow.PNOM
					}
				}
			)
		}
	}
	
	// Delete STAT, IDENT, LMEM, LWEB, SEXE, OBSMAP
	db.autor.update({"REF": ref},{ $unset: {"STAT": ""}},{ multi: true })
	db.autor.update({"REF": ref},{ $unset: {"IDENT": ""}},{ multi: true })
	db.autor.update({"REF": ref},{ $unset: {"LMEM": ""}},{ multi: true })
	db.autor.update({"REF": ref},{ $unset: {"LWEB": ""}},{ multi: true })
	db.autor.update({"REF": ref},{ $unset: {"SEXE": ""}},{ multi: true })
	db.autor.update({"REF": ref},{ $unset: {"OBSMAP": ""}},{ multi: true })

	//delete EMET
	db.autor.update({"REF": ref},{ $unset: {"EMET": ""}},{ multi: true })

	//delete RESID
	db.autor.update({"REF": ref},{ $unset: {"RESID": ""}},{ multi: true })

	noticeCount--;
	print(noticeCount + " notices autor restantes");
})