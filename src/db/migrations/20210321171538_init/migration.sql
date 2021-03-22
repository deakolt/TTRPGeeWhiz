-- CreateTable
CREATE TABLE `Count` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rpgId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rpg` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `subreddit` VARCHAR(191) NOT NULL,
    `multiple` BOOLEAN NOT NULL DEFAULT false,
UNIQUE INDEX `Rpg.name_unique`(`name`),
UNIQUE INDEX `Rpg.subreddit_unique`(`subreddit`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Count` ADD FOREIGN KEY (`rpgId`) REFERENCES `Rpg`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
