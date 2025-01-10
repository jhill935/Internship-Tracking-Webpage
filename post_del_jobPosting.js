const UserPost = require("../modules/user_post.js")

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

	// get all jobs posted by user specified in request body
	app.get('/job_posting', async (req, res) => {
		const username = req.body.username
		const results = await UserPost.UserPost.FetchPostsByUser(database, username)
			.catch(err => {console.error(err); res.status(400).send()})
		res.status(200).json(results)
	})

	// store user post
	app.post('/job_posting', async (req, res) => {

		// ensure user is logged in before allowing post to be created
		if(!req.session.user){
			console.error("Attempting to create job post while not logged in!")
			res.status(400).end()
			return
		}
		
		// ensure the post is authored by the user that's currently logged in
		const job_post = UserPost.UserPost.FromJson(req.body)
		job_post.username = req.session.user.username

		const success = await job_post.storeInDB(database)
		if(success){
			console.log("Created job post!")
			res.status(200).json(job_post)
		}
		else{
			console.error("failed to create job post")
			res.status(400).end()
		}
	})

	// delete the post with post_id specified in request body
	app.delete('/job_posting', (req, res) => {
		const post_id = req.body.post_id
		UserPost.UserPost.DeletePost(database, post_id)
			.then(() => {res.status(200).send()})
			.catch(err => {console.error(err)})
	})
}

// export the specified entry point
module.exports = main;
