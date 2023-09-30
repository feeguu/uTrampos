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
import { UserMapper } from '@/presentation/mappers/user.mapper';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly candidateRepository: CandidateRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterDto) {
    const sameEmailUser = await this.userRepository.findByEmail(
      registerDto.email,
    );
    if (sameEmailUser) {
      throw new Error('Email already in use');
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

    const newUser = await this.userRepository.create(user);
    return UserMapper.toDto(newUser);
  }

  async registerCompany(
    userId: string,
    companyRegisterDto: CompanyRegisterDto,
  ) {
    const user = await this.userRepository.find(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const newCompany = new Company(
      user,
      companyRegisterDto.cnpj,
      companyRegisterDto.description,
      companyRegisterDto.companySize,
    );

    const company = await this.companyRepository.create(newCompany);
    return company;
  }

  async registerCandidate(
    userId: string,
    candidateRegisterDto: CandidateRegisterDto,
  ) {
    const user = await this.userRepository.find(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const newCandidate = new Candidate(
      user,
      candidateRegisterDto.cpf,
      candidateRegisterDto.birthDate,
    );

    const candidate = await this.candidateRepository.create(newCandidate);
    return candidate;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return UserMapper.toDto(user);
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
