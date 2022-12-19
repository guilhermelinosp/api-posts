import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	NotFoundException
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { NotFoundError } from '../errors/NotFound.error'

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError(err => {
				if (err instanceof NotFoundError) {
					throw new NotFoundException(err.message)
				} else {
					throw err
				}
			})
		)
	}
}
