import { PrismaClientError } from '../errors/PrismaClient.error'

export const isPrismaErrors = (prismaClientError: PrismaClientError) => {
	return (
		typeof prismaClientError.code === 'string' &&
		typeof prismaClientError.clientVersion === 'string' &&
		(typeof prismaClientError.meta === 'undefined' || typeof prismaClientError.meta === 'object')
	)
}
