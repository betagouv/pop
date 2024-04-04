const notices = db.joconde.find().noCursorTimeout();
let noticeCount = db.joconde.count();
notices.forEach((aRow) => {
	const ref = aRow.REF;
	let adptString = "";
	let etatString = "";
	let prepString = "";
	const adpt = aRow.ADPT;
	const etat = aRow.ETAT;
	const prep = aRow.PREP;

	//Procédure pour ADPT
	let i = 1;
	const typeAdpt = typeof adpt;
	if (typeAdpt !== "string") {
		aRow.ADPT.forEach((aItem) => {
			adptString += aItem;
			if (i !== adpt.length) {
				adptString += "; ";
			}
			i++;
		});
		db.joconde.update(
			{ REF: ref },
			{
				$set: {
					ADPT: adptString,
				},
			},
		);
	}

	//Procédure pour ETAT
	let j = 1;
	const typeEtat = typeof etat;
	if (typeEtat !== "string") {
		aRow.ETAT.forEach((aItem) => {
			etatString += aItem;
			if (j !== etat.length) {
				etatString += "; ";
			}
			j++;
		});
		db.joconde.update(
			{ REF: ref },
			{
				$set: {
					ETAT: etatString,
				},
			},
		);
	}

	//Procédure pour PREP
	let k = 1;
	const typePrep = typeof prep;
	if (typePrep !== "string") {
		aRow.PREP.forEach((aItem) => {
			prepString += aItem;
			if (k !== prep.length) {
				prepString += "; ";
			}
			k++;
		});
		db.joconde.update(
			{ REF: ref },
			{
				$set: {
					PREP: prepString,
				},
			},
		);
	}

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});
