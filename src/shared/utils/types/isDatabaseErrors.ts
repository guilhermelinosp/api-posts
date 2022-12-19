import { DatabaseError } from '../errors/Database.error'
import { PrismaClientError } from '../errors/PrismaClient.error'
import { UniqueConstraintError } from '../errors/UniqueConstraint.error'

enum PrismaError {
	UniqueConstraintViolation = 'P2002',
	RecordDoesNotExist = 'P2025'
}

export const isDatabaseErrors = (prismaClientError: PrismaClientError): Error => {
	switch (prismaClientError.code) {
		case PrismaError.UniqueConstraintViolation:
			return new UniqueConstraintError(prismaClientError)
		default:
			return new DatabaseError(prismaClientError.message)
	}
}
