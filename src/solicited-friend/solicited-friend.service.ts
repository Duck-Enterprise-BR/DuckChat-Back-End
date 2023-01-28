import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FriendService } from 'src/friend/friend.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateSolicitedFriendDto } from './dto/create-solicited-friend.dto';
import { UpdateSolicitedFriendDto } from './dto/update-solicited-friend.dto';
import { SolicitedFriendTypes } from './interfaces/solicited-friend-types';

@Injectable()
export class SolicitedFriendService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly friendService: FriendService
  ){}

  async create(createSolicitedFriendDto: CreateSolicitedFriendDto) {
    if(createSolicitedFriendDto.my_user_id === createSolicitedFriendDto.target_user_id){
      throw new BadRequestException("Invalid params");
    }
    
    const checkUser = await this.userService.checkExists(createSolicitedFriendDto.target_user_id);

    if(!checkUser){
      throw new BadRequestException("User not found");
    }

    const checkAlreadyExists = await this.prismaService.solicitedFriend.findFirst({
      where: {
        target_by_id: createSolicitedFriendDto.target_user_id,
        solicited_by_id: createSolicitedFriendDto.my_user_id
      }
    });

    if(checkAlreadyExists){
      return checkAlreadyExists;
    };

    const status: SolicitedFriendTypes = "PENDING";

    return await this.prismaService.solicitedFriend.create({
      data: {
        target_by_id: createSolicitedFriendDto.target_user_id,
        solicited_by_id: createSolicitedFriendDto.my_user_id,
        status: status
      }
    });
  }

  async approvedOrReproved(id: string, userId: number, status: SolicitedFriendTypes){
    const validStatus: SolicitedFriendTypes[] = ["APPROVED", "REPROVED"];
    
    if(!validStatus.includes(status)){
      throw new BadRequestException("Invalid Status");
    };

    const checkValidId = await this.prismaService.solicitedFriend.findFirst({
      where: {
        id: id,
        target_by_id: userId
      }
    })

    if(!checkValidId){
      throw new NotFoundException("Not Found Id or Invalid operation");
    };

    if(status === "APPROVED"){
      const save = await this.prismaService.solicitedFriend.update({
        where: {
          id: id
        },
        data: {
          status: "APPROVED"
        }
      });

      await this.friendService.create(userId, checkValidId.target_by_id);
      return save;
    };

    return await this.prismaService.solicitedFriend.update({
      where: {
        id: id
      },
      data: {
        status: "REPROVED"
      }
    });
  }

  async findAll(userId: number) {
    return await this.prismaService.solicitedFriend.findMany({
      where: {
        solicited_by_id: userId,
        status: "PENDING"
      },
      include: {
        target_by: {
          select: {
            name: true,
          }
        }
      }
    })
  }

  async removedById(id: string, userId: number){
    const checkIfIsValidSolicited = await this.prismaService.solicitedFriend.findFirst({
      where: {
        id: id,
        solicited_by_id: userId
      }
    });

    if(!checkIfIsValidSolicited){
      throw new BadRequestException("Invalid Operation");
    }

    return await this.prismaService.solicitedFriend.update({
      where: {
        id: id
      },
      data: {
        status: "REPROVED",
        recusuted_at: new Date()
      }
    })
  }

  update(id: number, updateSolicitedFriendDto: UpdateSolicitedFriendDto) {
    return `This action updates a #${id} solicitedFriend`;
  }
}
