import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@src/domain/entities/user.entity';

export interface AuthRequest extends Request {
  user: User;
}

export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
