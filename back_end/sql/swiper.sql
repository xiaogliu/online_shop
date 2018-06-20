-- 创建 swiper

DROP TABLE IF EXISTS `swiper`;

CREATE TABLE `swiper` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `img_url` VARCHAR(1000) NOT NULL DEFAULT '',
  `path` VARCHAR(1000) NOT NULL DEFAULT '',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `swiper` WRITE;

INSERT INTO `swiper`(`id`, `img_url`, `path`, `created_at`, `updated_at`)
VALUES(1, 'http://oifk6rgqz.bkt.clouddn.com/1.jpg', 'http://oifk6rgqz.bkt.clouddn.com/1.jpg', '2018-05-16 22:00:00', '2018-05-16 22:00:00');

UNLOCK TABLES;
