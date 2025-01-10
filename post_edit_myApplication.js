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

    // edit an existing application
    app.post('/edit_application/:application_id', async (req, res) => {
        const applicationId = req.params.application_id;
        const updatedApplication = Application.FromJson(req.body);
        updatedApplication.application_id = applicationId;

        // Validate input
        if (!updatedApplication.application_status || updatedApplication.interview_rounds == null) {
            console.error('Validation failed. Missing required fields:', req.body);
            res.status(400).send('Error: Missing required fields: application status or interview rounds.');
            return;
        }

        try {
            await updatedApplication.update(database);
            console.log('Application updated successfully:', applicationId);
            res.status(200).send('Application updated successfully.');
        } catch (err) {
            console.error('Failed to update application:', err);
            res.status(400).send('Error updating application. Details: ' + err.message);
        }
    });
}

// export the specified entry point
module.exports = main;