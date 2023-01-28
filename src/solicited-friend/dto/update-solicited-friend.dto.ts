import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitedFriendDto } from './create-solicited-friend.dto';

export class UpdateSolicitedFriendDto extends PartialType(CreateSolicitedFriendDto) {}
