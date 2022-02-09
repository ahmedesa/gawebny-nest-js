import { JWTAuthGuard } from './jwt-auth.guard';

import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';

const RoleGuard = (role: number): Type<CanActivate> => {
  class RoleGuardMixin extends JWTAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();

      const user = request.user;

      return user?.type == role;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
