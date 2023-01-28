import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private crypto: CryptoService
  ){ }

  async create(data: CreateUserDto) {
    const checkAlreadyExistsUsername = await this.prisma.countCaseSensitive("users", "username", data.username);

    if(checkAlreadyExistsUsername.length){
      throw new BadRequestException("Username already create");
    }

    const checkAlreadyExistsEmail = await this.prisma.countCaseSensitive("users", "email", data.email);
    
    if(checkAlreadyExistsEmail.length){
      throw new BadRequestException("Email already create");
    }

    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        username: data.username,
        password: await this.crypto.hash(data.password)
      }
    });
  }

  async getMyProfile(userId: number){
    return await this.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        username: true
      }
    });
  }

  async checkExists(userId: number){
    return await this.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true
      }
    })
  }

  async findOne(email: string){
    return await this.prisma.user.findFirst({
      where: {
        email: email
      }
    })
  }

  async findMany(ids: number[]){
    return await this.prisma.user.findMany({
      where: {
        id: {
          in: ids
        }
      },
      select: {
        id: true,
        name: true,
        avatar: true
      }
    })
  }
}
