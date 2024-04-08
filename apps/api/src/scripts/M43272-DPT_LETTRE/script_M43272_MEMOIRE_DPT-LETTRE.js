notices = db.memoire
	.find({ $and: [{ DPT: { $gt: [] } }, { DPT_LETTRE: { $eq: [] } }] })
	.noCursorTimeout();
noticeCount = notices.count();

notices.forEach((notice) => {
	dpt_lettre = notice.DPT.map((element) => getDepartement(element));
	db.memoire.update(
		{ REF: notice.REF },
		{
			$set: {
				DPT_LETTRE: dpt_lettre,
			},
		},
	);
	noticeCount--;
	print(`${noticeCount} notices restantes`);
});

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
