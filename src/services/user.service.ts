import { Injectable } from '@nestjs/common';
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
    skip: number; // pagintor
    take: number; //page size
    // cursor?: Prisma.UserWhereUniqueInput;
    // where?: Prisma.UserWhereInput;
    orderBy: Prisma.UserOrderByWithRelationInput ;
  }): Promise<User[]> {
    const { skip, take,  orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
    //   cursor,
    //   where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
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
