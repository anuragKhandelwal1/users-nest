import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmailorId(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getAllUsers(params: {
    skip: string; // pagintor
    take: string; //page size
    orderByField: string;
    orderByValue: 'asc' | 'desc';
  }): Promise<User[]> {
    const { skip, take, orderByField, orderByValue } = params;
    return this.prisma.user.findMany({
      skip: Number(skip),
      take: Number(take),
      orderBy: {[orderByField]: orderByValue},
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    if(await this.findUserByEmailorId({email:  data.email})){
      //  throw new Error("Email Already Exists"); 
      throw new HttpException({error:'Email Already Exists'}, HttpStatus.BAD_REQUEST);
    }
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
