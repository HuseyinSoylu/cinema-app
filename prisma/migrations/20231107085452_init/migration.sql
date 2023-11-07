/*
  Warnings:

  - Added the required column `city` to the `Cinema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cinema" ADD COLUMN     "city" TEXT NOT NULL;
