/*
  Warnings:

  - You are about to drop the column `ad` on the `Job` table. All the data in the column will be lost.
  - Added the required column `description` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `href` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Made the column `company` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "ad",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'default_description',
ADD COLUMN     "href" TEXT NOT NULL DEFAULT 'default_href',
ALTER COLUMN "company" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
