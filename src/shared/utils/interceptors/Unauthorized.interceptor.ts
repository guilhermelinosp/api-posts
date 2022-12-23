import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	UnauthorizedException
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { UnauthorizedError } from '../errors/Unauthorized.error'

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {
	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError((err) => {
				if (err instanceof UnauthorizedError) {
					throw new UnauthorizedException(err.message)
				} else {
					throw err
				}
			})
		)
	}
}
