import { IsNumber } from "class-validator";

export class CreateSolicitedFriendDto {
    @IsNumber()
    target_user_id: number

    @IsNumber()
    my_user_id: number
}
