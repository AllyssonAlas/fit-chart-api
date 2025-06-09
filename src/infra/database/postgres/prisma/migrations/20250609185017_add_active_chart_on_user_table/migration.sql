/*
  Warnings:

  - A unique constraint covering the columns `[activeChartId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeChartId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_activeChartId_key" ON "User"("activeChartId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activeChartId_fkey" FOREIGN KEY ("activeChartId") REFERENCES "ExercisesChart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
