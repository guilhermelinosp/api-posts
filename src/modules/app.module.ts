import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PostsModule } from './Posts/posts.module'
import { UsersModule } from './Users/users.module'

@Module({
	imports: [ConfigModule.forRoot(), UsersModule, PostsModule]
})
export class AppModule {}
