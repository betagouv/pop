const notices = db.memoire
	.find({
		COPY: {
			$regex: /^(© Ministère de la Culture \(France\), Médiathèque du patrimoine et de la photographie, diffusion RMN-GP)\s?/,
		},
	})
	.noCursorTimeout();

const bulk = db.memoire.initializeUnorderedBulkOp();

notices.forEach((notice) => {
	bulk.find({ _id: notice._id }).updateOne({
		$set: {
			COPY: "© Ministère de la Culture (France), Médiathèque du patrimoine et de la photographie, diffusion GrandPalaisRmn Photo",
		},
	});
});

print(`Bulk execute ${bulk}`);

bulk.execute();
