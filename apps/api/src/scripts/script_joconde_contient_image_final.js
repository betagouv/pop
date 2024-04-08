const notices = db.joconde.find().noCursorTimeout();
let noticeCount = db.joconde.count();
notices.forEach((aRow) => {
	const ref = aRow.REF;
	const _img = aRow.IMG;
	let contient_image = "non";
	//Update field WWW

	if (_img && _img.length > 0) {
		contient_image = "oui";
	}

	db.joconde.update(
		{ REF: ref },
		{
			$set: {
				CONTIENT_IMAGE: contient_image,
			},
		},
	);

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});
