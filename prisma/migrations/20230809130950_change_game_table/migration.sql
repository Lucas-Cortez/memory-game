/*
  Warnings:

  - You are about to drop the column `it_won` on the `game` table. All the data in the column will be lost.
  - Added the required column `award` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_time_seconds` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_game" (
    "game_id" TEXT NOT NULL PRIMARY KEY,
    "award" TEXT NOT NULL,
    "game_time_seconds" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "game_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_game" ("game_id", "user_id") SELECT "game_id", "user_id" FROM "game";
DROP TABLE "game";
ALTER TABLE "new_game" RENAME TO "game";
CREATE UNIQUE INDEX "game_game_id_key" ON "game"("game_id");
CREATE UNIQUE INDEX "game_user_id_key" ON "game"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
