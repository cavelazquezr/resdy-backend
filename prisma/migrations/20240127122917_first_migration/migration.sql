-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "booking";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "list";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "menu";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "rating";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "restaurant";

-- CreateTable
CREATE TABLE "auth"."users" (
    "id" VARCHAR(36) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "firstname" VARCHAR(20) NOT NULL,
    "lastname" VARCHAR(20) NOT NULL,
    "avatar_url" VARCHAR(65529),
    "password" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_owner" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant"."restaurants" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "admin_id" TEXT NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant"."customization" (
    "color_palette" JSON,
    "font_families" JSON,
    "extra_customization" JSON,
    "logo_url" VARCHAR(65529),
    "header_url" VARCHAR(65529),
    "name" VARCHAR(20),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "restaurant_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "restaurant"."restaurant_information" (
    "phone" VARCHAR(10),
    "address" VARCHAR(30),
    "city" VARCHAR(30),
    "country" VARCHAR(30),
    "social_media" JSON,
    "restaurant_type" VARCHAR(30),
    "location" JSON,
    "description" VARCHAR(500),
    "extra_information" JSON,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "restaurant_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "rating"."rating" (
    "id" VARCHAR(36) NOT NULL,
    "rating" INTEGER,
    "title" VARCHAR(50),
    "comment" VARCHAR(400),
    "status" VARCHAR(30) NOT NULL,
    "answer" VARCHAR(400),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking"."reservation" (
    "id" VARCHAR(36) NOT NULL,
    "number_of_person" INTEGER NOT NULL,
    "date_of_reservation" DATE NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu"."category" (
    "id" VARCHAR(36) NOT NULL,
    "label" VARCHAR(30) NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu"."dish" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "photo_url" VARCHAR(65529),
    "price" DECIMAL(10,2) NOT NULL,
    "description" VARCHAR(400),
    "allergen" VARCHAR(400),
    "restaurant_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "dish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list"."save_list" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "save_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list"."save_list_item" (
    "id" VARCHAR(36) NOT NULL,
    "list_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "save_list_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "auth"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_name_key" ON "restaurant"."restaurants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "customization_restaurant_id_key" ON "restaurant"."customization"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_information_restaurant_id_key" ON "restaurant"."restaurant_information"("restaurant_id");

-- AddForeignKey
ALTER TABLE "restaurant"."restaurants" ADD CONSTRAINT "restaurants_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "auth"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant"."customization" ADD CONSTRAINT "customization_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"."restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant"."restaurant_information" ADD CONSTRAINT "restaurant_information_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"."restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating"."rating" ADD CONSTRAINT "rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating"."rating" ADD CONSTRAINT "rating_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"."restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking"."reservation" ADD CONSTRAINT "reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking"."reservation" ADD CONSTRAINT "reservation_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"."restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu"."category" ADD CONSTRAINT "category_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"."restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu"."dish" ADD CONSTRAINT "dish_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"."restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu"."dish" ADD CONSTRAINT "dish_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "menu"."category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list"."save_list" ADD CONSTRAINT "save_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list"."save_list_item" ADD CONSTRAINT "save_list_item_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list"."save_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list"."save_list_item" ADD CONSTRAINT "save_list_item_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"."restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
