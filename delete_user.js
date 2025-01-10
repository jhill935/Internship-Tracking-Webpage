const bcrypt = require('bcryptjs');

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

  app.delete('/user', async (req, res) => {
    if (!req.session.user) {
      console.warn("attempt to delete user while not logged in");
      res.status(400).end();
      return;
    }

    const user = {
      username: req.body.username,
			password: req.body.password
    }

    console.log("attempting to delete user " + user.username);
    await bcrypt.hash(user.password, 10)
      .then(pass_hashed => {
        user.password = pass_hashed;
      })
      .catch(err => {
        res.status(400);
        return;
      });

    let user_exists = false;
    await database.one("SELECT username FROM users WHERE username = $1;", [user.username])
    .then(data => {
      user_exists = true;
    })
    .catch(err => {
      res.status(400);
      return;      
    });

    if (!user_exists) {
      res.status(400);
      return;
    }

    const delete_query = "DELETE FROM users WHERE username = $1;";
    await database.any(delete_query, [user.username])
    .then(data => {
      res.status(200);
    })
    .catch(err => {
      console.warn("Unable to delete user!");
      return;
    })
  }); 
}

// export the specified entry point
module.exports = main;