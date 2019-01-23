import Mnr from "../../entities/Mnr";
import utils from "../../scenes/import/utils";
import fs from "fs";

test("Create new Mnr entity without errors from file mnr-valid-UTF-8.csv", async () => {
  const contents = new Blob([
    fs.readFileSync(__dirname + "/../__notices__/mnr-valid-UTF-8.csv", "utf-8")
  ]);
  const csv = await utils.readCSV(contents, ";", "UTF-8", '"');
  const notices = csv.map(notice => new Mnr(notice));

  expect(notices).toHaveLength(1);
  notices.forEach(notice => {
    // This notice is valid and must have no errors.
    expect(notice._errors).toHaveLength(0);
  });
});
