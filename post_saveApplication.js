const { Application } = require('../modules/application');

/**
 * entry point for the route module, this function is immediately called when
 * the file is loaded by index.js
 * @typedef {import('express').Express} ExpressJs
 * @typedef {import('pg-promise').IDatabase} IDatabase
 * @param {ExpressJs} app 
 */
function main(app){

    // get handle to database from app
    /** @type {IDatabase} */
    const database = app.database;

    // save new application
    app.post('/save_application', async (req, res) => {
        console.log('Request received to save application:', req.body); // Log request data

        // Parse the input values with more type safety
        let newApplication = Application.FromJson(req.body);

        // insert user associated with application
        if (req.session.user?.username){
            newApplication.username = req.session.user.username;
        }

        // Explicitly parse the optional values to ensure they are the correct type
        newApplication.salary = parseFloat(req.body.salary) || 0;
        newApplication.interview_rounds = parseInt(req.body.interview_rounds) || 0;
        if (req.body.application_date) {
            newApplication.application_date = new Date(req.body.application_date);
        } else {
            newApplication.application_date = new Date();
        }

        // Format the application_date for display purposes
        newApplication.application_date = newApplication.application_date.toISOString().split('T')[0];

        // Validate input
        if (!newApplication.employer || !newApplication.job_title || !newApplication.application_status) {
            console.error('Validation failed. Missing required fields:', req.body);
            res.status(400).send('Error: Missing required fields: employer, job title, or application status.');
            return;
        }

        console.log('Parsed new application:', newApplication); // Log parsed application details

        try {
            const applicationId = await newApplication.save(database);
            console.log('Application saved successfully:', applicationId); // Log success
            res.status(200).json({ application_id: applicationId });
        } catch (err) {
            console.error('Failed to save application. Detailed error:', err);
            let errorMessage = 'Error saving application.';
            if (err.code === '23505') {
                errorMessage = 'Duplicate entry. The application already exists.';
            } else if (err.code === '23502') {
                errorMessage = 'Missing required field.';
            } else if (err.code === '23503') {
                errorMessage = 'Foreign key violation. Please check your input.';
            } else if (err.code) {
                errorMessage = `Database error code ${err.code}: ${err.detail || err.message}`;
            } else {
                errorMessage = `Unexpected error: ${err.message}`;
            }
            res.status(400).send(`${errorMessage} Details: ${err.message}`);
        }
    });
}

// export the specified entry point
module.exports = main;

