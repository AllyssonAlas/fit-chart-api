/*
  Warnings:

  - You are about to drop the column `administrators` on the `Gym` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gym" DROP COLUMN "administrators";

-- CreateTable
CREATE TABLE "_GymToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GymToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GymToUser_B_index" ON "_GymToUser"("B");

-- AddForeignKey
ALTER TABLE "_GymToUser" ADD CONSTRAINT "_GymToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Gym"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GymToUser" ADD CONSTRAINT "_GymToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
