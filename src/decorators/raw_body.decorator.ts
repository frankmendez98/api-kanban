// src/decorators/raw-body.decorator.ts
import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import getRawBody from 'raw-body';

/**
 * @RawBody
 * Decorador de parámetro personalizado para obtener el cuerpo raw (Buffer) de la solicitud.
 *
 * Este decorador es útil cuando necesitas procesar el cuerpo de la solicitud tal como viene
 * (ej. application/octet-stream, text/plain) y evitar la interferencia de otros parsers
 * de NestJS o Express (como JSON o URL-encoded) que consumirían el stream.
 *
 * Nota: El stream de la solicitud solo puede ser leído una vez. Si otro middleware
 * o parser ya ha consumido el body, este decorador podría no funcionar o retornar undefined.
 * Es ideal para rutas específicas que esperan un cuerpo no estructurado.
 */
export const RawBody = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    // Verificamos si el stream de la solicitud es legible.
    if (req.readable) {
      try {
        // Usamos getRawBody para leer el stream de la solicitud.
        // Omitimos 'encoding' para que devuelva un Buffer por defecto.
        const rawBodyBuffer = await getRawBody(req, {
          length: req.headers['content-length'], // Opcional pero recomendado para eficiencia
          limit: '50mb', // Asegúrate de que este límite sea apropiado para tus necesidades
        });
        return rawBodyBuffer;
      } catch (error) {
        // En caso de error (ej. límite excedido, stream ya leído, etc.)
        console.error(
          'Error al leer el cuerpo raw con @RawBody:',
          error.message,
        );
        throw new BadRequestException(
          'No se pudo leer el cuerpo de la solicitud como datos raw.',
        );
      }
    }

    // Si el stream no es legible (ej. ya fue consumido por otro middleware),
    // y si req.body contiene algo, lo devolvemos como fallback.
    return req.body || undefined;
  },
);
