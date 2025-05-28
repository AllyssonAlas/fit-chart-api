-- CreateTable
CREATE TABLE "ExercisesOnChart" (
    "id" TEXT NOT NULL,
    "chartId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "repts" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "division" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExercisesOnChart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercisesDivisions" (
    "id" TEXT NOT NULL,
    "chartId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weekDays" INTEGER[],

    CONSTRAINT "ExercisesDivisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercisesChart" (
    "id" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "observation" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExercisesChart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExercisesChart_userId_key" ON "ExercisesChart"("userId");

-- AddForeignKey
ALTER TABLE "ExercisesOnChart" ADD CONSTRAINT "ExercisesOnChart_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "ExercisesChart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesOnChart" ADD CONSTRAINT "ExercisesOnChart_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesDivisions" ADD CONSTRAINT "ExercisesDivisions_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "ExercisesChart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesChart" ADD CONSTRAINT "ExercisesChart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
