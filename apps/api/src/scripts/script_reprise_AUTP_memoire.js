const notices = db.memoire.find().noCursorTimeout();
let noticeCount = db.memoire.count();
notices.forEach((aRow) => {
	const ref = aRow.REF;

	//Transformation string AUTP to array
	//Procédure pour AUTP
	const autp = aRow.AUTP;
	let arrayAutp;
	const typeAutp = typeof autp;
	if (typeAutp === "string") {
		arrayAutp = autp.split(";");

		for (let i = 0; i < arrayAutp.length; i++) {
			arrayAutp[i] = arrayAutp[i].trim();
		}

		//Delete elements with empty string
		arrayAutp.forEach((item) => {
			const pos = arrayAutp.indexOf(item);
			if (item === "") {
				arrayAutp.splice(pos, 1);
			}
		});
		//Update field AUTP
		db.memoire.update(
			{ REF: ref },
			{
				$set: {
					AUTP: arrayAutp,
				},
			},
		);
	}

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});
