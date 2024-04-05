import fs from "node:fs";
import Joconde from "../../entities/Joconde";
import utils from "../../scenes/import/utils";

test("Create new Joconde entities without errors from file joconde-valid-UTF-8.txt", () => {
	const contents = fs.readFileSync(
		`${__dirname}/../__notices__/joconde-valid-UTF-8.txt`,
		"utf-8",
	);
	const notices = utils.parseAjoutPilote(contents, Joconde).map((notice) => {
		const n = new Joconde(notice);
		n.validate(notice);
		return n;
	});

	expect(notices).toHaveLength(3);
	notices.forEach((n) => {
		// This notice is valid and must have no errors.
		expect(n._errors).toHaveLength(0);
		expect(n._warnings).toHaveLength(0);
		// All notices have the same labels (and no errors on encoding)
		expect(n.LABEL).toBe(
			"Musée de France#au sens de la loi n°2002-5 du 4 janvier 2002",
		);
		// DOMN must be parsed to array
		expect(n.DOMN).toBeInstanceOf(Array);
		expect(n.DOMN.length).toBeGreaterThanOrEqual(1);
		expect(n.DOMN).toContain("archéologie");
	});
	expect(notices[0].IMG).toEqual([
		"joconde/01610014032/0016630.jpg",
		"joconde/01610014032/0016631.jpg",
	]);
	expect(notices[1].IMG).toEqual(["joconde/01610014134/0016790.jpg"]);
});

test("Create new Joconde entities with warnings from file joconde-valid-UTF-8-warnings.txt", () => {
	const contents = fs.readFileSync(
		`${__dirname}/../__notices__/joconde-valid-UTF-8-warnings.txt`,
		"utf-8",
	);
	const notices = utils.parseAjoutPilote(contents, Joconde).map((value) => {
		const n = new Joconde(value);
		n.validate(value);
		return n;
	});
	expect(notices).toHaveLength(1);
	expect(notices[0]._warnings).toHaveLength(2);
});
