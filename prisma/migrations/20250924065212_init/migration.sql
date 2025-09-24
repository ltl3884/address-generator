-- CreateTable
CREATE TABLE `address_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(64) NOT NULL,
    `gender` VARCHAR(16) NOT NULL,
    `birthday` VARCHAR(64) NOT NULL,
    `address` TEXT NOT NULL,
    `telephone` VARCHAR(20) NULL,
    `city` VARCHAR(100) NULL,
    `zip_code` VARCHAR(20) NULL,
    `state` VARCHAR(50) NULL,
    `state_full` VARCHAR(100) NULL,
    `source_url` TEXT NULL,
    `country` VARCHAR(100) NOT NULL,
    `latitude` VARCHAR(20) NULL,
    `longitude` VARCHAR(20) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `address_info_country_idx`(`country`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
