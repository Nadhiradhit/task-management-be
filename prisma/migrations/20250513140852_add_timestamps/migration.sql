/*
  Warnings:

  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- First add the columns with default values
ALTER TABLE "user" ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "user" ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Then remove the default from created_at since it's only needed for existing records
ALTER TABLE "user" ALTER COLUMN "created_at" DROP DEFAULT;
