import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AppGuard implements CanActivate {
  constructor(private guards: CanActivate[]) {}
  async canActivate(context: ExecutionContext) {
    for (const guard of this.guards) {
      const canActivate = await guard.canActivate(context);
      if (!canActivate) return false;
    }
    return Promise.resolve(true);
  }
}
