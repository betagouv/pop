
const mailer = require("../mailer");

describe("Testing Mailer", () => {

  it('should have correctly construct Mailer', () => {
    expect(mailer.send).toBeDefined();
  });

  it('should correctly send email', async () => {
    const subject = 'Jest Test email';
    const to = 'antoine.bigard@beta.gouv.fr, sebastien.legoff@beta.gouv.fr';
    const body = 'Bonjour!<br /><br />Jest';
    await mailer.send(subject, to, body);
  });
});
