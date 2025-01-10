// COPY THESE LINES INTO NEW FILE TO CREATE A SEPARATE TEST FILE: **************

const server = require('../index');
const chai = require('chai'); 
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// ********** EVERYTHING BELOW HERE IS DIFFERENT FOR EACH TEST FILE ************

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Responds to GET at root', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});