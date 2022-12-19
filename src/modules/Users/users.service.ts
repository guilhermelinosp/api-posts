import { Injectable } from '@nestjs/common'
import { NotFoundError } from '../../shared/utils/errors/NotFound.error'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Users } from './entities/user.entity'
import { UsersRepository } from './repositories/users.repository'

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async create(createUserDto: CreateUserDto) {
		return await this.usersRepository.create(createUserDto)
	}

	async findAll() {
		return await this.usersRepository.findAll()
	}

	async findOne(id: number): Promise<Users> {
		const user = await this.usersRepository.findOne(id)

		if (user == null) {
			throw new NotFoundError('User not found')
		}

		return user
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.usersRepository.findOne(id)

		if (user == null) {
			throw new NotFoundError('User not found')
		}

		return await this.usersRepository.update(id, updateUserDto)
	}

	async remove(id: number) {
		const user = await this.usersRepository.findOne(id)

		if (user == null) {
			throw new NotFoundError('User not found')
		}

		return await this.usersRepository.remove(id)
	}
}
