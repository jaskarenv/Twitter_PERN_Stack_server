CREATE DATABASE twitter;

CREATE TABLE tweet(
  tweet_id SERIAL PRIMARY KEY,
  name VARCHAR(25),
  description VARCHAR(255)
);