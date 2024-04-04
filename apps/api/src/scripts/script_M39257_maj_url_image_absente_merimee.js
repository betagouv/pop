const notices = db.merimee.find({ MEMOIRE: { $eq: [] } });
const nbreNotices = notices.count();
let countUpdate = 0;

print(nbreNotices);

notices.forEach((notice) => {
	// On récupère les notices MEMOIRE liées
	const noticesMemoire = db.memoire.find({
		LBASE: { $elemMatch: { $eq: notice.REF } },
	});

	// Construction du tableau MEMOIRE
	const arrayMemoire = noticesMemoire
		.map((noticeMemoire) => {
			if (noticeMemoire) {
				const memoire = {};
				memoire._id = noticeMemoire._id;
				memoire.ref = noticeMemoire.REF;
				memoire.url = noticeMemoire.IMG;
				memoire.copy = noticeMemoire.COPY;
				memoire.name = noticeMemoire.LEG;

				return memoire;
			}
		})
		.filter((val) => val);

	if (arrayMemoire.length > 0) {
		db.merimee.update(
			{ REF: notice.REF },
			{
				$set: {
					MEMOIRE: arrayMemoire,
				},
			},
		);

		countUpdate++;
	}
});

print(`${countUpdate} notices mise à jour`);
