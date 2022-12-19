import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UsersRepository } from './repositories/users.repository'
import { PrismaService } from '../../shared/prisma/prisma.service'

@Module({
	controllers: [UsersController],
	providers: [UsersService, PrismaService, UsersRepository]
})
export class UsersModule {}
