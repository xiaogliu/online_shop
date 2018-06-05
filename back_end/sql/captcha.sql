-- 创建验证码表

DROP TABLE IF EXISTS `captcha`;

CREATE TABLE `captcha` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `captcha` VARCHAR(32) NOT NULL DEFAULT '',
  `email` VARCHAR(64) NOT NULL DEFAULT '',
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `captcha` WRITE;

INSERT INTO `captcha`(`uid`, `captcha`, `email`, `createdAt`)
VALUES(1,'0000','xiaogliu@outlook.com','2018-05-16 22:00:00');

UNLOCK TABLES;
