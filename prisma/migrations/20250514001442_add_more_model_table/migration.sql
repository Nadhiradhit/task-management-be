-- DropForeignKey
ALTER TABLE "board" DROP CONSTRAINT "board_created_by_fkey";

-- CreateTable
CREATE TABLE "boarduser" (
    "user_id" VARCHAR(12) NOT NULL,
    "board_id" VARCHAR(12) NOT NULL
);

-- CreateTable
CREATE TABLE "column" (
    "id" VARCHAR(12) NOT NULL,
    "board_id" VARCHAR(12) NOT NULL,
    "name" TEXT NOT NULL,
    "order" TEXT NOT NULL,

    CONSTRAINT "column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" VARCHAR(12) NOT NULL,
    "coloumn_id" VARCHAR(12) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assigned_to" TEXT NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boarduser_user_id_board_id_key" ON "boarduser"("user_id", "board_id");

-- CreateIndex
CREATE UNIQUE INDEX "column_id_key" ON "column"("id");

-- CreateIndex
CREATE UNIQUE INDEX "column_board_id_key" ON "column"("board_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_id_key" ON "task"("id");

-- CreateIndex
CREATE UNIQUE INDEX "task_coloumn_id_key" ON "task"("coloumn_id");

-- AddForeignKey
ALTER TABLE "board" ADD CONSTRAINT "board_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boarduser" ADD CONSTRAINT "boarduser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boarduser" ADD CONSTRAINT "boarduser_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_coloumn_id_fkey" FOREIGN KEY ("coloumn_id") REFERENCES "column"("id") ON DELETE CASCADE ON UPDATE CASCADE;
