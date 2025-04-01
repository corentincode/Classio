/*
  Warnings:

  - Added the required column `updatedAt` to the `Etablissement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Etablissement" ADD COLUMN     "adresse" TEXT,
ADD COLUMN     "codePostal" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "telephone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ville" TEXT;
