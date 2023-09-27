import { Controller, Get } from '@nestjs/common';
import { HealthCheckResponseDto } from '../dtos/health-check-response.dto';

@Controller('/')
export class AppController {
  /*
   * Health check endpoint
   */
  @Get('/health')
  healthCheck(): HealthCheckResponseDto {
    return new HealthCheckResponseDto();
  }
}
