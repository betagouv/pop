/**
 * Mise à jour de la valeur du champ BASE par Rose Valland (MNR-Jeu de Paume)
 */
var notices = db.mnr.find().noCursorTimeout();
var noticeCount = db.mnr.count();
notices.forEach(function( aRow ){

	db.mnr.update(
		{ REF : aRow.REF},
		{
			$set : {
				BASE : 'Rose Valland (MNR-Jeu de Paume)'
			}
		}
	)
	
	noticeCount--;
	print(noticeCount + " notices restantes");
	
})