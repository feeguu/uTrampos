import { SocialNetwork } from '@/domain/entities/resume/social-network.entity';
import { Repository } from '../generic.repository';

export abstract class SocialNetworkRepository extends Repository<SocialNetwork> {
  public abstract getByResumeId(resumeId: string): Promise<SocialNetwork[]>;
}
