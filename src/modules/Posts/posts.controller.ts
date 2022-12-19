import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Post()
	async create(@Body() createPostDto: CreatePostDto) {
		return await this.postsService.create(createPostDto)
	}

	@Get()
	async findAll() {
		return await this.postsService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.postsService.findOne(+id)
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return await this.postsService.update(+id, updatePostDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.postsService.remove(+id)
	}
}
