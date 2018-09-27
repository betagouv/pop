import Palissy from '../../entities/palissy';
import utils from '../../scenes/import/utils';
import fs from 'fs'

test('Create new Palissy entity without errors from file palissy-mh-valid-UTF-8.csv', async () => {

  const contents = new Blob([fs.readFileSync(__dirname + '/../__notices__/palissy-mh-valid-UTF-8.csv', 'utf-8')]);
  const csv = await utils.readCSV(contents, '|', 'UTF-8');
  const notices = csv.map(notice => {
    expect(notice.REF.indexOf('PM')).not.toBe(-1);
    return new Palissy(notice)
  });
  expect(notices).toHaveLength(3);
  notices.forEach(notice => {
    // This notice is valid and must have no errors.
    expect(notice._errors).toHaveLength(0);
    // VIDEO must be parsed to array
    expect(notice.VIDEO.value).toBeInstanceOf(Array);
    expect(notice.VIDEO.value.length).toBeGreaterThanOrEqual(1);
  });
  expect(notices[2].AUTP.value).toBe('é, Anonyme');
});
