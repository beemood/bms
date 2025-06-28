/*
  Warnings:

  - Added the required column `passwordSalt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordSalt" TEXT NOT NULL,
ALTER COLUMN "deletedAt" DROP NOT NULL;
