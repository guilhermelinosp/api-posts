import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './modules/app.module'
import { ConflictInterceptor } from './shared/utils/interceptors/Conflict.interceptor'
import { DatabaseInterceptor } from './shared/utils/interceptors/Database.interceptor'
import { NotFoundInterceptor } from './shared/utils/interceptors/NotFound.interceptor'
import { UnauthorizedInterceptor } from './shared/utils/interceptors/Unauthorized.interceptor'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			validationError: {
				target: false
			}
		})
	)

	const config = new DocumentBuilder()
		.setTitle('API Posts Nest')
		.setDescription('This is a Simple API project')
		.setVersion('1.0.0')
		.setLicense('MIT', 'https://opensource.org/licenses/MIT')

		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	app.useGlobalInterceptors(new ConflictInterceptor())
	app.useGlobalInterceptors(new DatabaseInterceptor())
	app.useGlobalInterceptors(new UnauthorizedInterceptor())
	app.useGlobalInterceptors(new NotFoundInterceptor())

	await app.listen(process.env.PORT ?? 8080)
}

void bootstrap()
