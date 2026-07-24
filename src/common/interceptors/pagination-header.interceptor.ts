import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class PaginationHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = ctx.getResponse();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((result) => {
        // Se espera que el servicio devuelva { data, total }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (result && result.data && typeof result.total === 'number') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const page = Number(request.query.page) || 1;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const limit = Number(request.query.limit) || 10;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          response.set({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            'X-Total-Count': result.total,
            'X-Page': page,
            'X-Page-Size': limit,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            'X-Total-Pages': Math.ceil(result.total / limit),
          });

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
          return result.data; // solo retorna la data al cliente
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result; // si no es paginado, pasa normal
      }),
    );
  }
}
