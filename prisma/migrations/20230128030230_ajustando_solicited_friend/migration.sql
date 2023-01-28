-- DropForeignKey
ALTER TABLE "solicited_friend" DROP CONSTRAINT "solicited_friend_solicited_by_id_fkey";

-- AddForeignKey
ALTER TABLE "solicited_friend" ADD CONSTRAINT "solicited_friend_target_by_id_fkey" FOREIGN KEY ("target_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
