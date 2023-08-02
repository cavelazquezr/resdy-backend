/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "food_menus"."categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "id";
