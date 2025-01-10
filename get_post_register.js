const bcrypt = require('bcryptjs');
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
	const database = app.database

	// display register page
	app.get('/register', (req, res) => {

		// ensure user is not logged in
		if (req.session.user) {
			console.warn("attempt to access register while logged in, redirecting..")
			res.status(400).redirect('/')
			return
		}

		// display registration page
		res.render('pages/register');
	});

	// process register request
	app.post('/register', async (req, res) => {

		// ensure user is not already logged in
		if (req.session.user) {
			console.warn("abort attempt to register while logged in")
			res.status(400).end()
			return
		}

		// ensure username and password are valid
		if (req.body.username.length <= 0 || req.body.password.length <= 0) {
			res.status(400).render("pages/register", PageContext.Create(app, req))
			return
		}

		// create object to store user data
		const user = {
			username: req.body.username,
			password: req.body.password
		}
		console.log("attempting register new user '" + user.username + "'")

		// hash the password
		await bcrypt.hash(user.password, 10)
			.then(pass_hashed => {
				user.password = pass_hashed
			})
			.catch(err => {
				res.status(400).render("pages/register", PageContext.Create(app, req))
				throw err
			})

		// ensure the user does not already exist
		let user_exists = false
		await database.none("SELECT username FROM users WHERE username = $1", [user.username])
			.catch(err => {
				console.warn(err)
				user_exists = true
			})
		if (user_exists) {
			console.warn("User '" + user.username + "' already exists - abort registration")
			res.status(400).render(
				"pages/register", 
				PageContext.Create(app, req, {
					popup: { message: "Username already taken, choose another" }
				})
			)
			return
		}

		// insert new user entry
		const query = (
			"INSERT INTO users (username, password, description) " +
			"VALUES ($1, $2, 'empty') " +
			"ON CONFLICT (username) DO NOTHING " +
			"RETURNING *"
		)
		await database.one(query, [user.username, user.password])
			.then((data) => {
				res.status(200).redirect("/login")
				console.log("registered new user", data)
			})
			.catch(err => {
				res.status(400).render("pages/register", PageContext.Create(app, req))
				throw err
			})
	});
}

// export the specified entry point
module.exports = main;