import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { UserRepository } from '@/domain/abstracts/repositories/user.repository';
import { Company } from '@/domain/entities/company.entity';
import { User } from '@/domain/entities/user.entity';
import { CompanySize } from '@/domain/enums/company-size.enum';
import { UserType } from '@/domain/enums/user-type.enum';
import { InMemoryDatabaseModule } from '@/infra/db/inmemory/inmemory-database.module';
import { InMemoryCandidateRepository } from '@/infra/db/inmemory/repositories/inmemory-candidate.repository';
import { InMemoryCompanyRepository } from '@/infra/db/inmemory/repositories/inmemory-company.repository';
import { InMemoryUserRepository } from '@/infra/db/inmemory/repositories/inmemory-user.repository';
import { AuthService } from '@/main/auth/auth.service';
import { CommonValidator } from '@/main/validator/common.validator';
import { AuthResponseDto } from '@/presentation/dtos/auth/auth-response.dto';
import { RegisterDto } from '@/presentation/dtos/auth/register.dto';
import { BadRequestException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({ secret: 'secret' }),
        InMemoryDatabaseModule,
      ],
      providers: [
        CommonValidator,
        {
          provide: AuthService,
          useFactory: (
            userRepository: UserRepository,
            candidateRepository: CandidateRepository,
            companyRepository: CompanyRepository,
            jwtService: JwtService,
            commonValidator: CommonValidator,
          ) =>
            new AuthService(
              userRepository,
              candidateRepository,
              companyRepository,
              jwtService,
              commonValidator,
            ),
          inject: [
            InMemoryUserRepository,
            InMemoryCandidateRepository,
            InMemoryCompanyRepository,
            JwtService,
            CommonValidator,
          ],
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('Register User', () => {
    it('should register a user', async () => {
      const registerDto: RegisterDto = {
        email: 'johndoe@email.com',
        name: 'John Doe',
        password: '123456',
        phone: '123456789',
        zipCode: '12345678',
        type: UserType.CANDIDATE,
      };
      const authResponse = await authService.registerUser(registerDto);
      expect(authResponse).toBeDefined();
      expect(authResponse).toBeInstanceOf(AuthResponseDto);
      expect(authResponse.token).toBeDefined();
      expect(jwtService.verify(authResponse.token)).toBeDefined();
      expect(await jwtService.verify(authResponse.token).email).toBe(
        registerDto.email,
      );
    });
    it('should not register a user with an existing email', async () => {
      const registerDto: RegisterDto = {
        email: 'johndoe@email.com',
        name: 'John Doe',
        password: '123456',
        phone: '123456789',
        type: UserType.CANDIDATE,
        zipCode: '12345678',
      };
      await expect(
        authService.registerUser(registerDto),
      ).resolves.toBeDefined();

      await expect(authService.registerUser(registerDto)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('Register Company', () => {
    const registerDto: RegisterDto = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '123456',
      phone: '123456789',
      type: UserType.COMPANY,
      zipCode: '12345678',
    };
    it('should register a company', async () => {
      const user = await authService.registerUser(registerDto);
      const userId = await jwtService.verify(user.token).sub;
      const company = await authService.registerCompany(userId, {
        cnpj: '12.090.779/0001-62',
        description: 'Company description',
        companySize: CompanySize.MEDIUM,
      });
      expect(company).toBeDefined();
      expect(company).toBeInstanceOf(Company);
      expect(company.id).toBeDefined();
      expect(company.cnpj).toBe('12.090.779/0001-62');
      expect(company.description).toBe('Company description');
      expect(company.companySize).toBe(CompanySize.MEDIUM);
    });

    it('should not register a company with an invalid cnpj', async () => {
      const user = await authService.registerUser(registerDto);
      const userId = await jwtService.verify(user.token).sub;
      await expect(
        authService.registerCompany(userId, {
          cnpj: '11.111.111/0001-1',
          description: 'Company description',
          companySize: CompanySize.MEDIUM,
        }),
      ).rejects.toThrowError();
    });

    it('should not register a company with an existing cnpj', async () => {
      const user = await authService.registerUser(registerDto);
      const user2 = await authService.registerUser({
        ...registerDto,
        email: 'johndoe2@email.com',
      });
      const userId = await jwtService.verify(user.token).sub;
      const user2Id = await jwtService.verify(user2.token).sub;
      await expect(
        authService.registerCompany(userId, {
          cnpj: '12.090.779/0001-62',
          description: 'Company description',
          companySize: CompanySize.MEDIUM,
        }),
      ).resolves.toBeDefined();
      await expect(
        authService.registerCompany(user2Id, {
          cnpj: '12.090.779/0001-62',
          description: 'Company description',
          companySize: CompanySize.MEDIUM,
        }),
      ).rejects.toThrowError();
    });
    it('should not user register a company if already registered one', async () => {
      const user = await authService.registerUser(registerDto);
      const userId = await jwtService.verify(user.token).sub;
      await expect(
        authService.registerCompany(userId, {
          cnpj: '12.090.779/0001-62',
          description: 'Company description',
          companySize: CompanySize.MEDIUM,
        }),
      ).resolves.toBeDefined();
      await expect(
        authService.registerCompany(userId, {
          cnpj: '16.587.913/0001-96',
          description: 'Company description',
          companySize: CompanySize.MEDIUM,
        }),
      ).rejects.toThrowError(BadRequestException);
    });

    it('should not register a company with user type candidate', async () => {
      const user = await authService.registerUser({
        ...registerDto,
        type: UserType.CANDIDATE,
      });
      const userId = await jwtService.verify(user.token).sub;
      await expect(
        authService.registerCompany(userId, {
          cnpj: '12.090.779/0001-62',
          description: 'Company description',
          companySize: CompanySize.MEDIUM,
        }),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('Register Candidate', () => {
    const registerDto: RegisterDto = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '123456',
      phone: '123456789',
      type: UserType.CANDIDATE,
      zipCode: '12345678',
    };

    it('should register a candidate', async () => {
      const user = await authService.registerUser(registerDto);
      const userId = await jwtService.verify(user.token).sub;
      const candidate = await authService.registerCandidate(userId, {
        cpf: '169.042.850-36',
        birthDate: new Date().toISOString(),
      });
      expect(candidate).toBeDefined();
      expect(candidate.id).toBeDefined();
      expect(candidate.cpf).toBe('169.042.850-36');
      expect(candidate.birthDate).toBeDefined();
    });

    it('should not register a candidate with an invalid cpf', async () => {
      const user = await authService.registerUser(registerDto);
      const userId = await jwtService.verify(user.token).sub;
      await expect(
        authService.registerCandidate(userId, {
          cpf: '169.042.850-35',
          birthDate: new Date().toISOString(),
        }),
      ).rejects.toThrowError();
    });

    it('should not register a candidate with an existing cpf', async () => {
      const user = await authService.registerUser({ ...registerDto });
      const userId = await jwtService.verify(user.token).sub;
      const user2 = await authService.registerUser({
        ...registerDto,
        email: 'johndoe2@email.com',
      });
      const user2Id = await jwtService.verify(user2.token).sub;
      await expect(
        authService.registerCandidate(userId, {
          cpf: '169.042.850-36',
          birthDate: new Date().toISOString(),
        }),
      ).resolves.toBeDefined();
      await expect(
        authService.registerCandidate(user2Id, {
          cpf: '169.042.850-36',
          birthDate: new Date().toISOString(),
        }),
      ).rejects.toThrowError();
    });

    it('should not user register a candidate if already registered one', async () => {
      const user = await authService.registerUser(registerDto);
      const userId = await jwtService.verify(user.token).sub;
      await expect(
        authService.registerCandidate(userId, {
          cpf: '169.042.850-36',
          birthDate: new Date().toISOString(),
        }),
      ).resolves.toBeDefined();
      await expect(
        authService.registerCandidate(userId, {
          cpf: '169.042.850-36',
          birthDate: new Date().toISOString(),
        }),
      ).rejects.toThrowError(BadRequestException);
    });

    it('should not register a candidate with user type company', async () => {
      const user = await authService.registerUser({
        ...registerDto,
        type: UserType.COMPANY,
      });
      const userId = await jwtService.verify(user.token).sub;
      await expect(
        authService.registerCandidate(userId, {
          cpf: '169.042.850-36',
          birthDate: new Date().toISOString(),
        }),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('Login', () => {
    const registerDto: RegisterDto = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '123456',
      phone: '123456789',
      type: UserType.CANDIDATE,
      zipCode: '12345678',
    };

    it('should login a user', async () => {
      await authService.registerUser(registerDto);
      const authResponse = await authService.login({
        email: registerDto.email,
        password: registerDto.password,
      });
      expect(authResponse).toBeDefined();
      expect(authResponse).toBeInstanceOf(AuthResponseDto);
      expect(authResponse.token).toBeDefined();
      expect(jwtService.verify(authResponse.token)).toBeDefined();
      expect(await jwtService.verify(authResponse.token).email).toBe(
        registerDto.email,
      );
    });

    it('should not login a user with an invalid email', async () => {
      await expect(
        authService.login({
          email: 'invalidemail',
          password: registerDto.password,
        }),
      ).rejects.toThrowError();
    });

    it('should not login a user with an invalid password', async () => {
      await expect(
        authService.login({
          email: registerDto.email,
          password: 'invalidpassword',
        }),
      ).rejects.toThrowError();
    });
  });
});
