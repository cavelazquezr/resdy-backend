-- AlterTable
CREATE SEQUENCE "menu".category_order_seq;
ALTER TABLE "menu"."category" ALTER COLUMN "order" SET DEFAULT nextval('"menu".category_order_seq');
ALTER SEQUENCE "menu".category_order_seq OWNED BY "menu"."category"."order";
