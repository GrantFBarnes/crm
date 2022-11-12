DROP DATABASE IF EXISTS crm;
CREATE DATABASE crm;
USE crm;

CREATE TABLE user (
    id CHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT name_unique UNIQUE (name)
);
INSERT INTO user VALUES ('55d23ad2-62ae-11ed-8d81-8b356765c5ac', 'grant', 'password');

CREATE TABLE company (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    name VARCHAR(255) DEFAULT "",
    city VARCHAR(255) DEFAULT "",
    state VARCHAR(255) DEFAULT "",
    zip VARCHAR(50) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO company VALUES ('b3973f12-7b2a-4729-b102-47bf24a49e5c', '55d23ad2-62ae-11ed-8d81-8b356765c5ac', 'Company 1', 'Rochester', 'Minnesota', '55901');

CREATE TABLE company_contact_info (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,
    type VARCHAR(50) DEFAULT "",
    value VARCHAR(255) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);
INSERT INTO company_contact_info VALUES ('7d7ddf76-f76c-4c20-ba94-6e6f0dc1c62d', '55d23ad2-62ae-11ed-8d81-8b356765c5ac', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'Phone', '555-555-1234');
INSERT INTO company_contact_info VALUES ('9d6b2985-c987-4fce-ac92-6428a46611f4', '55d23ad2-62ae-11ed-8d81-8b356765c5ac', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'Phone', '555-555-5678');
INSERT INTO company_contact_info VALUES ('0f4af91c-0d0e-41f5-b96e-dbe2428ae6f1', '55d23ad2-62ae-11ed-8d81-8b356765c5ac', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'Email', 'email@company.com');

CREATE TABLE company_note (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,
    note VARCHAR(10000) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);
INSERT INTO company_note VALUES ('ea122cf8-11aa-4b5b-b95b-53c2b37d700d', '55d23ad2-62ae-11ed-8d81-8b356765c5ac', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'some notes about this company');

CREATE TABLE person (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    first_name VARCHAR(255) DEFAULT "",
    middle_name VARCHAR(255) DEFAULT "",
    last_name VARCHAR(255) DEFAULT "",
    company_id CHAR(36) DEFAULT NULL,
    job_title VARCHAR(255) DEFAULT "",
    city VARCHAR(255) DEFAULT "",
    state VARCHAR(255) DEFAULT "",
    zip VARCHAR(50) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE SET NULL
);

CREATE TABLE person_contact_info (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,
    type VARCHAR(50) DEFAULT "",
    value VARCHAR(255) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE person_contact_log (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,
    type VARCHAR(50) DEFAULT "",
    description VARCHAR(10000) DEFAULT "",
    date DATETIME DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE person_note (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,
    note VARCHAR(10000) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE task (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    title VARCHAR(255) DEFAULT "",
    description VARCHAR(10000) DEFAULT "",
    complete TINYINT(1) DEFAULT 0,
    initial_date DATETIME DEFAULT NULL,
    frequency_type VARCHAR(255) DEFAULT "",
    frequency_number TINYINT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
