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

	// send json status and message on get /welcome
	app.get('/welcome', (_, res) => {
		res.json({status: 'success', message: 'Welcome!'});
	})
	
}

// export the specified entry point
module.exports = main;
