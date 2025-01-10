DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users
(
  username VARCHAR(50) PRIMARY KEY,
  password CHAR(60) NOT NULL,
  description VARCHAR(250),
  image_url CHAR(256) DEFAULT 'https://placehold.co/128x128.png'
);