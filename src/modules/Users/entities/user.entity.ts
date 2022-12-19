import { User } from '@prisma/client'

export class Users implements User {
	id: number
	email: string
	name: string
	admin: boolean
	createdAt: Date
	updatedAt: Date
}
