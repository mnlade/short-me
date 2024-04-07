-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "link_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_link" ("createdAt", "creatorId", "description", "id", "short", "url") SELECT "createdAt", "creatorId", "description", "id", "short", "url" FROM "link";
DROP TABLE "link";
ALTER TABLE "new_link" RENAME TO "link";
CREATE UNIQUE INDEX "link_short_key" ON "link"("short");
CREATE INDEX "link_short_idx" ON "link"("short");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
