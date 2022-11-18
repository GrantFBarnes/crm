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
INSERT INTO user VALUES ('77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'grant', 'password', CURRENT_DATE(), CURRENT_DATE());

CREATE TABLE company (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,

    name VARCHAR(255) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO company VALUES ('b3973f12-7b2a-4729-b102-47bf24a49e5c', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'Company 1', CURRENT_DATE(), CURRENT_DATE());
INSERT INTO company VALUES ('802c0f1a-6f99-49dc-9d79-7cbfeaccb77a', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'Company 2', CURRENT_DATE(), CURRENT_DATE());

CREATE TABLE person (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,

    first_name VARCHAR(255) DEFAULT "",
    last_name VARCHAR(255) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO person VALUES ('518ae809-e43e-435f-be69-ef4ca36e9d28', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'First 1', 'Last 1', CURRENT_DATE(), CURRENT_DATE());
INSERT INTO person VALUES ('cefcd403-1a15-4bb5-9d8f-1103c2c92969', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'First 2', 'Last 2', CURRENT_DATE(), CURRENT_DATE());

CREATE TABLE task (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,

    date CHAR(10) DEFAULT "",
    time CHAR(5) DEFAULT "",
    title VARCHAR(255) DEFAULT "",
    description VARCHAR(10000) DEFAULT "",
    completed TINYINT(1) DEFAULT 0,
    repeating TINYINT(1) DEFAULT 0,
    repeat_count TINYINT DEFAULT NULL,
    repeat_interval VARCHAR(50) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO task VALUES ('5afb09ff-6158-4804-96b5-f56a11633820', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '2022-11-14', '10:00', 'Task Title', 'Description of task', 0, 1, 1, 'day', CURRENT_DATE(), CURRENT_DATE());

CREATE TABLE company_address (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    parent_id CHAR(36) NOT NULL,

    city VARCHAR(255) DEFAULT "",
    state VARCHAR(255) DEFAULT "",
    zip VARCHAR(50) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES company(id) ON DELETE CASCADE
);
INSERT INTO company_address VALUES ('2df0928c-5946-41b9-b1fd-215c0a4347ef', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'City 1', 'State 1', 'Zip 1', CURRENT_DATE(), CURRENT_DATE());
INSERT INTO company_address VALUES ('c1dc04ee-ba7d-4b4d-bc0c-4dce42931961', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '802c0f1a-6f99-49dc-9d79-7cbfeaccb77a', 'City 2', 'State 2', 'Zip 2', CURRENT_DATE(), CURRENT_DATE());

CREATE TABLE person_address (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    parent_id CHAR(36) NOT NULL,

    city VARCHAR(255) DEFAULT "",
    state VARCHAR(255) DEFAULT "",
    zip VARCHAR(50) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES person(id) ON DELETE CASCADE
);
INSERT INTO person_address VALUES ('766b96b0-ee77-484f-869c-91b09864ba95', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '518ae809-e43e-435f-be69-ef4ca36e9d28', 'City 3', 'State 3', 'Zip 3', CURRENT_DATE(), CURRENT_DATE());
INSERT INTO person_address VALUES ('445bb890-7784-4eb4-af65-74bd18edb300', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'cefcd403-1a15-4bb5-9d8f-1103c2c92969', 'City 4', 'State 4', 'Zip 4', CURRENT_DATE(), CURRENT_DATE());

CREATE TABLE company_phone (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    parent_id CHAR(36) NOT NULL,

    phone VARCHAR(255) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES company(id) ON DELETE CASCADE
);
INSERT INTO company_phone VALUES ('7d7ddf76-f76c-4c20-ba94-6e6f0dc1c62d', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', '555-555-1234', CURRENT_DATE(), CURRENT_DATE());
INSERT INTO company_phone VALUES ('9d6b2985-c987-4fce-ac92-6428a46611f4', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', '555-555-5678', CURRENT_DATE(), CURRENT_DATE());

CREATE TABLE person_phone (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    parent_id CHAR(36) NOT NULL,

    phone VARCHAR(255) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE company_email (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    parent_id CHAR(36) NOT NULL,

    email VARCHAR(255) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES company(id) ON DELETE CASCADE
);
INSERT INTO company_email VALUES ('50155c71-e12b-4710-9fed-46ccb1c15b81', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'email@company.com', CURRENT_DATE(), CURRENT_DATE());

CREATE TABLE person_email (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    parent_id CHAR(36) NOT NULL,

    email VARCHAR(255) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE company_note (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    parent_id CHAR(36) NOT NULL,

    note VARCHAR(10000) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES company(id) ON DELETE CASCADE
);
INSERT INTO company_note VALUES ('ea122cf8-11aa-4b5b-b95b-53c2b37d700d', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'some notes about this company 1', CURRENT_DATE(), CURRENT_DATE());
INSERT INTO company_note VALUES ('17732013-8ff6-4369-8875-61ec04fd9532', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'some notes about this company 2', CURRENT_DATE(), CURRENT_DATE());
INSERT INTO company_note VALUES ('b4ee7609-65f8-4459-ac6b-d1ed48a8c501', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'some notes about this company 3', CURRENT_DATE(), CURRENT_DATE());

CREATE TABLE person_note (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    parent_id CHAR(36) NOT NULL,

    note VARCHAR(10000) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE company_contact (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    parent_id CHAR(36) NOT NULL,

    date CHAR(10) DEFAULT "",
    time CHAR(5) DEFAULT "",
    description VARCHAR(10000) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE person_contact (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    parent_id CHAR(36) NOT NULL,

    date CHAR(10) DEFAULT "",
    time CHAR(5) DEFAULT "",
    description VARCHAR(10000) DEFAULT "",

    date_added DATETIME NOT NULL,
    date_modified DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES person(id) ON DELETE CASCADE
);
