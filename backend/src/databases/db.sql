CREATE DATABASE youtbes;

\c youtbes

CREATE Table users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar TEXT NOT NULL
);

CREATE TABLE files(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_name VARCHAR(233) NOT NULL,
    size INTEGER NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT(CURRENT_TIMESTAMP)
);