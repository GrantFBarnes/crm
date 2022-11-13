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
INSERT INTO user VALUES ('77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'grant', 'password');

CREATE TABLE company (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    name VARCHAR(255) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO company VALUES ('b3973f12-7b2a-4729-b102-47bf24a49e5c', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'Company 1');
INSERT INTO company VALUES ('802c0f1a-6f99-49dc-9d79-7cbfeaccb77a', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'Company 2');

CREATE TABLE person (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    first_name VARCHAR(255) DEFAULT "",
    last_name VARCHAR(255) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO person VALUES ('518ae809-e43e-435f-be69-ef4ca36e9d28', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'First 1', 'Last 1');
INSERT INTO person VALUES ('cefcd403-1a15-4bb5-9d8f-1103c2c92969', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'First 2', 'Last 2');

CREATE TABLE address (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) DEFAULT NULL,
    company_id CHAR(36) DEFAULT NULL,
    city VARCHAR(255) DEFAULT "",
    state VARCHAR(255) DEFAULT "",
    zip VARCHAR(50) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO address VALUES ('2df0928c-5946-41b9-b1fd-215c0a4347ef', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'City 1', 'State 1', 'Zip 1');
INSERT INTO address VALUES ('c1dc04ee-ba7d-4b4d-bc0c-4dce42931961', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '', '802c0f1a-6f99-49dc-9d79-7cbfeaccb77a', 'City 2', 'State 2', 'Zip 2');
INSERT INTO address VALUES ('766b96b0-ee77-484f-869c-91b09864ba95', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '518ae809-e43e-435f-be69-ef4ca36e9d28', '', 'City 3', 'State 3', 'Zip 3');
INSERT INTO address VALUES ('445bb890-7784-4eb4-af65-74bd18edb300', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', 'cefcd403-1a15-4bb5-9d8f-1103c2c92969', '', 'City 4', 'State 4', 'Zip 4');

CREATE TABLE phone (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) DEFAULT NULL,
    company_id CHAR(36) DEFAULT NULL,
    value VARCHAR(255) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO phone VALUES ('7d7ddf76-f76c-4c20-ba94-6e6f0dc1c62d', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', '555-555-1234');
INSERT INTO phone VALUES ('9d6b2985-c987-4fce-ac92-6428a46611f4', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', '555-555-5678');

CREATE TABLE email (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) DEFAULT NULL,
    company_id CHAR(36) DEFAULT NULL,
    value VARCHAR(255) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO email VALUES ('50155c71-e12b-4710-9fed-46ccb1c15b81', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'email@company.com');

CREATE TABLE note (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) DEFAULT NULL,
    company_id CHAR(36) DEFAULT NULL,
    value VARCHAR(10000) DEFAULT "",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO note VALUES ('ea122cf8-11aa-4b5b-b95b-53c2b37d700d', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'some notes about this company 1');
INSERT INTO note VALUES ('17732013-8ff6-4369-8875-61ec04fd9532', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'some notes about this company 2');
INSERT INTO note VALUES ('b4ee7609-65f8-4459-ac6b-d1ed48a8c501', '77fff5a2-3f34-4d53-8a97-c0d93e21f031', '', 'b3973f12-7b2a-4729-b102-47bf24a49e5c', 'some notes about this company 3');

CREATE TABLE contact (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) DEFAULT NULL,
    company_id CHAR(36) DEFAULT NULL,
    description VARCHAR(10000) DEFAULT "",
    date DATETIME DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE task (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    person_id CHAR(36) DEFAULT NULL,
    company_id CHAR(36) DEFAULT NULL,
    title VARCHAR(255) DEFAULT "",
    description VARCHAR(10000) DEFAULT "",
    complete TINYINT(1) DEFAULT 0,
    initial_date DATETIME DEFAULT NULL,
    frequency_type VARCHAR(255) DEFAULT "",
    frequency_number TINYINT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
