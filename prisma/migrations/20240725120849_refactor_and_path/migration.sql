/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `color_palette` on the `customization` table. All the data in the column will be lost.
  - You are about to drop the column `font_families` on the `customization` table. All the data in the column will be lost.
  - You are about to drop the column `header_url` on the `customization` table. All the data in the column will be lost.
  - You are about to drop the column `logo_url` on the `customization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth"."users" DROP COLUMN "avatar_url",
ADD COLUMN     "avatar_path" VARCHAR(65529);

-- AlterTable
ALTER TABLE "restaurant"."customization" DROP COLUMN "color_palette",
DROP COLUMN "font_families",
DROP COLUMN "header_url",
DROP COLUMN "logo_url",
ADD COLUMN     "headers_path" TEXT[] DEFAULT ARRAY[]::TEXT[];
