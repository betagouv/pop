import Palissy from "../../entities/Palissy";
import utils from "../../scenes/import/utils";
import fs from "fs";

test("Create new Palissy entities from file palissy-mh-valid-UTF-8.csv", async () => {
  const contents = new Blob([
    fs.readFileSync(__dirname + "/../__notices__/palissy-mh-valid-UTF-8.csv", "utf-8")
  ]);
  const csv = await utils.readCSV(contents, "|", "UTF-8");
  const notices = csv.map(notice => {
    expect(notice.REF.indexOf("PM")).not.toBe(-1);
    const n = new Palissy(notice);
    n.validate(notice);
    return n;
  });
  expect(notices).toHaveLength(3);
  const [n1, n2, n3] = notices;
  // n1 has 2 warnings and 0 errors.
  expect(n1._errors).toHaveLength(0);
  expect(n1._warnings).toHaveLength(2);
  // VIDEO must be parsed to array
  expect(n1.VIDEO).toBeInstanceOf(Array);
  expect(n1.VIDEO.length).toBeGreaterThanOrEqual(1);
  // n1 has 0 warnings and 0 errors.
  expect(n2._errors).toHaveLength(0);
  expect(n2._warnings).toHaveLength(0);
  // n1 has 5 warnings and 1 errors.
  expect(n3._errors).toHaveLength(1);
  expect(n3._warnings).toHaveLength(5);

  expect(notices[2].AUTP).toBe("é, Anonyme");
});
