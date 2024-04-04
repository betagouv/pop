const notices = db.museo.find().noCursorTimeout();
let noticeCount = db.museo.count();
notices.forEach((aRow) => {
	const ref = aRow.REF;

	//Update field location to POP_COORDONNEES
	db.museo.update(
		{ REF: ref },
		{
			$rename: {
				location: "POP_COORDONNEES",
			},
		},
	);

	noticeCount--;
	print(`ref = ${ref}`);
});
