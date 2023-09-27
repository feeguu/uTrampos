import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/presentation/controllers/app.controller';
import { HealthCheckResponseDto } from '@/presentation/dtos/health-check-response.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('healthCheck', () => {
    it('should return a HealthCheckResponseDto', () => {
      const result: HealthCheckResponseDto = appController.healthCheck();
      expect(result).toBeInstanceOf(HealthCheckResponseDto);
    });
  });
});
