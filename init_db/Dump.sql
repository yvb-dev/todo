-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: tasklist
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `completed_count` bigint DEFAULT '0',
  `uncompleted_count` bigint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_title` (`title`) /*!80000 INVISIBLE */
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (167,'Семья',1,2),(168,'Работа',1,1),(170,'Отдых',NULL,3),(171,'Путешествия',1,0),(179,'Спорт',2,0),(180,'Здоровье',1,2),(182,'Новая категория',0,0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `priority`
--

DROP TABLE IF EXISTS `priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `priority` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `priority`
--

LOCK TABLES `priority` WRITE;
/*!40000 ALTER TABLE `priority` DISABLE KEYS */;
INSERT INTO `priority` VALUES (56,'Низкий','#caffdd'),(57,'Средний','#883bdc'),(58,'Высокий','#f05f5f');
/*!40000 ALTER TABLE `priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stat`
--

DROP TABLE IF EXISTS `stat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `stat` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `completed_total` bigint DEFAULT '0',
  `uncompleted_total` bigint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stat`
--

LOCK TABLES `stat` WRITE;
/*!40000 ALTER TABLE `stat` DISABLE KEYS */;
INSERT INTO `stat` VALUES (1,7,11);
/*!40000 ALTER TABLE `stat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `task` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `completed` int DEFAULT '0',
  `date` datetime DEFAULT NULL,
  `priority_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_idx` (`category_id`),
  KEY `fk_priority_idx` (`priority_id`),
  KEY `index_title` (`title`),
  KEY `index_completed` (`completed`),
  KEY `index_date` (`date`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_priority` FOREIGN KEY (`priority_id`) REFERENCES `priority` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=361 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (328,'Позвонить родителям',1,'2020-04-29 15:27:11',58,167),(331,'Посмотреть мультики',0,'2020-04-27 15:27:29',57,167),(333,'Пройти курсы по Java',0,'2020-04-30 09:38:39',56,NULL),(338,'Сделать зеленый коктейль',0,'2020-04-27 15:27:34',56,180),(339,'Купить буханку хлеба',0,'2020-04-28 07:03:03',57,NULL),(341,'Позвонить начальнику',0,'2020-05-06 09:38:23',NULL,168),(342,'Померить давление',0,'2020-05-01 09:38:46',NULL,180),(343,'Начать бегать по утрам',1,NULL,56,179),(344,'Отжаться 100 раз',1,NULL,58,179),(349,'Найти развивающие игры для детей',0,'2020-04-29 09:38:51',57,167),(350,'Купить лекарство',1,'2020-04-30 09:38:43',56,180),(351,'Выучить Kotlin',0,'2020-05-06 09:38:37',58,NULL),(352,'Посмотреть ролики как построить дом',1,NULL,NULL,NULL),(353,'Посмотреть сериал',0,'2020-04-29 09:38:29',NULL,170),(354,'Съездить на природу',0,'2020-04-15 18:00:00',NULL,170),(355,'Создать список стран для путешествий',1,'2020-04-29 09:38:26',NULL,171),(356,'Доделать отчеты',1,'2020-04-30 09:38:20',NULL,168),(358,'Задача по категории',0,'2020-05-01 12:01:18',58,170);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `task_AFTER_INSERT` AFTER INSERT ON `task` FOR EACH ROW BEGIN

	/* можно было упаковать все условия в один if-else, но тогда он становится не очень читабельным */
    
    /*  категория НЕПУСТАЯ                и       статус задачи ЗАВЕРШЕН */
    if (ifnull(NEW.category_id, 0)>0      &&      ifnull(NEW.completed, 0)=1) then
		update tasklist.category set completed_count = (ifnull(completed_count, 0)+1) where id = NEW.category_id;
	end if;
    
	/*  категория НЕПУСТАЯ                 и       статус задачи НЕЗАВЕРШЕН */
    if (ifnull(NEW.category_id, 0)>0      &&      ifnull(NEW.completed, 0)=0) then
		update tasklist.category c set uncompleted_count = (ifnull(uncompleted_count, 0)+1) where id = NEW.category_id;
	end if;
    

    /* общая статистика */
	if ifnull(NEW.completed, 0)=1 then
		update tasklist.stat set completed_total = (ifnull(completed_total, 0)+1)  where id=1;
	else
		update tasklist.stat set uncompleted_total = (ifnull(uncompleted_total, 0)+1)  where id=1;
    end if;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `task_AFTER_UPDATE` AFTER UPDATE ON `task` FOR EACH ROW BEGIN
    
  
  /* изменили completed на 1, НЕ изменили категорию */
    IF (   ifnull(old.completed,0) <> ifnull(new.completed,0)  &&   new.completed=1      &&   ifnull(old.category_id,0) = ifnull(new.category_id,0)     ) THEN    
    
		/* у категории кол-во незавершенных уменьшится на 1,  кол-во завершенных увеличится на 1 */
		update tasklist.category set uncompleted_count = (ifnull(uncompleted_count, 0)-1), completed_count = (ifnull(completed_count,0)+1) where id = old.category_id; 
        
        /* общая статистика */
		update tasklist.stat set uncompleted_total = (ifnull(uncompleted_total,0)-1), completed_total = (ifnull(completed_total,0)+1)  where id=1;

        
	END IF;
    
    
    /* изменили completed на 0, НЕ изменили категорию */
    IF (   ifnull(old.completed,0) <> ifnull(new.completed,0)    &&   new.completed=0       &&   ifnull(old.category_id,0) = ifnull(new.category_id,0)   ) THEN    
    
		/* у категории кол-во завершенных уменьшится на 1, кол-во незавершенных увеличится на 1 */
		update tasklist.category set completed_count = (ifnull(completed_count,0)-1), uncompleted_count = (ifnull(uncompleted_count,0)+1) where id = old.category_id; 
       
       /* общая статистика */
		update tasklist.stat set completed_total = (ifnull(completed_total,0)-1), uncompleted_total = (ifnull(uncompleted_total,0)+1)  where id=1;

       
	END IF;
    
    
    
	/* изменили категорию для неизмененного completed=1 */
    IF (   ifnull(old.completed,0) = ifnull(new.completed,0)    &&   new.completed=1       &&   ifnull(old.category_id,0) <> ifnull(new.category_id,0)    ) THEN    
    
		/* у старой категории кол-во завершенных уменьшится на 1 */
		update tasklist.category set completed_count = (ifnull(completed_count,0)-1) where id = old.category_id; 

        
		/* у новой категории кол-во завершенных увеличится на 1 */
		update tasklist.category set completed_count = (ifnull(completed_count,0)+1) where id = new.category_id; 
	
    
		/* общая статистика не изменяется */
       
	END IF;
    
    
    
    
        
    /* изменили категорию для неизменнеого completed=0 */
    IF (   ifnull(old.completed,0) = ifnull(new.completed,0)     &&   new.completed=0      &&   ifnull(old.category_id,0) <> ifnull(new.category_id,0)     ) THEN    
    
		/* у старой категории кол-во незавершенных уменьшится на 1 */
		update tasklist.category set uncompleted_count = (ifnull(uncompleted_count,0)-1) where id = old.category_id; 

		/* у новой категории кол-во незавершенных увеличится на 1 */
		update tasklist.category set uncompleted_count = (ifnull(uncompleted_count,0)+1) where id = new.category_id; 
       
       /* общая статистика не изменяется */
       
	END IF;
    
    
    
    
    
	
    /* изменили категорию, изменили completed с 1 на 0 */
    IF (   ifnull(old.completed,0) <> ifnull(new.completed,0)     &&   new.completed=0      &&   ifnull(old.category_id,0) <> ifnull(new.category_id,0)     ) THEN    
    
		/* у старой категории кол-во завершенных уменьшится на 1 */
		update tasklist.category set completed_count = (ifnull(completed_count,0)-1) where id = old.category_id; 
        
		/* у новой категории кол-во незавершенных увеличится на 1 */
		update tasklist.category set uncompleted_count = (ifnull(uncompleted_count,0)+1) where id = new.category_id; 


		/* общая статистика */
		update stat set uncompleted_total = (ifnull(uncompleted_total,0)+1), completed_total = (ifnull(completed_total,0)-1)  where id=1;

       
	END IF;
    
    
            
    /* изменили категорию, изменили completed с 0 на 1 */
    IF (   ifnull(old.completed,0) <> ifnull(new.completed,0)     &&   new.completed=1      &&   ifnull(old.category_id,0) <> ifnull(new.category_id,0)     ) THEN    
    
		/* у старой категории кол-во незавершенных уменьшится на 1 */
		update tasklist.category set uncompleted_count = (ifnull(uncompleted_count,0)-1) where id = old.category_id; 
        
		/* у новой категории кол-во завершенных увеличится на 1 */
		update tasklist.category set completed_count = (ifnull(completed_count,0)+1) where id = new.category_id; 
        
        /* общая статистика */
		update tasklist.stat set uncompleted_total = (ifnull(uncompleted_total,0)-1), completed_total = (ifnull(completed_total,0)+1)  where id=1;
	
	END IF;
    
    
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `task_AFTER_DELETE` AFTER DELETE ON `task` FOR EACH ROW BEGIN
	/* можно было упаковать все условия в один if-else, но тогда он становится не очень читабельным */

    /*  категория НЕПУСТАЯ                 и        статус задачи ЗАВЕРШЕН */
    if (ifnull(old.category_id, 0)>0       &&       ifnull(old.completed, 0)=1) then
		update tasklist.category set completed_count = (ifnull(completed_count, 0)-1) where id = old.category_id;
	end if;
    
	/*  категория НЕПУСТАЯ                и         статус задачи НЕЗАВЕРШЕН */
    if (ifnull(old.category_id, 0)>0      &&        ifnull(old.completed, 0)=0) then
		update tasklist.category set uncompleted_count = (ifnull(uncompleted_count, 0)-1) where id = old.category_id;
	end if;
    
    
    
    /* общая статистика */
	if ifnull(old.completed, 0)=1 then
		update tasklist.stat set completed_total = (ifnull(completed_total, 0)-1)  where id=1;
	else
		update tasklist.stat set uncompleted_total = (ifnull(uncompleted_total, 0)-1)  where id=1;
    end if;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-11 20:34:42
