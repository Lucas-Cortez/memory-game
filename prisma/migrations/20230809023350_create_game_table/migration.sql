-- CreateTable
CREATE TABLE "game" (
    "game_id" TEXT NOT NULL PRIMARY KEY,
    "it_won" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "game_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "game_game_id_key" ON "game"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "game_user_id_key" ON "game"("user_id");
