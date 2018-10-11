/* global describe, beforeEach, it */

// During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");

const server = require("../src/");
const Joconde = require("../src/models/joconde");

chai.should();

chai.use(chaiHttp);

// Our parent block
describe("Joconde", () => {
  beforeEach(done => {
    // Before each test we empty the database
    Joconde.remove({}, e => {
      done();
    });
  });

  /** Test the /GET route **/
  describe("/GET joconde", () => {
    it("it should GET all the joconde", done => {
      chai
        .request(server)
        .get("/joconde")
        .end((e, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
