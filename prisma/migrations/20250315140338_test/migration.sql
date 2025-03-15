/*
  Warnings:

  - Made the column `teacherId` on table `Cours` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cours" DROP CONSTRAINT "Cours_teacherId_fkey";

-- AlterTable
ALTER TABLE "Cours" ALTER COLUMN "teacherId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Cours" ADD CONSTRAINT "Cours_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
