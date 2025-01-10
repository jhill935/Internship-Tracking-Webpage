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

	// respond to post request at the find applications url
	app.post('/find_applications', (req, res) => {
		res.status(200);
	})
}

// export the specified entry point
module.exports = main;
