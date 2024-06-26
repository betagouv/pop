/**
 * Mise à jour de la valeur du champ BASE par Rose Valland (MNR-Jeu de Paume)
 */
const notices = db.mnr.find().noCursorTimeout();
let noticeCount = db.mnr.count();
notices.forEach((aRow) => {
	db.mnr.update(
		{ REF: aRow.REF },
		{
			$set: {
				BASE: "Rose Valland (MNR-Jeu de Paume)",
			},
		},
	);

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});
