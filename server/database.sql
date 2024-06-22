CREATE DATABASE mylig;

CREATE TABLE teams(
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(255)
);

CREATE TABLE matches(
    team_id SERIAL PRIMARY KEY,
    team_name_1 VARCHAR(255),
    team_name_2 VARCHAR(255),
    score_1 INT,
    score_2 INT
);