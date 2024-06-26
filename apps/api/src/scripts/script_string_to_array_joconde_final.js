const notices = db.joconde.find().noCursorTimeout();
let noticeCount = db.joconde.count();

let word = "";
let check = 0;

notices.forEach((aRow) => {
	const ref = aRow.REF;
	//Transformation string AUTR, DEPO, LIEUX, REPR, WWW to array
	//Procédure pour AUTR

	let autr = aRow.AUTR;
	const arrayAutr = [];
	const typeAutr = typeof autr;
	if (typeAutr === "string") {
		autr = Array.from(autr);
		autr.forEach((item) => {
			if (item === "(") {
				check = 1;
			}
			if (!check) {
				if (
					item === "," ||
					item === ";" ||
					item === ":" ||
					item === "#" ||
					item === "\n"
				) {
					word = word.trim();
					arrayAutr.push(word);
					word = "";
				} else {
					word = word.concat(item);
				}
			}
			if (check) {
				word = word.concat(item);
				if (item === ")") {
					check = 0;
				}
			}
		});

		if (word !== "") {
			word = word.trim();
			arrayAutr.push(word);
			word = "";
		}

		arrayAutr.forEach((item) => {
			const pos = arrayAutr.indexOf(item);
			if (item === "") {
				arrayAutr.splice(pos, 1);
			}
		});

		//Update field AUTR
		db.joconde.update(
			{ REF: ref },
			{
				$set: {
					AUTR: arrayAutr,
				},
			},
		);
	}

	//Procédure pour DEPO
	word = "";
	check = 0;
	let depo = aRow.DEPO;
	const arrayDepo = [];
	const typeDepo = typeof depo;
	if (typeDepo === "string") {
		depo = Array.from(depo);
		depo.forEach((item) => {
			if (item === "(") {
				check = 1;
			}
			if (!check) {
				if (
					item === "," ||
					item === ";" ||
					item === ":" ||
					item === "#" ||
					item === "\n"
				) {
					word = word.trim();
					arrayDepo.push(word);
					word = "";
				} else {
					word = word.concat(item);
				}
			}
			if (check) {
				word = word.concat(item);
				if (item === ")") {
					check = 0;
				}
			}
		});

		if (word !== "") {
			word = word.trim();
			arrayDepo.push(word);
			word = "";
		}

		arrayDepo.forEach((item) => {
			const pos = arrayDepo.indexOf(item);
			if (item === "") {
				arrayDepo.splice(pos, 1);
			}
		});

		//Update field DEPO
		db.joconde.update(
			{ REF: ref },
			{
				$set: {
					DEPO: arrayDepo,
				},
			},
		);
	}

	//Procédure pour LIEUX
	word = "";
	check = 0;
	let lieux = aRow.LIEUX;
	const arrayLieux = [];
	const typeLieux = typeof lieux;
	if (typeLieux === "string") {
		lieux = Array.from(lieux);
		lieux.forEach((item) => {
			if (item === "(") {
				check = 1;
			}
			if (!check) {
				if (
					item === "," ||
					item === ";" ||
					item === ":" ||
					item === "#" ||
					item === "\n"
				) {
					word = word.trim();
					arrayLieux.push(word);
					word = "";
				} else {
					word = word.concat(item);
				}
			}
			if (check) {
				word = word.concat(item);
				if (item === ")") {
					check = 0;
				}
			}
		});

		if (word !== "") {
			word = word.trim();
			arrayLieux.push(word);
			word = "";
		}

		arrayLieux.forEach((item) => {
			const pos = arrayLieux.indexOf(item);
			if (item === "") {
				arrayLieux.splice(pos, 1);
			}
		});

		//Update field LIEUX
		db.joconde.update(
			{ REF: ref },
			{
				$set: {
					LIEUX: arrayLieux,
				},
			},
		);
	}

	//Procédure pour REPR
	word = "";
	check = 0;
	let repr = aRow.REPR;
	const arrayRepr = [];
	const typeRepr = typeof repr;
	if (typeRepr === "string") {
		repr = Array.from(repr);
		repr.forEach((item) => {
			if (item === "(") {
				check = 1;
			}
			if (!check) {
				if (
					item === "," ||
					item === ";" ||
					item === ":" ||
					item === "#" ||
					item === "\n"
				) {
					word = word.trim();
					arrayRepr.push(word);
					word = "";
				} else {
					word = word.concat(item);
				}
			}
			if (check) {
				word = word.concat(item);
				if (item === ")") {
					check = 0;
				}
			}
		});

		if (word !== "") {
			word = word.trim();
			arrayRepr.push(word);
			word = "";
		}

		arrayRepr.forEach((item) => {
			const pos = arrayRepr.indexOf(item);
			if (item === "") {
				arrayRepr.splice(pos, 1);
			}
		});

		//Update field REPR
		db.joconde.update(
			{ REF: ref },
			{
				$set: {
					REPR: arrayRepr,
				},
			},
		);
	}

	//Procédure pour WWW
	word = "";
	check = 0;
	let www = aRow.WWW;
	const arrayWww = [];
	const typeWww = typeof www;
	if (typeWww === "string") {
		www = Array.from(www);
		www.forEach((item) => {
			if (item === "(") {
				check = 1;
			}
			if (!check) {
				if (
					item === "," ||
					item === ";" ||
					item === ":" ||
					item === "#" ||
					item === "\n"
				) {
					word = word.trim();
					arrayWww.push(word);
					word = "";
				} else {
					word = word.concat(item);
				}
			}
			if (check) {
				word = word.concat(item);
				if (item === ")") {
					check = 0;
				}
			}
		});

		if (word !== "") {
			word = word.trim();
			arrayWww.push(word);
			word = "";
		}

		arrayWww.forEach((item) => {
			const pos = arrayWww.indexOf(item);
			if (item === "") {
				arrayWww.splice(pos, 1);
			}
		});

		//Update field WWW
		db.joconde.update(
			{ REF: ref },
			{
				$set: {
					WWW: arrayWww,
				},
			},
		);
	}

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});
