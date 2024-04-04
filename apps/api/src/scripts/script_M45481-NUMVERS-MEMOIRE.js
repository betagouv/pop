notices = db.memoire
	.find({
		$and: [
			{ PRODUCTEUR: { $regex: /MPP/ } },
			{ REF: { $regex: /^APMH/ } },
			{ NUMVERS: { $eq: "" } },
			{ TYPDOC: { $regex: /.*négatif.*/i } },
		],
	})
	.noCursorTimeout();
nbreNotices = notices.count();

print(nbreNotices);

notices.forEach((notice) => {
	db.memoire.update(
		{ REF: notice.REF },
		{
			$set: {
				NUMVERS: "J/80/490",
			},
		},
	);
	nbreNotices--;
	print(nbreNotices + " notices restantes");
});
