/**
 * @typedef {import('pg-promise').IDatabase} IDatabase
 */

/**
 * data structure that represents data pertaining to a job application
 */
class Application {

    /** @type {number} application_id The unique application id for this application */
    application_id;
    /** @type {string} the user that the application belongs to */
    username;
    /** @type {string} employer The employer for the job application */
    employer;
    /** @type {string} job_title The title of the job applied for */
    job_title;
    /** @type {string} application_date The date of application */
    application_date;
    /** @type {number} salary The salary offered */
    salary;
    /** @type {string} application_status The current status of the application */
    application_status;
    /** @type {number} interview_rounds The number of interview rounds */
    interview_rounds;

    constructor() {
        this.application_id = null;
        this.username = "";
        this.employer = "";
        this.job_title = "";
        this.application_date = new Date();
        this.salary = 0;
        this.application_status = "";
        this.interview_rounds = 0;
    }

    /**
     * Create an Application object from any JSON data object
     * @param {any} json 
     * @returns {Application}
     */
    static FromJson(json) {
        let app = new Application();
        for (let key in app) {
            if (json[key] !== undefined) {
                app[key] = json[key];
            }
        }
        return app;
    }

    /**
     * Save the application to the database
     * @param {IDatabase} database 
     * @returns {Promise<number>}
     */
    async save(database) {
        const query = `
            INSERT INTO application (username, employer, job_title, application_date, salary, application_status, interview_rounds)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING application_id;
        `;
        const values = [
            this.username,
            this.employer,
            this.job_title,
            this.application_date,
            this.salary,
            this.application_status,
            this.interview_rounds
        ];
        try {
            const result = await database.one(query, values);
            this.application_id = result.application_id;
            return this.application_id;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Update the application in the database
     * @param {IDatabase} database 
     * @returns {Promise<void>}
     */
    async update(database) {
        const query = `
            UPDATE application
            SET employer = $1, job_title = $2, application_date = $3, salary = $4, application_status = $5, interview_rounds = $6
            WHERE application_id = $7;
        `;
        const values = [
            this.employer,
            this.job_title,
            this.application_date,
            this.salary,
            this.application_status,
            this.interview_rounds,
            this.application_id
        ];
        try {
            await database.none(query, values);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Delete the application from the database
     * @param {IDatabase} database 
     * @returns {Promise<void>}
     */
    static async delete(database, application_id) {
        const query = `DELETE FROM application WHERE application_id = $1;`;
        try {
            await database.none(query, [application_id]);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Fetch application by ID
     * @param {IDatabase} database
     * @param {number} applicationId
     * @returns {Promise<Application>}
     */
    static async fetchById(database, applicationId) {
        const query = `SELECT * FROM application WHERE application_id = $1;`;
        try {
            const data = await database.oneOrNone(query, [applicationId]);
            return data ? Application.FromJson(data) : null;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Fetch applications by a filter
     * @param {IDatabase} database 
     * @returns {Promise<Array<Application>>}
     */
    static async fetchAll(database) {
        const query = `SELECT * FROM application ORDER BY application_date DESC;`;
        try {
            const data = await database.any(query);
            return data.map(app => Application.FromJson(app));
        } catch (err) {
            throw err;
        }
    }
    
    /**
     * Fetch applications by user
     * @param {IDatabase} database 
     * @param {string} username
     * @returns {Promise<Array<Application>>}
     */
    static async fetchByUser(database, username) {
        const query = `
            SELECT * FROM application 
            WHERE username=$1 
            ORDER BY application_date DESC;`;
        try {
            const data = await database.any(query, [username]);
            return data.map(app => Application.FromJson(app));
        } catch (err) {
            throw err;
        }
    }

}

// Export the Application class
module.exports = {
    Application
};
