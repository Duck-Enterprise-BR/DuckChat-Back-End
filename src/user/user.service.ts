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

  async login(loginUserDto: LoginUserDto){
    const checkEmail = await this.prisma.user.findFirst({
      where: {
        email: loginUserDto.email
      }
    });

    if(!checkEmail){
      throw new NotFoundException("Login or Password not found");
    };

    const { password } = checkEmail;

    const checkPassword = await this.crypto.compare(loginUserDto.password, password);

    if(!checkPassword){
      throw new NotFoundException("Login or Password not found");
    };

    return {
      message: 'success'
    }
  }

  async create(data: CreateUserDto) {
    const checkEmail = await this.prisma.user.findFirst({
      where: {
        email: data.email
      }
    });

    if(checkEmail){
      throw new BadRequestException("Email already create");
    }

    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: await this.crypto.hash(data.password)
      }
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
