const { Application } = require('../modules/application');
const { PageContext } = require('../modules/page_context');

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

    // render editApplication page
    app.get('/edit_application/:application_id', async (req, res) => {
        const applicationId = parseInt(req.params.application_id, 10);

        try {
            const application = await Application.fetchById(database, applicationId);
            if (!application) {
                return res.status(404).send('Application not found');
            }
            const pageContext = PageContext.Create(app, req, { application });
            res.render('pages/editApplication', pageContext);
        } catch (err) {
            console.error('Failed to render edit application page:', err);
            res.status(500).send('An error occurred while rendering the edit application page. Please try again later. Details: ' + err.message);
        }
    });
}

// export the specified entry point
module.exports = main;