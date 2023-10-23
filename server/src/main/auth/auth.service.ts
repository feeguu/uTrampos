import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { UserRepository } from '@/domain/abstracts/repositories/user.repository';
import { Candidate } from '@/domain/entities/candidate.entity';
import { Company } from '@/domain/entities/company.entity';
import { User } from '@/domain/entities/user.entity';
import { AuthResponseDto } from '@/presentation/dtos/auth/auth-response.dto';
import { CandidateRegisterDto } from '@/presentation/dtos/auth/candidate-register.dto';
import { CompanyRegisterDto } from '@/presentation/dtos/auth/company-register.dto';
import { LoginDto } from '@/presentation/dtos/auth/login.dto';
import { RegisterDto } from '@/presentation/dtos/auth/register.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { CommonValidator } from '../validator/common.validator';
import { CompanyMapper } from '@/presentation/mappers/company.mapper';
import { CompanyDto } from '@/presentation/dtos/company.dto';
import { CandidateMapper } from '@/presentation/mappers/candidate.mapper';
import { UserType } from '@/domain/enums/user-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly candidateRepository: CandidateRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly jwtService: JwtService,
    private readonly commonValidator: CommonValidator,
  ) {}

  async registerUser(registerDto: RegisterDto) {
    const sameEmailUser = await this.userRepository.findByEmail(
      registerDto.email,
    );

    if (sameEmailUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await hash(registerDto.password, 10);

    const user = new User(
      registerDto.name,
      registerDto.email,
      hashedPassword,
      registerDto.phone,
      registerDto.zipCode,
      registerDto.type,
    );

    await this.userRepository.create(user);

    const payload = { email: user.email, sub: user.id };
    return new AuthResponseDto(this.jwtService.sign(payload));
  }

  async registerCompany(
    userId: string,
    companyRegisterDto: CompanyRegisterDto,
  ): Promise<CompanyDto> {
    const user = await this.userRepository.find(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.type !== UserType.COMPANY) {
      throw new BadRequestException('User must be a company');
    }

    const userHasCompany = await this.companyRepository.findByUserId(userId);
    if (userHasCompany) {
      throw new BadRequestException(
        'User already already registered as a company',
      );
    }

    const userHasCandidate =
      await this.candidateRepository.findByUserId(userId);
    if (userHasCandidate) {
      throw new BadRequestException(
        'User already already registered as a candidate',
      );
    }

    const sameCnpjCompany = await this.companyRepository.findByCnpj(
      companyRegisterDto.cnpj,
    );

    if (sameCnpjCompany) {
      throw new BadRequestException('CNPJ already in use');
    }

    const newCompany = new Company(
      user,
      companyRegisterDto.cnpj,
      companyRegisterDto.description,
      companyRegisterDto.companySize,
    );

    const company = await this.companyRepository.create(newCompany);
    return CompanyMapper.toDto(company);
  }

  async registerCandidate(
    userId: string,
    candidateRegisterDto: CandidateRegisterDto,
  ) {
    const user = await this.userRepository.find(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.type !== UserType.CANDIDATE) {
      throw new BadRequestException('User must be a candidate');
    }

    const userHasCompany = await this.companyRepository.findByUserId(userId);
    if (userHasCompany) {
      throw new BadRequestException(
        'User already already registered as a company',
      );
    }

    const userHasCandidate =
      await this.candidateRepository.findByUserId(userId);
    if (userHasCandidate) {
      throw new BadRequestException(
        'User already already registered as a candidate',
      );
    }

    const sameCpfCandidate = await this.candidateRepository.findByCpf(
      candidateRegisterDto.cpf,
    );
    if (sameCpfCandidate) {
      throw new BadRequestException('CPF already in use');
    }

    const newCandidate = new Candidate(
      user,
      candidateRegisterDto.cpf,
      candidateRegisterDto.birthDate,
    );

    const candidate = await this.candidateRepository.create(newCandidate);
    return CandidateMapper.toDto(candidate);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user || !(await compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return new AuthResponseDto(this.jwtService.sign(payload));
  }
}
