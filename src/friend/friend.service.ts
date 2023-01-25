import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Injectable()
export class FriendService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create(myUserId: number, partnerId: number) {
    const partnerUser = await this.prismaService.user.findFirst({
      where: {
        id: partnerId
      },
      select: {
        id: true
      }
    });

    if(!partnerUser){
      throw new BadRequestException("User not found");
    }

    const checkRelationship = await this.prismaService.friend.findFirst({
      where: {
        my_user_id: myUserId,
        user_id: partnerId
      },
    });

    if(!checkRelationship){
      throw new BadRequestException("Friend already create");
    };

    return await this.prismaService.friend.create({
      data: {
        user_id: partnerId,
        my_user_id: myUserId
      }
    })
  }

  findAll() {
    return `This action returns all friend`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  async myList(myUserId: number){
    return await this.prismaService.friend.findMany({
      where: {
        my_user_id: myUserId
      },
    })
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
