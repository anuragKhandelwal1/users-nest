import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './services/user.service';
import { User, Prisma } from '@prisma/client';
@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getAllUsers(
    @Param('pagination')
    pagination: {
      skip: number;
      take: number;
      orderBy: Prisma.UserOrderByWithRelationInput;
    },
  ): Promise<User[]> {
    return this.userService.getAllUsers(pagination);
  }

  @Post('create-user')
  async addNewUser(@Body() userData: User): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: User,
  ): Promise<User> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id:string): Promise<User>{
    return this.userService.deleteUser({id: parseInt(id)});
  }

}
