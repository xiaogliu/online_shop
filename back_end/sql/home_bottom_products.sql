-- 创建 home_bottom_products：首页主要展示的三张图片
DROP TABLE IF EXISTS `home_bottom_products`;

CREATE TABLE `home_bottom_products` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(1000) NOT NULL DEFAULT '',
  `description` VARCHAR(1000) NOT NULL DEFAULT '',
  `price` INT(30) NOT NULL DEFAULT 0,
  `img_url` VARCHAR(1000) NOT NULL DEFAULT '',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `home_bottom_products` WRITE;

INSERT INTO `home_bottom_products`(`id`, `title`, `description`, `price`, `img_url`, `created_at`, `updated_at`)
VALUES(
  1,
  '印度神油 你值得拥有',
  '印度神油 你值得拥有值得拥有值得拥有值得拥有值得拥有值得拥有',
  1000,
  'http://oifk6rgqz.bkt.clouddn.com/coin.png',
  '2018-06-05 22:00:00',
  '2018-06-05 22:00:00'
);
INSERT INTO `home_bottom_products`(`id`, `title`, `description`, `price`, `img_url`, `created_at`, `updated_at`)
VALUES(
  2,
  '印度神油 你值得拥有',
  '印度神油 你值得拥有值得拥有值得拥有值得拥有值得拥有值得拥有',
  19999,
  'http://oifk6rgqz.bkt.clouddn.com/india.png',
  '2018-06-05 22:00:00',
  '2018-06-05 22:00:00'
);
INSERT INTO `home_bottom_products`(`id`, `title`, `description`, `price`, `img_url`, `created_at`, `updated_at`)
VALUES(
  3,
  '印度神油 你值得拥有',
  '印度神油 你值得拥有值得拥有值得拥有值得拥有值得拥有值得拥有',
  8888,
  'http://oifk6rgqz.bkt.clouddn.com/real_name.png',
  '2018-06-05 22:00:00',
  '2018-06-05 22:00:00'
);

UNLOCK TABLES;
