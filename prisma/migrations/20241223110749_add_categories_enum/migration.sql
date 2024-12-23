/*
  Warnings:

  - Changed the type of `category` on the `Feedback` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('BUG', 'FEATURE', 'ENHANCEMENT', 'OTHER');

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;