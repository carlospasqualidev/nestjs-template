/*
  Warnings:

  - You are about to drop the column `isBlocked` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "isBlocked",
DROP COLUMN "isDeleted";
