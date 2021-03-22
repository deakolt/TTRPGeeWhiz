/*
  Warnings:

  - Added the required column `count` to the `Count` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Count` ADD COLUMN     `count` INTEGER NOT NULL;
