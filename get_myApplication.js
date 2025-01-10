const { Application } = require('../modules/application');
const { PageContext } = require('../modules/page_context');
const handlebars = require('handlebars');

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

    // render myApplications page with applications data
    app.get('/my_applications', (req, res) => {
        if (!req.session.user){
            console.error('attempt to access my applications while not logged in');
            res.status(400).send("You must be logged in");
            return;
        }
        Application.fetchByUser(database, req.session.user.username)
            .then(applications => {
                res.render('pages/myApplications', PageContext.Create(app, req, { applications }));
            })
            .catch(err => {
                console.error('Failed to render my applications:', err);
                res.status(400).send('An error occurred while fetching applications. Please try again later. Details: ' + err.message);
            });
    });
}

// export the specified entry point
module.exports = main;


