import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UsuarioActual = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    console.log('usuario', user);
    
    if (!user) {
      return null;
    }

    return user.userId || user.sub || user.id;
  },
);