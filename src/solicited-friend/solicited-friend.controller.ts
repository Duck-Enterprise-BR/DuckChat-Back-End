import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Request, BadRequestException } from '@nestjs/common';
import { SolicitedFriendService } from './solicited-friend.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SolicitedFriendTypes } from './interfaces/solicited-friend-types';

@Controller('solicited-friend')
export class SolicitedFriendController {
  constructor(
    private readonly solicitedFriendService: SolicitedFriendService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() body: { target_user_id: number }) {
    return this.solicitedFriendService.create({
      my_user_id: req.user.userId,
      target_user_id: body.target_user_id
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  approvedOrReproved(@Request() req, @Param("id") id,  @Body() body: { status: SolicitedFriendTypes }){
    if(!body){
      throw new BadRequestException("Invalid status");
    };

    return this.solicitedFriendService.approvedOrReproved(id, req.user.userId, body.status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deletedSolicited(@Request() req, @Param("id") id){
    return this.solicitedFriendService.removedById(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const userId = req.user.userId;
    return this.solicitedFriendService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/mySolicitationToApprovedOrReproved")
  mySolicitationToApprovedOrReproved(@Request() req) {
    const userId = req.user.userId;
    return this.solicitedFriendService.mySolicitationsToApprovedOrReproved(userId);
  }
}
