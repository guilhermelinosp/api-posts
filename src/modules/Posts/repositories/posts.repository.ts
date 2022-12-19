import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../../shared/prisma/prisma.service'
import { NotFoundError } from '../../../shared/utils/errors/NotFound.error'
import { CreatePostDto } from '../dto/create-post.dto'
import { UpdatePostDto } from '../dto/update-post.dto'

@Injectable()
export class PostsRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(createPostDto: CreatePostDto) {
		const { authorEmail } = createPostDto

		const user = await this.prisma.user.findUnique({
			where: {
				email: authorEmail
			}
		})

		if (user == null) {
			throw new NotFoundError('Author not found.')
		}

		return await this.prisma.post.create({
			data: createPostDto
		})
	}

	async findAll() {
		return await this.prisma.post.findMany({
			include: {
				author: {
					select: {
						name: true
					}
				}
			}
		})
	}

	async findOne(id: number) {
		return await this.prisma.post.findUnique({
			where: {
				id
			},
			include: {
				author: {
					select: {
						name: true,
						email: true
					}
				}
			}
		})
	}

	async update(id: number, updatePostDto: UpdatePostDto) {
		const { authorEmail } = updatePostDto

		if (authorEmail == null) {
			return await this.prisma.post.update({
				data: updatePostDto,
				where: { id }
			})
		}

		delete updatePostDto.authorEmail

		const user = await this.prisma.user.findUnique({
			where: {
				email: authorEmail
			}
		})

		if (user == null) {
			throw new NotFoundError('Author not found.')
		}

		const data: Prisma.PostUpdateInput = {
			...updatePostDto,
			author: {
				connect: {
					email: authorEmail
				}
			}
		}

		return await this.prisma.post.update({
			where: { id },
			data,
			include: {
				author: {
					select: {
						name: true
					}
				}
			}
		})
	}

	async remove(id: number) {
		return await this.prisma.post.delete({
			where: { id }
		})
	}
}
