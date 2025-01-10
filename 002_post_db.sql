DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE IF NOT EXISTS posts
(
    post_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    link VARCHAR NOT NULL,
    modality INT,
    body TEXT,
    salary DECIMAL(10,2),
    upvotes INT,
    downvotes INT,
    time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments
(
    comment_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    body TEXT,
    upvotes INT,
    downvotes INT,
    time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users (username),
    FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE CASCADE
);
