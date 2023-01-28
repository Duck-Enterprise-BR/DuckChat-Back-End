import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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

    if(checkRelationship){
      return checkRelationship;
    };

    await this.prismaService.friend.create({
      data: {
        user_id: myUserId,
        my_user_id: partnerId
      }
    })

    await this.prismaService.friend.create({
      data: {
        user_id: partnerId,
        my_user_id: myUserId
      }
    })
  }
  async myList(myUserId: number){
    return await this.prismaService.friend.findMany({
      where: {
        my_user_id: myUserId
      },
      include: {
        friend: {
          select: {
            name: true
          },
        }
      }
    })
  }
}
