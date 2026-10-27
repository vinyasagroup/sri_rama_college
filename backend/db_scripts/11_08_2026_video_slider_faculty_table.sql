CREATE TABLE `homepage_video` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `video` varchar(500) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `homepage_slider` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `slider_image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

CREATE TABLE `faculty_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `faculty_photo` varchar(255) NOT NULL,
  `faculty_quote` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
