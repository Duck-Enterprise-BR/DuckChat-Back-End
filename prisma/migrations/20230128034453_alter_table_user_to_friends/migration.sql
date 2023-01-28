-- DropForeignKey
ALTER TABLE "friends" DROP CONSTRAINT "friends_my_user_id_fkey";

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
