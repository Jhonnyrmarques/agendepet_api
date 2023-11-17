/*
  Warnings:

  - You are about to drop the column `kind` on the `breeds` table. All the data in the column will be lost.
  - You are about to drop the column `kind` on the `pets` table. All the data in the column will be lost.
  - Added the required column `specie` to the `breeds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specie` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar_url` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "breeds" DROP COLUMN "kind",
ADD COLUMN     "specie" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "kind",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "specie" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "avatar_url" TEXT NOT NULL;
