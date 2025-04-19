/*
  Warnings:

  - Added the required column `type` to the `Articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Articles" ADD COLUMN     "type" TEXT NOT NULL;
