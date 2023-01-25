import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CryptoService } from 'src/crypto/crypto.service';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
}
