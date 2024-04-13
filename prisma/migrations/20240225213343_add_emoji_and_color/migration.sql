/*
  Warnings:

  - Added the required column `color` to the `save_list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emoji` to the `save_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "list"."save_list" ADD COLUMN     "color" VARCHAR(7) NOT NULL,
ADD COLUMN     "emoji" VARCHAR(50) NOT NULL;
