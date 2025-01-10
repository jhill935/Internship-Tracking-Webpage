const { PageContext } = require('../modules/page_context');

/**
 * entry point for the route module, this function is immediately called when
 * the file is loaded by index.js
 * @typedef {import('express').Express} ExpressJs
 * @typedef {import('pg-promise').IDatabase} IDatabase
 * @param {ExpressJs} app the ExpressJs app instance is passed into our 
 * 		function from index.js
 */
function main(app) {

  // get handle to database from app
  /** @type {IDatabase} */
  const database = app.database

  // display login page
  app.get('/profile/:username', (req, res) => {

    // ensure user is logged in
    // if(!req.session.user) {
    // 	console.warn("attempt to access profile while not logged in, redirecting to login..")
    // 	res.status(400).redirect('/login')
    // 	return;
    // }

    database.one("SELECT * from users WHERE username = $1;", [req.params.username])
      .then(data => {
        // display page
        res.render('pages/profile', PageContext.Create(app, req, data));
      }).catch(err => {
        res.status(400).redirect('/home');
      });
  })
}

// export the specified entry point
module.exports = main;
