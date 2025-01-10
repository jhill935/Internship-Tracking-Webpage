// COPY THESE LINES INTO NEW FILE TO CREATE A SEPARATE TEST FILE: **************

const server = require('../index');
const chai = require('chai'); 
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// ********** EVERYTHING BELOW HERE IS DIFFERENT FOR EACH TEST FILE ************

describe('Application Server Tests', () => {

  // DEPRECATED - ny_applications page now only shows applications associated
  // with the user that is logged in, so there is no public my_applications
  // Test case for /my_applications endpoint
  // it('/my_applications should return list of applications', done => {
  //   chai
  //     .request(server)
  //     .get('/my_applications')
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       done();
  //     });
  // });

  // Test case for /save_application endpoint
  it('/save_application should save a new application', done => {
    const newApplication = {
      username: 'Technostalgic',
      employer: 'Test Employer',
      job_title: 'Test Job',
      application_status: 'Applied',
      salary: 50000,
      interview_rounds: 1
    };
    chai
      .request(server)
      .post('/save_application')
      .send(newApplication)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('application_id');
        done();
      });
  });

  // Test case for /edit_application/:application_id endpoint
  it('/edit_application/:application_id should edit an application', done => {
    const updatedApplication = {
      employer: 'Updated Employer',
      job_title: 'Updated Job',
      application_status: 'Interview Scheduled',
      salary: 60000,
      interview_rounds: 2
    };
    chai
      .request(server)
      .post('/edit_application/1')
      .send(updatedApplication)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test case for /delete_application/:application_id endpoint
  it('/delete_application/:application_id should delete an application', done => {
    chai
      .request(server)
      .delete('/delete_application/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
