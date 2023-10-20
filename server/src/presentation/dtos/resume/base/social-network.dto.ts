import { SocialNetwork } from '@/domain/enums/social-network.enum';

export class SocialNetworkDto {
  public id: string;
  public socialNetwork: SocialNetwork;
  public url: string;
  constructor(socialNetworkData: SocialNetworkDto) {
    this.id = socialNetworkData.id;
    this.socialNetwork = socialNetworkData.socialNetwork;
    this.url = socialNetworkData.url;
  }
}
