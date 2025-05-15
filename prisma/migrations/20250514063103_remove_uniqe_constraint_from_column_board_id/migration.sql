/*
  Warnings:

  - You are about to drop the column `coloumn_id` on the `task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[column_id]` on the table `task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `column_id` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_coloumn_id_fkey";

-- DropIndex
DROP INDEX "task_coloumn_id_key";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "coloumn_id",
ADD COLUMN     "column_id" VARCHAR(12) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "task_column_id_key" ON "task"("column_id");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "column"("id") ON DELETE CASCADE ON UPDATE CASCADE;
