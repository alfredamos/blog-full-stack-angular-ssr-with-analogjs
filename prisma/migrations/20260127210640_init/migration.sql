-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
    `image` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `authors` (
    `id` VARCHAR(191) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `gender` ENUM('Female', 'Male') NOT NULL DEFAULT 'Male',
    `image` VARCHAR(255) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `age` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `authors_email_key`(`email`),
    UNIQUE INDEX `authors_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `imageUrl` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `authorId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens` (
    `id` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(750) NOT NULL,
    `refreshToken` VARCHAR(750) NOT NULL,
    `revoked` BOOLEAN NOT NULL,
    `expired` BOOLEAN NOT NULL,
    `tokenType` ENUM('Bearer') NOT NULL DEFAULT 'Bearer',
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tokens_accessToken_key`(`accessToken`),
    UNIQUE INDEX `tokens_refreshToken_key`(`refreshToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `authors` ADD CONSTRAINT `authors_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `authors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
