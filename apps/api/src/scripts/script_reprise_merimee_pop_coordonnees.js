var notices = db.merimee.find().noCursorTimeout(); //Récuperation des notices de la base merimee

var noticeCount = db.merimee.count(); //le nombre de notices trouvée en base

if(notices.length >0) {
	notices.forEach(notice => {

		if (((notice.COOR !=='' || notice.COORM !=='') && notice.ZONE !=='') || (notice.POP_COORDONNEES.lat !== 0 && notice.POP_COORDONNEES.lon !== 0)){ // verification si les champ COOR COORM ZONE et POP_COORDONNEES sont renseignés

			db.merimee.update(

				{ REF : ref},
				{ $set : { POP_CONTIENT_GEOLOCALISATION : "oui" } }	

				);

		} else{
		
			db.merimee.update(

				{ REF : ref},
				{ $set : { POP_CONTIENT_GEOLOCALISATION : "non" } }	

				);
			
		}

		noticeCount--;

		print(noticeCount + " notices restantes");

		
	});
}