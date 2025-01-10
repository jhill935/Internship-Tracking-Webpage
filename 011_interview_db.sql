DROP TABLE IF EXISTS interviewers CASCADE;

CREATE TABLE IF NOT EXISTS interviewers
(
  interviewer_id SERIAL PRIMARY KEY,          -- Unique identifier for each interviewer
  application_id INT REFERENCES application(application_id) ON DELETE CASCADE, --relation
  name VARCHAR(100) NOT NULL,                 -- Full name of the interviewer
  position VARCHAR(100) NOT NULL,             -- Position or job title of the interviewer
  email VARCHAR(100) UNIQUE NOT NULL,         -- Email address (unique for each interviewer)
  phone_number VARCHAR(15),                   -- Contact phone number of the interviewer
  misc_data TEXT                              -- Additional notes or miscellaneous data about the interviewer
);