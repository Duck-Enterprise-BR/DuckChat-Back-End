import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/")
  create(@Body() props: CreateUserDto){
    return this.userService.create(props);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/my-profile")
  myProfile(@Request() req){
    const { userId } = req.user;
    return this.userService.getMyProfile(userId);
  }
}
