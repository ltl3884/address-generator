-- CreateTable
CREATE TABLE "public"."address_info" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(64) NOT NULL,
    "gender" VARCHAR(16) NOT NULL,
    "birthday" VARCHAR(64) NOT NULL,
    "address" VARCHAR(512) NOT NULL,
    "telephone" VARCHAR(20),
    "city" VARCHAR(100),
    "zip_code" VARCHAR(20),
    "state" VARCHAR(50),
    "state_full" VARCHAR(100),
    "source_url" VARCHAR(1024),
    "country" VARCHAR(100),
    "latitude" VARCHAR(20),
    "longitude" VARCHAR(20),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ix_address_info_created_at" ON "public"."address_info"("created_at");

-- CreateIndex
CREATE INDEX "idx_address_city" ON "public"."address_info"("address", "city");

-- CreateIndex
CREATE INDEX "idx_country" ON "public"."address_info"("country");

-- CreateIndex
CREATE INDEX "idx_city" ON "public"."address_info"("city");

-- CreateIndex
CREATE INDEX "idx_state" ON "public"."address_info"("state");

-- CreateIndex
CREATE INDEX "idx_state_full" ON "public"."address_info"("state_full");
