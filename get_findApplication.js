const UserPost = require('../modules/user_post');
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
    const page = 1;
    const page_size = 10;

    // render findApplications page
    app.get('/find_applications', (req, res) => {
      UserPost.UserPost.FetchPostsByDate(database, page_size, (page - 1) * page_size)
        .then(data => {
          res.render(
            'pages/findApplications', 
            PageContext.Create(app, req, {posts: data})
          )
        })
        .catch(err => {
          console.error(err)
          res.status(400).end()
        });
    })
}

// export the specified entry point
module.exports = main;