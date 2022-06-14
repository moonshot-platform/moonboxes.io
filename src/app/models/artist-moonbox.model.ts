import 'reflect-metadata';
import { Type } from 'class-transformer';

export class ArtistMoonbox {
  status: number;
  isSuccess: boolean;

  @Type(() => Supply)
  data: Supply[];

  walletAddress: string;
  ArtistName: string;
  name: string;
  description: string;
  filePath: string;
  ArtistNFTAddress: string;

}

export class Supply {
  type: string;
  price: number;
  signature: string;
  NSFW: boolean;
  id: number;
  limitPerTxn: number;
  isUpcoming: boolean;
  currentSupply: number;
  tokenAddress: string;
  tokenName: string;
  ArtistNFTAddress: string;
  isminted: boolean;


  public hasSupply() {
    return this.currentSupply >= 1;
  }

  public canBuyWithinSupplyAmount(interestAmount: number) {
    return (this.currentSupply === 0) ? false : interestAmount >= 1 && interestAmount <= this.currentSupply;
  }
}
