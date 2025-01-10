const UserPost = require('../modules/user_post');
const { PageContext } = require('../modules/page_context');

/**
 * entry point for the route module, this function is immediately called when
 * the file is loaded by index.js
 * @typedef {import('express').Express} ExpressJs
 * @typedef {import('pg-promise').IDatabase} IDatabase
 * @param {ExpressJs} app 
 */
function main(app) {

	// get handle to database from app
	/** @type {IDatabase} */
	const database = app.database;
	const page = 1;
	const page_size = 10;

	// load the page used to create a new application
	app.get("/find_applications/create", (req, res) => {

		// ensure user is logged in
		if (!req.session.user) {
			console.warn("attempt to access post creation while not logged in, redirecting..")
			res.status(400).redirect('/')
			return
		}

		// display page
		res.render('pages/findApplications_create', PageContext.Create(app, req))
	})

	app.post("/find_applications/create", (req, res) => {
		
		// ensure user is logged in
		if (!req.session.user) {
			console.warn("abort attempt to post while not logged in")
			res.status(400).end()
			return
		}

		// insert the data into db
		database.none(
			`INSERT INTO posts (
				username, company_name, position, link, modality, body, salary, upvotes, downvotes
			) VALUES ($1, $2, $3, $4, $5, $6, $7, 0, 0)`, 
			[
				req.session.user.username, 
				req.body.company_name,
				req.body.position,
				req.body.link,
				Number.parseInt(req.body.modality),
				req.body.body,
				Number.parseFloat(req.body.salary),
			]
		)
			// redirect to find application page if success
			.then(() => {
				res.status(200).redirect("/find_applications")
			})
			.catch(err => {
				console.error(err)
				res.status(400).json(err);
			})
	})

	app.delete("/find_applications/remove/:id", async (req, res) => {
				
		// ensure user is logged in
		if (!req.session.user) {
			console.warn("abort attempt to post while not logged in")
			res.status(400).end()
			return
		}
		
		// get post owner
		const post_id = Number.parseInt(req.params.id);
		let post_username = "" 
		await database.one(
			"SELECT username FROM posts WHERE post_id=$1", [post_id]
		).then(data => {post_username = data.username});

		// ensure correct user is logged in
		if (req.session.user.username !== post_username) {
			console.warn("wrong user attempt to remove post")
			res.status(400).end()
			return
		}

		// handle deletion
		database.none("DELETE FROM posts WHERE post_id=$1", [post_id])
			.then(() => {
				console.log("Delete post #", post_id);
				res.status(200).send("Delete success!");
			})
			.catch(err => {
				console.error(err);
				res.status(400).json(err);
			})
	})
}

// export the specified entry point
module.exports = main;