import { Controller, Get, Request } from '@nestjs/common';
import { HealthCheckResponseDto } from '../dtos/health-check-response.dto';
import { Public } from '@/main/auth/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/')
export class AppController {
  /*
   * Health check endpoint
   */
  @Public()
  @Get('/health')
  healthCheck(): HealthCheckResponseDto {
    return new HealthCheckResponseDto();
  }
}
