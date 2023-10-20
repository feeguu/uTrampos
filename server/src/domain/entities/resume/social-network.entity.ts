import { SocialNetwork as SocialNetworkEnum } from '@/domain/enums/social-network.enum';
import { Resume } from './resume.entity';
import { randomUUID } from 'crypto';

export class SocialNetwork {
  public id: string;
  public socialNetwork: SocialNetworkEnum;
  public url: string;
  constructor(socialNetworkData: {
    socialNetwork: SocialNetworkEnum;
    url: string;
  }) {
    this.id = randomUUID();
    this.socialNetwork = socialNetworkData.socialNetwork;
    this.url = socialNetworkData.url;
  }
}
