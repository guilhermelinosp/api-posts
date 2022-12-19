import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsOptional()
	content?: string

	@IsEmail()
	authorEmail: string
}
