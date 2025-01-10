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
    const database = app.database

	// display forgot password page when url is requested
	app.get('/forgot_password', (req, res) => {
		res.render('pages/forgotPassword', PageContext.Create(app, req));
	})
}

// export the specified entry point
module.exports = main;