const { PageContext } = require('../modules/page_context');

/**
 * entry point for the route module, this function is immediately called when
 * the file is loaded by index.js
 * @typedef {import('express').Express} ExpressJs
 * @typedef {import('pg-promise').IDatabase} IDatabase
 * @param {ExpressJs} app 
 */
function main(app){

    // render addApplication page
    app.get('/add_application', (req, res) => {
        try {
            const pageContext = PageContext.Create(app, req);
            res.render('pages/addApplication', pageContext);
        } catch (err) {
            console.error('Failed to render add application page:', err);
            res.status(500).send('An error occurred while rendering the add application page. Please try again later. Details: ' + err.message);
        }
    });
}

// export the specified entry point
module.exports = main;