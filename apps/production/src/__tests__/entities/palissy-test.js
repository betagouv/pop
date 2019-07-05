import Palissy from "../../entities/Palissy";
import utils from "../../scenes/import/utils";
import fs from "fs";

test("Create new Palissy entity without errors from file palissy-mh-valid-UTF-8.csv", async () => {
  const contents = new Blob([
    fs.readFileSync(__dirname + "/../__notices__/palissy-mh-valid-UTF-8.csv", "utf-8")
  ]);
  const csv = await utils.readCSV(contents, "|", "UTF-8");
  const notices = csv.map(notice => {
    expect(notice.REF.indexOf("PM")).not.toBe(-1);
    return new Palissy(notice);
  });
  expect(notices).toHaveLength(3);
  notices.forEach(notice => {
    // The last notice should raise an error
    expect(notice._errors).toHaveLength(notice.REF === 'PM02001223' ? 1 : 0);
    // VIDEO must be parsed to array
    expect(notice.VIDEO).toBeInstanceOf(Array);
    expect(notice.VIDEO.length).toBeGreaterThanOrEqual(1);
  });
  expect(notices[2].AUTP).toBe("é, Anonyme");
});
