notices = db.joconde
	.find({
		$and: [
			{ STAT: { $elemMatch: { $regex: /.*don.*/i } } },
			{ STAT: { $not: { $regex: /.*manuel.*/i } } },
			{ STAT: { $not: { $regex: /.*donation.*/i } } },
			{ STAT: { $not: { $regex: /.*don fouille.*/i } } },
			{ STAT: { $not: { $regex: /.*don enquête.*/i } } },
		],
	})
	.noCursorTimeout();
nbreNotices = notices.count();

print(nbreNotices);

notices.forEach((notice) => {
	let arrayStat = notice.STAT.map((value) => {
		if ("don" == value) {
			value = "don manuel";
		}
		return value;
	});

	db.joconde.update(
		{ REF: notice.REF },
		{
			$set: {
				STAT: arrayStat,
			},
		},
	);
	nbreNotices--;
	print(nbreNotices + " notices restantes");
});
