/*
  Warnings:

  - Added the required column `summary` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "extraTags" TEXT,
ADD COLUMN     "summary" TEXT NOT NULL;
