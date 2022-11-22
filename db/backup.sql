-- MariaDB dump 10.19  Distrib 10.6.7-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: crm
-- ------------------------------------------------------
-- Server version	10.6.7-MariaDB-2ubuntu1.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address_company`
--

DROP TABLE IF EXISTS `address_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address_company` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `company_id` char(36) NOT NULL,
  `city` varchar(255) DEFAULT '',
  `state` varchar(255) DEFAULT '',
  `zip` varchar(50) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `address_company_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `address_company_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address_company`
--
-- ORDER BY:  `id`

LOCK TABLES `address_company` WRITE;
/*!40000 ALTER TABLE `address_company` DISABLE KEYS */;
INSERT INTO `address_company` VALUES ('2df0928c-5946-41b9-b1fd-215c0a4347ef','77fff5a2-3f34-4d53-8a97-c0d93e21f031','b3973f12-7b2a-4729-b102-47bf24a49e5c','Cupertino','California','95014','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `address_company` VALUES ('c1dc04ee-ba7d-4b4d-bc0c-4dce42931961','77fff5a2-3f34-4d53-8a97-c0d93e21f031','802c0f1a-6f99-49dc-9d79-7cbfeaccb77a','Redmond','Washington','98052','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `address_company` VALUES ('d147f4d4-904e-436c-9e5e-f622a8c86d39','77fff5a2-3f34-4d53-8a97-c0d93e21f031','e5f61cde-74ba-4516-917f-f44680f35e1b','Mountain View','California','94043','2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `address_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address_person`
--

DROP TABLE IF EXISTS `address_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address_person` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `person_id` char(36) NOT NULL,
  `city` varchar(255) DEFAULT '',
  `state` varchar(255) DEFAULT '',
  `zip` varchar(50) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `address_person_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `address_person_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address_person`
--
-- ORDER BY:  `id`

LOCK TABLES `address_person` WRITE;
/*!40000 ALTER TABLE `address_person` DISABLE KEYS */;
/*!40000 ALTER TABLE `address_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT '',
  `view_count` INT DEFAULT 0,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `company_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--
-- ORDER BY:  `id`

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('802c0f1a-6f99-49dc-9d79-7cbfeaccb77a','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Microsoft',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `company` VALUES ('b3973f12-7b2a-4729-b102-47bf24a49e5c','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Apple',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `company` VALUES ('e5f61cde-74ba-4516-917f-f44680f35e1b','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Google',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_company`
--

DROP TABLE IF EXISTS `email_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_company` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `company_id` char(36) NOT NULL,
  `value` varchar(255) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `email_company_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `email_company_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_company`
--
-- ORDER BY:  `id`

LOCK TABLES `email_company` WRITE;
/*!40000 ALTER TABLE `email_company` DISABLE KEYS */;
INSERT INTO `email_company` VALUES ('30e4b6f8-91df-46d3-afc6-3cfd1e56240f','77fff5a2-3f34-4d53-8a97-c0d93e21f031','802c0f1a-6f99-49dc-9d79-7cbfeaccb77a','email@microsoft.com','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `email_company` VALUES ('50155c71-e12b-4710-9fed-46ccb1c15b81','77fff5a2-3f34-4d53-8a97-c0d93e21f031','b3973f12-7b2a-4729-b102-47bf24a49e5c','email@apple.com','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `email_company` VALUES ('7e59ad35-3d87-4d58-907f-6be253a6bcb6','77fff5a2-3f34-4d53-8a97-c0d93e21f031','e5f61cde-74ba-4516-917f-f44680f35e1b','email@gmail.com','2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `email_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_person`
--

DROP TABLE IF EXISTS `email_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_person` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `person_id` char(36) NOT NULL,
  `value` varchar(255) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `email_person_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `email_person_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_person`
--
-- ORDER BY:  `id`

LOCK TABLES `email_person` WRITE;
/*!40000 ALTER TABLE `email_person` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_company_person`
--

DROP TABLE IF EXISTS `link_company_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_company_person` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `company_id` char(36) NOT NULL,
  `person_id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `link_company_person_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `link_company_person_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE,
  CONSTRAINT `link_company_person_ibfk_3` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_company_person`
--
-- ORDER BY:  `id`

LOCK TABLES `link_company_person` WRITE;
/*!40000 ALTER TABLE `link_company_person` DISABLE KEYS */;
INSERT INTO `link_company_person` VALUES ('1ae23e5d-89a7-4d74-b0e7-494e08e31c54','77fff5a2-3f34-4d53-8a97-c0d93e21f031','e5f61cde-74ba-4516-917f-f44680f35e1b','cefcd403-1a15-4bb5-9d8f-1103c2c92969','CFO','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_person` VALUES ('3489da0b-9ad7-430a-855c-848c72c7075b','77fff5a2-3f34-4d53-8a97-c0d93e21f031','b3973f12-7b2a-4729-b102-47bf24a49e5c','9288e5be-f38c-4cd6-a24e-2f066d05426d','Marketing','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_person` VALUES ('4d05a818-819c-484d-95ba-b2e465d8d47b','77fff5a2-3f34-4d53-8a97-c0d93e21f031','802c0f1a-6f99-49dc-9d79-7cbfeaccb77a','2762d48a-dde3-481c-a78a-ba0e2b327300','Project Manager','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_person` VALUES ('77a5276e-e499-4af9-9830-90ab11622f71','77fff5a2-3f34-4d53-8a97-c0d93e21f031','e5f61cde-74ba-4516-917f-f44680f35e1b','5839ab95-88cc-4962-b219-4c5ebe0083e5','Software Engineer','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_person` VALUES ('8558f00d-e8fa-4cfa-952e-2c40b0ceb419','77fff5a2-3f34-4d53-8a97-c0d93e21f031','802c0f1a-6f99-49dc-9d79-7cbfeaccb77a','e2aeea12-c2bf-45a1-a7b7-38a378b26e2c','Graphic Designer','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_person` VALUES ('92f60f83-505f-4840-aa50-7d3256f5bd11','77fff5a2-3f34-4d53-8a97-c0d93e21f031','e5f61cde-74ba-4516-917f-f44680f35e1b','518ae809-e43e-435f-be69-ef4ca36e9d28','Accountant','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_person` VALUES ('99f6780d-024c-49d3-831d-592a8ffa2f12','77fff5a2-3f34-4d53-8a97-c0d93e21f031','802c0f1a-6f99-49dc-9d79-7cbfeaccb77a','a6ba5556-6dcf-4587-9868-40a3b3f6835b','Database Administrator','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_person` VALUES ('a592ea28-23f9-4bc7-ad29-d9caed9901f9','77fff5a2-3f34-4d53-8a97-c0d93e21f031','b3973f12-7b2a-4729-b102-47bf24a49e5c','956a54c8-2781-49bb-b48b-ac4625876f34','Salesman','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_person` VALUES ('f8cc563a-928a-4b85-9c08-5e72c9b9ccc1','77fff5a2-3f34-4d53-8a97-c0d93e21f031','b3973f12-7b2a-4729-b102-47bf24a49e5c','46f4239f-8b32-497b-8aae-3ac02caa95c0','Mechanical Engineer','2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `link_company_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_company_reminder`
--

DROP TABLE IF EXISTS `link_company_reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_company_reminder` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `company_id` char(36) NOT NULL,
  `reminder_id` char(36) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`),
  KEY `reminder_id` (`reminder_id`),
  CONSTRAINT `link_company_reminder_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `link_company_reminder_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE,
  CONSTRAINT `link_company_reminder_ibfk_3` FOREIGN KEY (`reminder_id`) REFERENCES `reminder` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_company_reminder`
--
-- ORDER BY:  `id`

LOCK TABLES `link_company_reminder` WRITE;
/*!40000 ALTER TABLE `link_company_reminder` DISABLE KEYS */;
INSERT INTO `link_company_reminder` VALUES ('083e1df7-8b24-4ef5-888b-d35522e31adf','77fff5a2-3f34-4d53-8a97-c0d93e21f031','802c0f1a-6f99-49dc-9d79-7cbfeaccb77a','5c671528-5b45-4277-8873-d7c68d944a01','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_reminder` VALUES ('260343b0-9706-477e-8fcd-1f0e02f0ea99','77fff5a2-3f34-4d53-8a97-c0d93e21f031','e5f61cde-74ba-4516-917f-f44680f35e1b','a84611c1-1669-4d6f-8d68-be4eb6edb476','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_reminder` VALUES ('bc8027bf-627c-414b-9b7c-338227ea19f6','77fff5a2-3f34-4d53-8a97-c0d93e21f031','b3973f12-7b2a-4729-b102-47bf24a49e5c','5afb09ff-6158-4804-96b5-f56a11633820','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_reminder` VALUES ('c1e0d5df-4604-47f5-bea5-277c962ab6d4','77fff5a2-3f34-4d53-8a97-c0d93e21f031','b3973f12-7b2a-4729-b102-47bf24a49e5c','f906f2e0-4e93-4636-943f-8952b12f40a6','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_company_reminder` VALUES ('f274f494-7518-4d57-b87b-2c42865a80c8','77fff5a2-3f34-4d53-8a97-c0d93e21f031','e5f61cde-74ba-4516-917f-f44680f35e1b','a2622364-f0bc-49d8-a5fb-36c2d3e1b4ff','2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `link_company_reminder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_company_task`
--

DROP TABLE IF EXISTS `link_company_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_company_task` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `company_id` char(36) NOT NULL,
  `task_id` char(36) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `link_company_task_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `link_company_task_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE,
  CONSTRAINT `link_company_task_ibfk_3` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_company_task`
--
-- ORDER BY:  `id`

LOCK TABLES `link_company_task` WRITE;
/*!40000 ALTER TABLE `link_company_task` DISABLE KEYS */;
INSERT INTO `link_company_task` VALUES ('69948231-651c-4942-802c-3d73e463e597','77fff5a2-3f34-4d53-8a97-c0d93e21f031','e5f61cde-74ba-4516-917f-f44680f35e1b','fdb19bff-a8fc-471b-b9d4-3e4ed7d9786a','2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `link_company_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_person_reminder`
--

DROP TABLE IF EXISTS `link_person_reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_person_reminder` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `person_id` char(36) NOT NULL,
  `reminder_id` char(36) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `person_id` (`person_id`),
  KEY `reminder_id` (`reminder_id`),
  CONSTRAINT `link_person_reminder_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `link_person_reminder_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE,
  CONSTRAINT `link_person_reminder_ibfk_3` FOREIGN KEY (`reminder_id`) REFERENCES `reminder` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_person_reminder`
--
-- ORDER BY:  `id`

LOCK TABLES `link_person_reminder` WRITE;
/*!40000 ALTER TABLE `link_person_reminder` DISABLE KEYS */;
INSERT INTO `link_person_reminder` VALUES ('a493bc18-5e75-4274-9efb-f009984aaf04','77fff5a2-3f34-4d53-8a97-c0d93e21f031','9288e5be-f38c-4cd6-a24e-2f066d05426d','fb325e8a-35b2-45e7-a77d-bafb97120eff','2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `link_person_reminder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_person_task`
--

DROP TABLE IF EXISTS `link_person_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_person_task` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `person_id` char(36) NOT NULL,
  `task_id` char(36) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `person_id` (`person_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `link_person_task_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `link_person_task_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE,
  CONSTRAINT `link_person_task_ibfk_3` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_person_task`
--
-- ORDER BY:  `id`

LOCK TABLES `link_person_task` WRITE;
/*!40000 ALTER TABLE `link_person_task` DISABLE KEYS */;
INSERT INTO `link_person_task` VALUES ('23255fef-5e94-4c64-9f75-9732be84c5b1','77fff5a2-3f34-4d53-8a97-c0d93e21f031','cefcd403-1a15-4bb5-9d8f-1103c2c92969','c55f737a-af7e-4859-8016-0856d8d8b71d','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `link_person_task` VALUES ('62012292-99ed-4a0c-abf3-a9cb2122f9a5','77fff5a2-3f34-4d53-8a97-c0d93e21f031','5839ab95-88cc-4962-b219-4c5ebe0083e5','77a69587-47a9-4a85-a41d-7b726e378227','2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `link_person_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_company`
--

DROP TABLE IF EXISTS `log_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_company` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `company_id` char(36) NOT NULL,
  `details` varchar(10000) DEFAULT '',
  `date` char(10) DEFAULT '',
  `time` char(5) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `log_company_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `log_company_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_company`
--
-- ORDER BY:  `id`

LOCK TABLES `log_company` WRITE;
/*!40000 ALTER TABLE `log_company` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_person`
--

DROP TABLE IF EXISTS `log_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_person` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `person_id` char(36) NOT NULL,
  `details` varchar(10000) DEFAULT '',
  `date` char(10) DEFAULT '',
  `time` char(5) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `log_person_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `log_person_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_person`
--
-- ORDER BY:  `id`

LOCK TABLES `log_person` WRITE;
/*!40000 ALTER TABLE `log_person` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note_company`
--

DROP TABLE IF EXISTS `note_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `note_company` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `company_id` char(36) NOT NULL,
  `details` varchar(10000) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `note_company_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `note_company_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note_company`
--
-- ORDER BY:  `id`

LOCK TABLES `note_company` WRITE;
/*!40000 ALTER TABLE `note_company` DISABLE KEYS */;
INSERT INTO `note_company` VALUES ('09cb82d0-5bd7-4db3-8a04-867e75b1640b','77fff5a2-3f34-4d53-8a97-c0d93e21f031','e5f61cde-74ba-4516-917f-f44680f35e1b','Founded in 1998','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `note_company` VALUES ('5329874c-1d1e-444c-9332-a7558fc1b1b5','77fff5a2-3f34-4d53-8a97-c0d93e21f031','802c0f1a-6f99-49dc-9d79-7cbfeaccb77a','Founded by Bill Gates in 1975','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `note_company` VALUES ('ea122cf8-11aa-4b5b-b95b-53c2b37d700d','77fff5a2-3f34-4d53-8a97-c0d93e21f031','b3973f12-7b2a-4729-b102-47bf24a49e5c','Largest company in the world by value\n(over $2 trillion)','2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `note_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note_person`
--

DROP TABLE IF EXISTS `note_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `note_person` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `person_id` char(36) NOT NULL,
  `details` varchar(10000) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `note_person_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `note_person_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note_person`
--
-- ORDER BY:  `id`

LOCK TABLES `note_person` WRITE;
/*!40000 ALTER TABLE `note_person` DISABLE KEYS */;
/*!40000 ALTER TABLE `note_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT '',
  `view_count` INT DEFAULT 0,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `person_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--
-- ORDER BY:  `id`

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES ('2762d48a-dde3-481c-a78a-ba0e2b327300','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Joe',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `person` VALUES ('46f4239f-8b32-497b-8aae-3ac02caa95c0','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Richard',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `person` VALUES ('518ae809-e43e-435f-be69-ef4ca36e9d28','77fff5a2-3f34-4d53-8a97-c0d93e21f031','James',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `person` VALUES ('5839ab95-88cc-4962-b219-4c5ebe0083e5','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Mark',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `person` VALUES ('9288e5be-f38c-4cd6-a24e-2f066d05426d','77fff5a2-3f34-4d53-8a97-c0d93e21f031','David',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `person` VALUES ('956a54c8-2781-49bb-b48b-ac4625876f34','77fff5a2-3f34-4d53-8a97-c0d93e21f031','John',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `person` VALUES ('a6ba5556-6dcf-4587-9868-40a3b3f6835b','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Michael',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `person` VALUES ('cefcd403-1a15-4bb5-9d8f-1103c2c92969','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Robert',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `person` VALUES ('e2aeea12-c2bf-45a1-a7b7-38a378b26e2c','77fff5a2-3f34-4d53-8a97-c0d93e21f031','William',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone_company`
--

DROP TABLE IF EXISTS `phone_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phone_company` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `company_id` char(36) NOT NULL,
  `value` varchar(255) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `phone_company_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `phone_company_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_company`
--
-- ORDER BY:  `id`

LOCK TABLES `phone_company` WRITE;
/*!40000 ALTER TABLE `phone_company` DISABLE KEYS */;
INSERT INTO `phone_company` VALUES ('0f5933b8-1fba-4c41-87e3-582dd41ec4d7','77fff5a2-3f34-4d53-8a97-c0d93e21f031','e5f61cde-74ba-4516-917f-f44680f35e1b','555-555-9012','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `phone_company` VALUES ('7d7ddf76-f76c-4c20-ba94-6e6f0dc1c62d','77fff5a2-3f34-4d53-8a97-c0d93e21f031','b3973f12-7b2a-4729-b102-47bf24a49e5c','555-555-1234','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `phone_company` VALUES ('9d6b2985-c987-4fce-ac92-6428a46611f4','77fff5a2-3f34-4d53-8a97-c0d93e21f031','802c0f1a-6f99-49dc-9d79-7cbfeaccb77a','555-555-5678','2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `phone_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone_person`
--

DROP TABLE IF EXISTS `phone_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phone_person` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `person_id` char(36) NOT NULL,
  `value` varchar(255) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `phone_person_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `phone_person_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_person`
--
-- ORDER BY:  `id`

LOCK TABLES `phone_person` WRITE;
/*!40000 ALTER TABLE `phone_person` DISABLE KEYS */;
/*!40000 ALTER TABLE `phone_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminder`
--

DROP TABLE IF EXISTS `reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reminder` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT '',
  `details` varchar(10000) DEFAULT '',
  `date` char(10) DEFAULT '',
  `time` char(5) DEFAULT '',
  `repeating` tinyint(1) DEFAULT 0,
  `repeat_count` tinyint(4) DEFAULT NULL,
  `repeat_interval` varchar(50) DEFAULT '',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reminder_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminder`
--
-- ORDER BY:  `id`

LOCK TABLES `reminder` WRITE;
/*!40000 ALTER TABLE `reminder` DISABLE KEYS */;
INSERT INTO `reminder` VALUES ('3fd47b6d-a1c8-438a-b713-6d2413d95a87','77fff5a2-3f34-4d53-8a97-c0d93e21f031','No Date','','','',0,0,'','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `reminder` VALUES ('5afb09ff-6158-4804-96b5-f56a11633820','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Daily Call','This is the details of the reminder','2022-11-14','09:00',1,1,'day','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `reminder` VALUES ('5c671528-5b45-4277-8873-d7c68d944a01','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Friday Call','This is the details of the reminder','2022-11-18','14:00',1,1,'week','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `reminder` VALUES ('a2622364-f0bc-49d8-a5fb-36c2d3e1b4ff','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Monday Call','This is the details of the reminder','2022-11-14','10:00',1,1,'week','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `reminder` VALUES ('a84611c1-1669-4d6f-8d68-be4eb6edb476','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Thursday Call','This is the details of the reminder','2022-11-17','13:00',1,1,'week','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `reminder` VALUES ('f906f2e0-4e93-4636-943f-8952b12f40a6','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Wednesday Call','This is the details of the reminder','2022-11-16','12:00',1,1,'week','2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `reminder` VALUES ('fb325e8a-35b2-45e7-a77d-bafb97120eff','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Tuesday Call','This is the details of the reminder','2022-11-15','11:00',1,1,'week','2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `reminder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT '',
  `details` varchar(10000) DEFAULT '',
  `completed` tinyint(1) DEFAULT 0,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--
-- ORDER BY:  `id`

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES ('77a69587-47a9-4a85-a41d-7b726e378227','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Buy new pens','This is the details of the task',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `task` VALUES ('c55f737a-af7e-4859-8016-0856d8d8b71d','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Organize Spreadsheets','This is the details of the task',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
INSERT INTO `task` VALUES ('fdb19bff-a8fc-471b-b9d4-3e4ed7d9786a','77fff5a2-3f34-4d53-8a97-c0d93e21f031','Set up website','This is the details of the task',0,'2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--
-- ORDER BY:  `id`

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('77fff5a2-3f34-4d53-8a97-c0d93e21f031','grant','password','2022-11-21 00:00:00','2022-11-21 00:00:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21 19:29:48
