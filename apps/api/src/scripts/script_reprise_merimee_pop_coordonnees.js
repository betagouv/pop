//Récuperation des notices de la base merimee
//Cette requête s'exprime ainsi: Récupère les notices de la base mérimée où: ((COOR ou COORM) && ZONE sont renseignés && POP_CONTIENT_GEOLOCALISATION = non) OU (latitude && longitude = 0 && POP_CONTIENT_GEOLOCALISATION = non)
let notices = db.merimee.find({ $or: [{ $and: [{ $or: [{ COOR: { $ne: "" } }, { COORM: { $ne: "" } }] }, { ZONE: { $ne: "" } }, { POP_CONTIENT_GEOLOCALISATION: "non" }] }, { $and: [{ "POP_COORDONNEES.lat": { $ne: 0 } }, { "POP_COORDONNEES.lon": { $ne: 0 } }, { POP_CONTIENT_GEOLOCALISATION: "non" }] }] }).noCursorTimeout();

let noticeCount = notices.count(); //le nombre de notices trouvé en base

notices.forEach(notice => {
	const ref = notice.REF;

	db.merimee.update(

		{ REF: ref },
		{ $set: { POP_CONTIENT_GEOLOCALISATION: "oui" } }

	);

	noticeCount--;

	print(noticeCount + " notices restantes");
});