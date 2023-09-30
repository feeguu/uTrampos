import { CandidateRegisterDto } from '@/presentation/dtos/auth/candidate-register.dto';
import { AuthService } from '../auth.service';

export class RegisterCandidateUseCase {
  constructor(private readonly authService: AuthService) {}
  async execute(userId: string, CandidateRegisterDto: CandidateRegisterDto) {
    return this.authService.registerCandidate(userId, CandidateRegisterDto);
  }
}
