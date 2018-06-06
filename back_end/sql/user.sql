-- 创建 user 表

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uid` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(32) NOT NULL DEFAULT '',
  `email` VARCHAR(64) NOT NULL DEFAULT '',
  `password` VARCHAR(64) NOT NULL DEFAULT '',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;

INSERT INTO `user`(`uid`, `username`, `email`, `password`, `created_at`, `updated_at`)
VALUES(1,'vince','xiaogliu@outlook.com','111111','2018-05-16 22:00:00','2018-05-16 22:00:00');

UNLOCK TABLES;
