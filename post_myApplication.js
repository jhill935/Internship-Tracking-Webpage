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

    // retrieve and display applications
    app.post('/my_applications', async (req, res) => {
        try {
            const applications = await Application.fetchAll(database);
            res.status(200).json(applications);
        } catch (err) {
            console.error('Failed to fetch applications:', err);
            res.status(400).send('Error fetching applications. Details: ' + err.message);
        }
    });
}

// export the specified entry point
module.exports = main;