-- CreateTable
CREATE TABLE "user_db" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_name" TEXT,
    "password_hash" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "device_type" TEXT,

    CONSTRAINT "user_db_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_db_email_key" ON "user_db"("email");
