import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Type, mixin } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function FilesUtf8Interceptor(fieldName: string, maxCount?: number): Type<NestInterceptor> {
  // Heredamos directamente de la clase dinámica que genera FilesInterceptor
  @Injectable()
  class MixinInterceptor extends FilesInterceptor(fieldName, maxCount) {
    
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      // 1. Dejamos que el interceptor nativo de Multer resuelva los archivos primero de forma limpia
      const interceptor = await super.intercept(context, next);
      
      // 2. Extraemos la petición HTTP donde Multer ya montó el arreglo original
      const req = context.switchToHttp().getRequest();
      
      if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file: any) => {
          if (file.originalname) {
            // Forzamos la reconversión de los metadatos corruptos de latin1 a UTF-8
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
          }
        });
      }

      // 3. Retornamos el flujo con el pipe original modificado
      return interceptor;
    }
  }

  return mixin(MixinInterceptor);
}