import { UserType } from '@/domain/enums/user-type.enum';
import { Roles } from '@/main/auth/decorators/roles.decorator';
import { DashboardService } from '@/main/dashboard/dashboard.service';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Roles(UserType.ADMIN)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  async getDashboardData() {
    return await this.dashboardService.getDashboardData();
  }
}
