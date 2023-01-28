-- CreateTable
CREATE TABLE "solicited_friend" (
    "id" TEXT NOT NULL,
    "solicited_by_id" INTEGER NOT NULL,
    "target_by_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "recusuted_at" TIMESTAMP(3),

    CONSTRAINT "solicited_friend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "solicited_friend_id_key" ON "solicited_friend"("id");

-- AddForeignKey
ALTER TABLE "solicited_friend" ADD CONSTRAINT "solicited_friend_solicited_by_id_fkey" FOREIGN KEY ("solicited_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
