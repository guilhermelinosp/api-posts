/* eslint-disable @typescript-eslint/return-await */
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../shared/prisma/prisma.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UsersRepository {
	constructor(public readonly prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		return this.prisma.user.create({
			data: createUserDto,
			include: {
				posts: {
					select: {
						title: true,
						createdAt: true
					}
				}
			}
		})
	}

	async findAll() {
		return await this.prisma.user.findMany({
			include: {
				posts: {
					select: {
						title: true,
						createdAt: true
					}
				}
			}
		})
	}

	async findOne(id: number) {
		return this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				posts: {
					select: {
						title: true,
						createdAt: true
					}
				}
			}
		})
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		return this.prisma.user.update({
			where: {
				id
			},
			data: updateUserDto,
			include: {
				posts: {
					select: {
						title: true,
						createdAt: true
					}
				}
			}
		})
	}

	async remove(id: number) {
		return this.prisma.user.delete({
			where: {
				id
			}
		})
	}
}
