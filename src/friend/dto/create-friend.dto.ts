import { IsNumber } from "class-validator";

export class CreateFriendDto {
    @IsNumber()
    user_id: number
}
