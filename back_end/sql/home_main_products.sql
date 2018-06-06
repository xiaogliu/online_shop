-- 创建 home_main_products：首页主要展示的三张图片
DROP TABLE IF EXISTS `home_main_products`;

CREATE TABLE `home_main_products` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(1000) NOT NULL DEFAULT '',
  `description` VARCHAR(1000) NOT NULL DEFAULT '',
  `img_url` VARCHAR(1000) NOT NULL DEFAULT '',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `home_main_products` WRITE;

INSERT INTO `home_main_products`(`id`, `title`, `description`, `img_url`, `created_at`, `updated_at`)
VALUES(
  1,
  '印度神油 你值得拥有',
  '印度神油 你值得拥有值得拥有值得拥有值得拥有值得拥有值得拥有',
  'http://oifk6rgqz.bkt.clouddn.com/india.jpg',
  '2018-05-16 22:00:00',
  '2018-05-16 22:00:00'
);
INSERT INTO `home_main_products`(`id`, `title`, `description`, `img_url`, `created_at`, `updated_at`)
VALUES(
  2,
  '印度神油',
  '印度神油 你值得拥有值得拥有值得拥有值得拥有值得拥有值得拥有',
  'http://oifk6rgqz.bkt.clouddn.com/india.jpg',
  '2018-05-16 22:00:00',
  '2018-05-16 22:00:00'
);
INSERT INTO `home_main_products`(`id`, `title`, `description`, `img_url`, `created_at`, `updated_at`)
VALUES(
  3,
  '印度神油',
  '印度神油 你值得拥有值得拥有值得拥有值得拥有值得拥有值得拥有',
  'http://oifk6rgqz.bkt.clouddn.com/india.jpg',
  '2018-05-16 22:00:00',
  '2018-05-16 22:00:00'
);

UNLOCK TABLES;
