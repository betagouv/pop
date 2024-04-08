const notices = db.autor.find().noCursorTimeout();
let noticeCount = db.autor.count();
notices.forEach((aRow) => {
	const ref = aRow.REF;

	//Procédure pour BASE
	const base = "Ressources biographiques (Autor)";
	//Update field WWW
	db.autor.update(
		{ REF: ref },
		{
			$set: {
				BASE: base,
			},
		},
	);

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});
