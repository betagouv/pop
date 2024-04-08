notices = db.joconde
	.find({
		$or: [
			{
				$and: [
					{ "POP_COORDONNEES.lat": { $eq: 0 } },
					{ MUSEO: { $gt: "" } },
				],
			},
			{
				$and: [
					{ "POP_COORDONNEES.lon": { $eq: 0 } },
					{ MUSEO: { $gt: "" } },
				],
			},
		],
	})
	.noCursorTimeout();
nbreNotices = notices.count();

print(nbreNotices);

notices.forEach((notice) => {
	const noticeMuseo = db.museo.findOne({ REF: notice.MUSEO });

	if (noticeMuseo && "oui" === noticeMuseo.POP_CONTIENT_GEOLOCALISATION) {
		db.joconde.update(
			{ REF: notice.REF },
			{
				$set: {
					POP_COORDONNEES: noticeMuseo.POP_COORDONNEES,
					POP_CONTIENT_GEOLOCALISATION:
						noticeMuseo.POP_CONTIENT_GEOLOCALISATION,
				},
			},
		);
	}
	nbreNotices--;
	print(`${nbreNotices} notices restantes`);
});
