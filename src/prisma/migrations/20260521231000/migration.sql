/*
  Warnings:

  - You are about to drop the column `areaConhecimento` on the `Projeto` table. All the data in the column will be lost.
  - Added the required column `area_conhecimento` to the `Projeto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projeto" DROP COLUMN "areaConhecimento",
ADD COLUMN     "area_conhecimento" TEXT NOT NULL;
