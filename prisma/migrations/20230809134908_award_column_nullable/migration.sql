-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_game" (
    "game_id" TEXT NOT NULL PRIMARY KEY,
    "award" TEXT,
    "game_time_seconds" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "game_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_game" ("award", "game_id", "game_time_seconds", "user_id") SELECT "award", "game_id", "game_time_seconds", "user_id" FROM "game";
DROP TABLE "game";
ALTER TABLE "new_game" RENAME TO "game";
CREATE UNIQUE INDEX "game_game_id_key" ON "game"("game_id");
CREATE UNIQUE INDEX "game_user_id_key" ON "game"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
