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

    // delete an application
    app.delete('/delete_application/:application_id', async (req, res) => {
        const applicationId = req.params.application_id;

        try {
            await Application.delete(database, applicationId);
            res.status(200).send('Application deleted successfully.');
        } catch (err) {
            console.error('Failed to delete application:', err);
            res.status(400).send('Error deleting application. Details: ' + err.message);
        }
    });
}

// export the specified entry point
module.exports = main;