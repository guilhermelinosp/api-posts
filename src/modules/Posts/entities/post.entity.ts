import { Post } from '@prisma/client'

export class Posts implements Post {
	authorEmail: string
	id: number
	published: boolean
	title: string
	content: string
	createdAt: Date
	updatedAt: Date
}
