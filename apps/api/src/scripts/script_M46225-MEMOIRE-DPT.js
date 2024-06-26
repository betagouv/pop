objDpt = {
	"01": "Ain",
	"02": "Aisne",
	"03": "Allier",
	"04": "Alpes-de-Haute-Provence",
	"05": "Hautes-Alpes",
	"06": "Alpes-Maritimes",
	"07": "Ardèche",
	"08": "Ardennes",
	"09": "Ariège",
	10: "Aube",
	11: "Aude",
	12: "Aveyron",
	13: "Bouches-du-Rhône",
	14: "Calvados",
	15: "Cantal",
	16: "Charente",
	17: "Charente-Maritime",
	18: "Cher",
	19: "Corrèze",
	21: "Côte-d'Or",
	22: "Côtes-d'Armor",
	23: "Creuse",
	24: "Dordogne",
	25: "Doubs",
	26: "Drôme",
	27: "Eure",
	28: "Eure-et-Loir",
	29: "Finistère",
	"2A": "Corse-du-Sud",
	"2B": "Haute-Corse",
	30: "Gard",
	31: "Haute-Garonne",
	32: "Gers",
	33: "Gironde",
	34: "Hérault",
	35: "Ille-et-Vilaine",
	36: "Indre",
	37: "Indre-et-Loire",
	38: "Isère",
	39: "Jura",
	40: "Landes",
	41: "Loir-et-Cher",
	42: "Loire",
	43: "Haute-Loire",
	44: "Loire-Atlantique",
	45: "Loiret",
	46: "Lot",
	47: "Lot-et-Garonne",
	48: "Lozère",
	49: "Maine-et-Loire",
	50: "Manche",
	51: "Marne",
	52: "Haute-Marne",
	53: "Mayenne",
	54: "Meurthe-et-Moselle",
	55: "Meuse",
	56: "Morbihan",
	57: "Moselle",
	58: "Nièvre",
	59: "Nord",
	60: "Oise",
	61: "Orne",
	62: "Pas-de-Calais",
	63: "Puy-de-Dôme",
	64: "Pyrénées-Atlantiques",
	65: "Hautes-Pyrénées",
	66: "Pyrénées-Orientales",
	67: "Bas-Rhin",
	68: "Haut-Rhin",
	69: "Rhône",
	70: "Haute-Saône",
	71: "Saône-et-Loire",
	72: "Sarthe",
	73: "Savoie",
	74: "Haute-Savoie",
	75: "Paris",
	76: "Seine-Maritime",
	77: "Seine-et-Marne",
	78: "Yvelines",
	79: "Deux-Sèvres",
	80: "Somme",
	81: "Tarn",
	82: "Tarn-et-Garonne",
	83: "Var",
	84: "Vaucluse",
	85: "Vendée",
	86: "Vienne",
	87: "Haute-Vienne",
	88: "Vosges",
	89: "Yonne",
	90: "Territoire de Belfort",
	91: "Essonne",
	92: "Hauts-de-Seine",
	93: "Seine-Saint-Denis",
	94: "Val-de-Marne",
	95: "Val-d'Oise",
	971: "Guadeloupe",
	972: "Martinique",
	973: "Guyane",
	974: "La Réunion",
	975: "Saint-Pierre-et-Miquelon",
	976: "Mayotte",
};

// Traitement DPT
notices = db.memoire.find({ DPT: /[a-zA-Z]/ }).noCursorTimeout();
noticeCount = notices.count();

print("DEBUT DE TRAITEMENT DPT");
print(`${noticeCount} NOTICES`);

const bulk = db.memoire.initializeUnorderedBulkOp();

notices.forEach((notice) => {
	const regexDPT = new RegExp(/[a-zA-Z]/);
	let update = false;

	const arrayDpt = notice.DPT.map((element) => {
		element = String(element).replace("’", "'");
		if (regexDPT.test(element)) {
			for (const [key, value] of Object.entries(objDpt)) {
				if (value === element) {
					update = true;
					return key;
				}
			}
		}
		return element;
	});

	if (update) {
		const objSet = {
			DPT: arrayDpt,
		};
		// Vérification de DPT_LETTRE, si vide, création des valeurs à partir de DPT
		if (
			Array.isArray(notice.DPT_LETTRE) &&
			notice.DPT_LETTRE.length === 0
		) {
			objSet.DPT_LETTRE = arrayDpt.map((dpt) => getDepartement(dpt));
		}
		bulk.find({ REF: notice.REF }).update([
			{
				$set: objSet,
			},
		]);
	}

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});

print("DEBUT DE UPDATE DPT");
bulk.execute();

// DPT_LETTRE

notices = db.memoire.find({ DPT_LETTRE: /[0-9]/ }).noCursorTimeout();
noticeCount = notices.count();

print("DEBUT DE TRAITEMENT DPT_LETTRE");
print(`${noticeCount} NOTICES`);

const bulk2 = db.memoire.initializeUnorderedBulkOp();

notices.forEach((notice) => {
	const regexDPT = new RegExp(/[0-9]/);
	let update = false;

	const arrayDptLettre = notice.DPT_LETTRE.map((element) => {
		if (regexDPT.test(element)) {
			for (const [key, value] of Object.entries(objDpt)) {
				if (key === element) {
					update = true;
					return value;
				}
			}
		}
		return element;
	});

	if (update) {
		bulk2.find({ REF: notice.REF }).update([
			{
				$set: {
					DPT_LETTRE: arrayDptLettre,
				},
			},
		]);
	}

	noticeCount--;
	print(`${noticeCount} notices restantes`);
});

print("DEBUT DE UPDATE DPT_LETTRE");
bulk2.execute();

function getDepartement(v) {
	switch (v) {
		case "01":
			return "Ain";
		case "02":
			return "Aisne";
		case "03":
			return "Allier";
		case "04":
			return "Alpes-de-Haute-Provence";
		case "05":
			return "Hautes-Alpes";
		case "06":
			return "Alpes-Maritimes";
		case "07":
			return "Ardèche";
		case "08":
			return "Ardennes";
		case "09":
			return "Ariège";
		case "10":
			return "Aube";
		case "11":
			return "Aude";
		case "12":
			return "Aveyron";
		case "13":
			return "Bouches-du-Rhône";
		case "14":
			return "Calvados";
		case "15":
			return "Cantal";
		case "16":
			return "Charente";
		case "17":
			return "Charente-Maritime";
		case "18":
			return "Cher";
		case "19":
			return "Corrèze";
		case "21":
			return "Côte-d'Or";
		case "22":
			return "Côtes-d'Armor";
		case "23":
			return "Creuse";
		case "24":
			return "Dordogne";
		case "25":
			return "Doubs";
		case "26":
			return "Drôme";
		case "27":
			return "Eure";
		case "28":
			return "Eure-et-Loir";
		case "29":
			return "Finistère";
		case "2A":
			return "Corse-du-Sud";
		case "2B":
			return "Haute-Corse";
		case "30":
			return "Gard";
		case "31":
			return "Haute-Garonne";
		case "32":
			return "Gers";
		case "33":
			return "Gironde";
		case "34":
			return "Hérault";
		case "35":
			return "Ille-et-Vilaine";
		case "36":
			return "Indre";
		case "37":
			return "Indre-et-Loire";
		case "38":
			return "Isère";
		case "39":
			return "Jura";
		case "40":
			return "Landes";
		case "41":
			return "Loir-et-Cher";
		case "42":
			return "Loire";
		case "43":
			return "Haute-Loire";
		case "44":
			return "Loire-Atlantique";
		case "45":
			return "Loiret";
		case "46":
			return "Lot";
		case "47":
			return "Lot-et-Garonne";
		case "48":
			return "Lozère";
		case "49":
			return "Maine-et-Loire";
		case "50":
			return "Manche";
		case "51":
			return "Marne";
		case "52":
			return "Haute-Marne";
		case "53":
			return "Mayenne";
		case "54":
			return "Meurthe-et-Moselle";
		case "55":
			return "Meuse";
		case "56":
			return "Morbihan";
		case "57":
			return "Moselle";
		case "58":
			return "Nièvre";
		case "59":
			return "Nord";
		case "60":
			return "Oise";
		case "61":
			return "Orne";
		case "62":
			return "Pas-de-Calais";
		case "63":
			return "Puy-de-Dôme";
		case "64":
			return "Pyrénées-Atlantiques";
		case "65":
			return "Hautes-Pyrénées";
		case "66":
			return "Pyrénées-Orientales";
		case "67":
			return "Bas-Rhin";
		case "68":
			return "Haut-Rhin";
		case "69":
			return "Rhône";
		case "70":
			return "Haute-Saône";
		case "71":
			return "Saône-et-Loire";
		case "72":
			return "Sarthe";
		case "73":
			return "Savoie";
		case "74":
			return "Haute-Savoie";
		case "75":
			return "Paris";
		case "76":
			return "Seine-Maritime";
		case "77":
			return "Seine-et-Marne";
		case "78":
			return "Yvelines";
		case "79":
			return "Deux-Sèvres";
		case "80":
			return "Somme";
		case "81":
			return "Tarn";
		case "82":
			return "Tarn-et-Garonne";
		case "83":
			return "Var";
		case "84":
			return "Vaucluse";
		case "85":
			return "Vendée";
		case "86":
			return "Vienne";
		case "87":
			return "Haute-Vienne";
		case "88":
			return "Vosges";
		case "89":
			return "Yonne";
		case "90":
			return "Territoire de Belfort";
		case "91":
			return "Essonne";
		case "92":
			return "Hauts-de-Seine";
		case "93":
			return "Seine-Saint-Denis";
		case "94":
			return "Val-de-Marne";
		case "95":
			return "Val-d'Oise";
		case "971":
			return "Guadeloupe";
		case "972":
			return "Martinique";
		case "973":
			return "Guyane";
		case "974":
			return "La Réunion";
		case "975":
			return "Saint-Pierre-et-Miquelon";
		case "976":
			return "Mayotte";
		default:
			return "";
	}
}
