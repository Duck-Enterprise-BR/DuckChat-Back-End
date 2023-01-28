import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FriendService } from 'src/friend/friend.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateSolicitedFriendDto } from './dto/create-solicited-friend.dto';
import { UpdateSolicitedFriendDto } from './dto/update-solicited-friend.dto';
import { SolicitedFriendTypes } from './interfaces/solicited-friend-types';
import { mySolicitationToApprovedOrReproved } from './interfaces/solicited-friend.interface';

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

  async mySolicitationsToApprovedOrReproved(userId: number){
    const solicitedDatabaseIds = await this.prismaService.solicitedFriend.findMany({
      where: {
        target_by_id: userId,
        status: "PENDING"
      },
      select: {
        id: true,
        solicited_by_id: true,
      },
    });

    if(!solicitedDatabaseIds.length){
      return [];
    }

    const solicitedUsers = solicitedDatabaseIds.map((item) => { 
      return {
        solicited_by_id: item.solicited_by_id,
        id: item.id
      }
    });
    const solicitedUserIds = solicitedDatabaseIds.map((item) => { return item.solicited_by_id });
    const userList = await this.userService.findMany(solicitedUserIds);
    const response: mySolicitationToApprovedOrReproved[] = [];

    for(const solicited of solicitedUsers){
      const checkUser = userList.find((element => element.id === solicited.solicited_by_id));

      if(!checkUser){
        continue;
      }

      response.push({
        id: solicited.id,
        name: checkUser.name,
        avatar: checkUser.avatar,
      })
    };

    return response;
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

      await this.friendService.create(userId, checkValidId.solicited_by_id);
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
