import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImage } from 'src/upload-image/upload-image.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadImage: UploadImage
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post("/profile")
  async uploadProfile(@Request() req, @UploadedFile() file: Express.Multer.File){
    const { userId } = req.user;

    if(!file){
      throw new BadRequestException("Invalid file");
    };

    const url = await this.uploadImage.upload(userId, file);

    if(url){
      await this.userService.updateProfile(userId, url);
    }
    
    return { avatar: url };
  }
}
