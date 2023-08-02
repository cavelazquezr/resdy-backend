-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "food_menus";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "webs";

-- CreateTable
CREATE TABLE "auth"."users" (
    "id" VARCHAR(36) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "firstname" VARCHAR(20) NOT NULL,
    "lastname" VARCHAR(20) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webs"."webs" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "webs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webs"."customization" (
    "colorPalette" JSON NOT NULL,
    "fontFamilies" JSON NOT NULL,
    "extraCustomization" JSON,
    "logoUrl" VARCHAR(65529),
    "name" VARCHAR(20) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "webId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "webs"."web_information" (
    "phone" VARCHAR(10),
    "address" VARCHAR(30),
    "city" VARCHAR(30),
    "country" VARCHAR(30),
    "socialMedia" JSON,
    "restaurantType" VARCHAR(30),
    "location" JSON,
    "extraInformation" JSON,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "webId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "webs"."ratings" (
    "ratings" JSON,
    "webId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "food_menus"."categories" (
    "id" VARCHAR(36) NOT NULL,
    "categories" JSON,
    "webId" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_menus"."dishes" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "category" VARCHAR(30) NOT NULL,
    "photoUrl" VARCHAR(65529),
    "price" DECIMAL(10,2) NOT NULL,
    "description" VARCHAR(400),
    "allergen" VARCHAR(30)[] DEFAULT ARRAY['noAllergens']::VARCHAR(30)[],
    "webId" TEXT NOT NULL,

    CONSTRAINT "dishes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "auth"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "webs_name_key" ON "webs"."webs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "customization_webId_key" ON "webs"."customization"("webId");

-- CreateIndex
CREATE UNIQUE INDEX "web_information_webId_key" ON "webs"."web_information"("webId");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_webId_key" ON "webs"."ratings"("webId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_webId_key" ON "food_menus"."categories"("webId");

-- AddForeignKey
ALTER TABLE "webs"."webs" ADD CONSTRAINT "webs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "auth"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webs"."customization" ADD CONSTRAINT "customization_webId_fkey" FOREIGN KEY ("webId") REFERENCES "webs"."webs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webs"."web_information" ADD CONSTRAINT "web_information_webId_fkey" FOREIGN KEY ("webId") REFERENCES "webs"."webs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webs"."ratings" ADD CONSTRAINT "ratings_webId_fkey" FOREIGN KEY ("webId") REFERENCES "webs"."webs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_menus"."categories" ADD CONSTRAINT "categories_webId_fkey" FOREIGN KEY ("webId") REFERENCES "webs"."webs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_menus"."dishes" ADD CONSTRAINT "dishes_webId_fkey" FOREIGN KEY ("webId") REFERENCES "webs"."webs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
