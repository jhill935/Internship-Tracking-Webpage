/**
 * @typedef {import('express-session').Session} Session
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Express} ExpressJs
 */

/**
 * a data structure that should contain all relevant data required for page rendering
 */
class PageContext{

	/** @type {Session} */
	session
	/** @type {ExpressJs} */
	app

	/**
	 * Creates a page context
	 * @param {ExpressJs} app 
	 * @param {Request} req 
	 * @param {any} data 
	 */
	static Create(app, req, data = {}) {
		let m = new PageContext()
		m.setRequest(req)
		for(let key in data){
			if(m[key] === undefined){
				m[key] = data[key]
			}
		}
		return m
	}

	/**
	 * @param {Request} req 
	 */
	setRequest(req){
		this.session = req.session
		this.app = req.app
	}

	/**
	 * @param {ExpressJs} app 
	 */
	setApp(app){
		// this.app = app
	}
}

module.exports = {
	PageContext
}