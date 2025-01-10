/**
 * @typedef {import('pg-promise').IDatabase} IDatabase
 */

class Comment {
    /** @type {number} application_id The unique application id for this application */
    comment_id;
    /** @type {number} employer The employer for the job application */
    post_id;
    /** @type {string} job_title The title of the job applied for */
    username;
    /** @type {string} application_date The date of application */
    body;
    /** @type {Date} salary The salary offered */
    time_posted;

	constructor(){ }

	/**
	 * create a UserPost object from any JSON data object, so that you can use 
	 * the member methods
	 * @param {any} json 
	 * @returns {Comment}
	 */
	static FromJson(json){
		var m = new Comment()
		for(let key in m){
			if(json[key]){
				m[key] = json[key]
			}
		}
		return m
	}
}

module.exports = {
	Comment
}