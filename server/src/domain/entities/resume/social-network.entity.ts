import { SocialNetwork as SocialNetworkEnum } from '@/domain/enums/social-network.enum';
import { Resume } from './resume.entity';

export class SocialNetwork {
  public id: string;
  public resume: Resume;
  public socialNetwork: SocialNetworkEnum;
  public url: string;
  constructor(socialNetworkData: {
    resume: Resume;
    socialNetwork: SocialNetworkEnum;
    url: string;
  }) {
    this.id = crypto.randomUUID();
    this.resume = socialNetworkData.resume;
    this.socialNetwork = socialNetworkData.socialNetwork;
    this.url = socialNetworkData.url;
  }
}
