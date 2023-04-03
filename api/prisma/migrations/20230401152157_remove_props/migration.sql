/*
  Warnings:

  - You are about to drop the column `hip` on the `DataOfEscort` table. All the data in the column will be lost.
  - You are about to drop the column `waist` on the `DataOfEscort` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DataOfEscort" DROP COLUMN "hip",
DROP COLUMN "waist";
