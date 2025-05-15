/*
  Warnings:

  - The `order` column on the `column` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ColumnStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- DropIndex
DROP INDEX "column_board_id_key";

-- DropIndex
DROP INDEX "task_column_id_key";

-- AlterTable
ALTER TABLE "column" DROP COLUMN "order",
ADD COLUMN     "order" "ColumnStatus" NOT NULL DEFAULT 'TODO';

-- DropEnum
DROP TYPE "ColoumnStatus";
