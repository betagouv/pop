const notices = db.palissy
	.find({ MEMOIRE: { $gt: { $size: 0 } } })
	.noCursorTimeout();
let nbreNotices = notices.count();

print(nbreNotices);

notices.forEach((notice) => {
	const arrayMemoire = notice.MEMOIRE.map((element) => {
		const noticeMemoire = db.memoire.findOne({ REF: element.ref });
		if (noticeMemoire) {
			element.ref = noticeMemoire.REF;
			element.url = noticeMemoire.IMG;
			element.copy = noticeMemoire.COPY;
		}
		return element;
	});

	db.palissy.update(
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
