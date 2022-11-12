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
INSERT INTO user VALUES (UUID(), 'grant', 'password');

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

CREATE TABLE company_contact_info (
    id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,
    contact_type VARCHAR(50) DEFAULT "",
    contact_value VARCHAR(255) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE company_note (
    id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,
    note VARCHAR(10000) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

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
    person_id CHAR(36) NOT NULL,
    contact_type VARCHAR(50) DEFAULT "",
    contact_value VARCHAR(255) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE person_contact_log (
    id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,
    contact_type VARCHAR(50) DEFAULT "",
    description VARCHAR(10000) DEFAULT "",
    date DATETIME DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE person_note (
    id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,
    note VARCHAR(10000) DEFAULT "",
    PRIMARY KEY (id),
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
