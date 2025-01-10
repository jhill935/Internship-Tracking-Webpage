// ********************** Initialize server **********************************

const server = require('../index'); //TODO: Make sure the path to your index.js is correctly added

// ********************** Import Libraries ***********************************

const chai = require('chai'); // Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// ********************** DEFAULT WELCOME TESTCASE ****************************

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });
});

// ********************** REGISTER TEST CASES ****************************
/*
describe('Testing Add User API', () => {

  before((done) => {
    // Ensure the server is ready before running tests
    setTimeout(done, 2000); // Wait for 2 seconds before starting tests
  });


  it('positive : /add_user', done => {
    chai
      .request(server)
      .post('/register')
      .send({ username: 'john_doe', password: 'password123' })
      .end((err, res) => {
        if (err) return done(err);
        
        // Check for a successful redirect
        expect(res).to.have.status(200);
        expect(res.redirects[0]).to.include('/login');
        done();
      });
      
  });

  it('Negative : /add_user. Checking invalid name', done => {
    chai
      .request(server)
      .post('/register')
      .send({ password: 'password123' }) // Missing username
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(400);
        expect(res.text).to.include('Username and password are required');
        done();
      });
      
  });
});

*/






// *********************** TODO: WRITE 2 UNIT TESTCASES **************************

// ********************************************************************************