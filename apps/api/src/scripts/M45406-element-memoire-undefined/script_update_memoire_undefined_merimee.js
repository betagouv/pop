notices = db.merimee
	.find({ MEMOIRE: { $elemMatch: { $type: "undefined" } } })
	.noCursorTimeout();
nbreNotices = notices.count();

print(nbreNotices);

notices.forEach((notice) => {
	let arrayMemoire = notice.MEMOIRE.filter(
		(element) => typeof element !== "undefined",
	);

	db.merimee.update(
		{ REF: notice.REF },
		{
			$set: {
				MEMOIRE: arrayMemoire,
			},
		},
	);
	nbreNotices--;
	print(nbreNotices + " notices restantes");
});
