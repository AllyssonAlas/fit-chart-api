/*
  Warnings:

  - You are about to drop the `_GymToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GymToUser" DROP CONSTRAINT "_GymToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GymToUser" DROP CONSTRAINT "_GymToUser_B_fkey";

-- DropTable
DROP TABLE "_GymToUser";

-- CreateTable
CREATE TABLE "_ClientsToGym" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClientsToGym_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_InstructorsToGym" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InstructorsToGym_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AdministratorsToGym" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AdministratorsToGym_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClientsToGym_B_index" ON "_ClientsToGym"("B");

-- CreateIndex
CREATE INDEX "_InstructorsToGym_B_index" ON "_InstructorsToGym"("B");

-- CreateIndex
CREATE INDEX "_AdministratorsToGym_B_index" ON "_AdministratorsToGym"("B");

-- AddForeignKey
ALTER TABLE "_ClientsToGym" ADD CONSTRAINT "_ClientsToGym_A_fkey" FOREIGN KEY ("A") REFERENCES "Gym"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientsToGym" ADD CONSTRAINT "_ClientsToGym_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorsToGym" ADD CONSTRAINT "_InstructorsToGym_A_fkey" FOREIGN KEY ("A") REFERENCES "Gym"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorsToGym" ADD CONSTRAINT "_InstructorsToGym_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdministratorsToGym" ADD CONSTRAINT "_AdministratorsToGym_A_fkey" FOREIGN KEY ("A") REFERENCES "Gym"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdministratorsToGym" ADD CONSTRAINT "_AdministratorsToGym_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
