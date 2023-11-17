/*
  Warnings:

  - Made the column `specie` on table `breeds` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specie` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "breeds" ALTER COLUMN "specie" SET NOT NULL;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "specie" SET NOT NULL;
