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

	// display homepage when connecting to website root
	app.get('/view_post/:id', (req, res) => {
		console.log("viewing post id:", req.params.id)
		const post_id = Number.parseInt(req.params["id"])
		database.one("SELECT * FROM posts WHERE post_id=$1", [post_id])
			.then(async (data) => {
				const comments = await database.any(
					`
					SELECT * FROM comments WHERE post_id=$1
					ORDER BY time_posted DESC
					`, 
					[post_id]
				)
				console.log("found ", comments.length, " comments")
				res.status(200).render('pages/viewPost', PageContext.Create(app, req, {
					post: data,
					comments
				}));
			})
			.catch((err) => {
				console.error(err);
				res.status(400).send(err);
			});
	})
}

// export the specified entry point
module.exports = main;
