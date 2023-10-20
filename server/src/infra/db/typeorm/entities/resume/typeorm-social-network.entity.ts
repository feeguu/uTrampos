import { Resume } from '@/domain/entities/resume/resume.entity';
import { SocialNetwork as SocialNetworkEnum } from '@/domain/enums/social-network.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOrmResume } from './typeorm-resume.entity';

@Entity('social_network')
export class TypeOrmSocialNetwork {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TypeOrmResume, (resume) => resume.socialNetworks)
  resume: TypeOrmResume;

  @Column({
    type: 'enum',
    enum: SocialNetworkEnum,
  })
  socialNetwork: SocialNetworkEnum;

  @Column()
  url: string;
}
