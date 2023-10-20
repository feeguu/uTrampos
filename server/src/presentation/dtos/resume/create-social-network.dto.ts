import { SocialNetwork } from '@/domain/enums/social-network.enum';
import { IsNotEmpty } from 'class-validator';

export class CreateSocialNetworkDto {
  @IsNotEmpty()
  socialNetwork: SocialNetwork;

  @IsNotEmpty()
  url: string;
}
