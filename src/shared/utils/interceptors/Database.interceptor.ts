import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	BadRequestException
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { DatabaseError } from '../errors/Database.error'
import { isDatabaseErrors } from '../types/isDatabaseErrors'
import { isPrismaErrors } from '../types/isPrimaErrors'

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError((err) => {
				if (isPrismaErrors(err)) {
					err = isDatabaseErrors(err)
				}

				if (err instanceof DatabaseError) {
					throw new BadRequestException(err.message)
				} else {
					throw err
				}
			})
		)
	}
}
