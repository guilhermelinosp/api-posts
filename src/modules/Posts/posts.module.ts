import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { PostsRepository } from './repositories/posts.repository'
import { PrismaService } from '../../shared/prisma/prisma.service'

@Module({
	controllers: [PostsController],
	providers: [PostsService, PrismaService, PostsRepository]
})
export class PostsModule {}
