var notices = db.joconde.find().noCursorTimeout();
var noticeCount = db.joconde.count();
notices.forEach((aRow) => {
	var ref = aRow.REF;
	var adptString = "";
	var etatString = "";
	var prepString = "";
	var adpt = aRow.ADPT;
	var etat = aRow.ETAT;
	var prep = aRow.PREP;

	//Procédure pour ADPT
	var i = 1;
	var typeAdpt = typeof adpt;
	if (typeAdpt != "string") {
		aRow.ADPT.forEach((aItem) => {
			adptString += aItem;
			if (i != adpt.length) {
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
	var j = 1;
	var typeEtat = typeof etat;
	if (typeEtat != "string") {
		aRow.ETAT.forEach((aItem) => {
			etatString += aItem;
			if (j != etat.length) {
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
	var k = 1;
	var typePrep = typeof prep;
	if (typePrep != "string") {
		aRow.PREP.forEach((aItem) => {
			prepString += aItem;
			if (k != prep.length) {
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
	print(noticeCount + " notices restantes");
});
