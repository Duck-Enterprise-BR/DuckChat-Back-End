import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  login(@Body() props: LoginUserDto){
    return this.userService.login(props);
  }

  @Post("/")
  create(@Body() props: CreateUserDto){
    return this.userService.create(props);
  }
}
