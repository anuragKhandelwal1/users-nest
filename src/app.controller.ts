import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { User} from '@prisma/client';
import { UserDto } from './dto/user.dto';
@Controller('/user')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getAllUsers(
    @Query()
    pagination: {
      skip: string;
      take: string;
      orderByField: string;
      orderByValue: 'asc' | 'desc';
    },
  ): Promise<User[]> {
    try {
      return this.userService.getAllUsers(pagination);
    } catch (error) {
      throw error;
    }
  }

  @Post('create')
  async addNewUser(@Body() userData: UserDto): Promise<User> {
   try {
    return this.userService.createUser(userData);
   } catch (error) {
    throw error;
   }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UserDto,
  ): Promise<User> {
    try {
      return this.userService.updateUser({
        where: { id: Number(id) },
        data: userData,
      });
    } catch (error) {
      throw error;
    }
   
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    try {
      return this.userService.deleteUser({ id: parseInt(id) });
    } catch (error) {
      throw error;
    }
  }

}
