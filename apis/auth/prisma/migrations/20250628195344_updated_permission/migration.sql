/*
  Warnings:

  - You are about to drop the column `operationName` on the `Permisison` table. All the data in the column will be lost.
  - You are about to drop the column `resourceName` on the `Permisison` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[app,resource,operation]` on the table `Permisison` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `app` to the `Permisison` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operation` to the `Permisison` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resource` to the `Permisison` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Permisison_resourceName_operationName_key";

-- AlterTable
ALTER TABLE "Permisison" DROP COLUMN "operationName",
DROP COLUMN "resourceName",
ADD COLUMN     "app" TEXT NOT NULL,
ADD COLUMN     "operation" TEXT NOT NULL,
ADD COLUMN     "resource" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "App" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "App_name_key" ON "App"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permisison_app_resource_operation_key" ON "Permisison"("app", "resource", "operation");
