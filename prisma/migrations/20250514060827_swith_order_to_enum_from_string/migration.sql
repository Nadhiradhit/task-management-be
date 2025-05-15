/*
  Warnings:

  - The `order` column on the `column` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ColoumnStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "column" DROP COLUMN "order",
ADD COLUMN     "order" "ColoumnStatus" NOT NULL DEFAULT 'TODO';
