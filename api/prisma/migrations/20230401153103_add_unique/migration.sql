/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `DataOfEscort` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DataOfEscort_clientId_key" ON "DataOfEscort"("clientId");
