import { Injectable } from '@nestjs/common'
import { NotFoundError } from '../../shared/utils/errors/NotFound.error'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostsRepository } from './repositories/posts.repository'

@Injectable()
export class PostsService {
	constructor(private readonly postsRepository: PostsRepository) {}

	async create(createPostDto: CreatePostDto) {
		return await this.postsRepository.create(createPostDto)
	}

	async findAll() {
		return await this.postsRepository.findAll()
	}

	async findOne(id: number) {
		const post = await this.postsRepository.findOne(id)

		if (post == null) {
			throw new NotFoundError('Post not found')
		}

		return post
	}

	async update(id: number, updatePostDto: UpdatePostDto) {
		const post = await this.postsRepository.findOne(id)

		if (post == null) {
			throw new NotFoundError('Post not found')
		}

		return await this.postsRepository.update(id, updatePostDto)
	}

	async remove(id: number) {
		const post = await this.postsRepository.findOne(id)

		if (post == null) {
			throw new NotFoundError('Post not found')
		}

		return await this.postsRepository.remove(id)
	}
}
