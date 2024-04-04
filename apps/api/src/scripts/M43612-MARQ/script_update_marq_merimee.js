notices = db.merimee
	.find({ MEMOIRE: { $elemMatch: { marq: { $exists: false } } } })
	.noCursorTimeout();
nbreNotices = notices.count();

print(nbreNotices);

notices.forEach((notice) => {
	let arrayMemoire = notice.MEMOIRE.map((element) => {
		let addNotice = true;
		if (typeof element.marq === "undefined") {
			let noticeMemoire = db.memoire.findOne({ REF: element.ref });
			if (noticeMemoire) {
				element.ref = noticeMemoire.REF;
				element.url = noticeMemoire.IMG;
				element.copy = noticeMemoire.COPY;
				element.marq = noticeMemoire.MARQ;
			} else {
				addNotice = false;
			}
		}
		if (addNotice) {
			return element;
		}
	});

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
