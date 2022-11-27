DROP DATABASE IF EXISTS crm;
CREATE DATABASE crm;
USE crm;

CREATE TABLE user (
    id CHAR(36) NOT NULL,

    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT name_unique UNIQUE (name)
);

CREATE TABLE company (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,

    name VARCHAR(255) DEFAULT "",
    view_count INT DEFAULT 0,

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE person (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,

    name VARCHAR(255) DEFAULT "",
    view_count INT DEFAULT 0,

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE reminder (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,

    name VARCHAR(255) DEFAULT "",
    details VARCHAR(10000) DEFAULT "",
    date CHAR(10) DEFAULT "",
    time CHAR(5) DEFAULT "",
    repeating TINYINT(1) DEFAULT 0,
    repeat_interval VARCHAR(50) DEFAULT "",
    repeat_weekly_gap INT DEFAULT NULL,
    repeat_weekly_monday TINYINT(1) DEFAULT 0,
    repeat_weekly_tuesday TINYINT(1) DEFAULT 0,
    repeat_weekly_wednesday TINYINT(1) DEFAULT 0,
    repeat_weekly_thursday TINYINT(1) DEFAULT 0,
    repeat_weekly_friday TINYINT(1) DEFAULT 0,

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE task (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,

    name VARCHAR(255) DEFAULT "",
    details VARCHAR(10000) DEFAULT "",
    completed TINYINT(1) DEFAULT 0,

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE phone_company (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,

    value VARCHAR(255) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE phone_person (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,

    value VARCHAR(255) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE email_company (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,

    value VARCHAR(255) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE email_person (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,

    value VARCHAR(255) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE address_company (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,

    city VARCHAR(255) DEFAULT "",
    state VARCHAR(255) DEFAULT "",
    zip VARCHAR(50) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE address_person (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,

    city VARCHAR(255) DEFAULT "",
    state VARCHAR(255) DEFAULT "",
    zip VARCHAR(50) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE note_company (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,

    details VARCHAR(10000) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE note_person (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,

    details VARCHAR(10000) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE log_company (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,

    details VARCHAR(10000) DEFAULT "",
    date CHAR(10) DEFAULT "",
    time CHAR(5) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE log_person (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,

    details VARCHAR(10000) DEFAULT "",
    date CHAR(10) DEFAULT "",
    time CHAR(5) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE link_company_person (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,

    name VARCHAR(255) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE link_company_reminder (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,
    reminder_id CHAR(36) NOT NULL,

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY (reminder_id) REFERENCES reminder(id) ON DELETE CASCADE
);

CREATE TABLE link_person_reminder (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,
    reminder_id CHAR(36) NOT NULL,

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
    FOREIGN KEY (reminder_id) REFERENCES reminder(id) ON DELETE CASCADE
);

CREATE TABLE link_company_task (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    company_id CHAR(36) NOT NULL,
    task_id CHAR(36) NOT NULL,

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE
);

CREATE TABLE link_person_task (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) NOT NULL,
    task_id CHAR(36) NOT NULL,

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE
);
