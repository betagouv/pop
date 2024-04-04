notices = db.enluminures.find({ PRODUCTEUR: { $eq: null } }).noCursorTimeout();
nbreNotices = notices.count();

print(nbreNotices);

notices.forEach((notice) => {
	db.enluminures.update(
		{ REF: notice.REF },
		{
			$set: {
				PRODUCTEUR: "Enluminures",
			},
		},
	);
	nbreNotices--;
	print(`${nbreNotices} notices restantes`);
});
