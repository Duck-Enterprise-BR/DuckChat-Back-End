-- CreateTable
CREATE TABLE "friends" (
    "id" SERIAL NOT NULL,
    "my_user_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_my_user_id_fkey" FOREIGN KEY ("my_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
