/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ConflictError } from './Conflict.error'
import { PrismaClientError } from './PrismaClient.error'

export class UniqueConstraintError extends ConflictError {
	constructor(prismaClientError: PrismaClientError) {
		const uniqueField = prismaClientError.meta?.target

		super(`The ${uniqueField!} is already in use.`)
	}
}
