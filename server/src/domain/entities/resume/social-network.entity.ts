import { SocialNetwork as SocialNetworkEnum } from '@/domain/enums/social-network.enum';
import { User } from '../user.entity';

export class SocialNetwork {
  public id: String;
  public user: User;
  public socialNetwork: SocialNetworkEnum;
  public url: string;
  constructor(socialNetworkData: {
    user: User;
    socialNetwork: SocialNetworkEnum;
    url: string;
  }) {
    this.id = crypto.randomUUID();
    this.user = socialNetworkData.user;
    this.socialNetwork = socialNetworkData.socialNetwork;
    this.url = socialNetworkData.url;
  }
}
