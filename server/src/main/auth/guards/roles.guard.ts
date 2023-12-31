import { UserType } from '@/domain/enums/user-type.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserDto } from '@/presentation/dtos/user.dto';
import { TypeOrmCompanyRepository } from '@/infra/db/typeorm/repositories/typeorm-company.repository';
import { TypeOrmCandidateRepository } from '@/infra/db/typeorm/repositories/typeorm-candidate.repository';
import { NOT_ADMIN_KEY } from '../decorators/not-admin.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly companyRepository: TypeOrmCompanyRepository,
    private readonly candidateRepository: TypeOrmCandidateRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const isNotAdmin = this.reflector.getAllAndOverride<boolean>(
      NOT_ADMIN_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user }: { user: UserDto } = context.switchToHttp().getRequest();
    const userType = user.type;
    if (userType === UserType.ADMIN && !isNotAdmin) return true;
    if (userType === UserType.COMPANY) {
      const company = await this.companyRepository.findByUserId(user.id);
      return requiredRoles.includes(UserType.COMPANY) && !!company;
    }
    if (userType === UserType.CANDIDATE) {
      const candidate = await this.candidateRepository.findByUserId(user.id);
      return requiredRoles.includes(UserType.CANDIDATE) && !!candidate;
    }
  }
}
