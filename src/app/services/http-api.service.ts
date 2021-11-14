import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WalletConnectService } from './wallet-connect.service';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

const baseURL: any = environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {
  
  userInfo: any;
  data:any;

  private subject = new Subject();

  public lootBoxDetails: any = [
    {
      img: 'assets/media/images/moonbox/wood.png',
      name: "Wood",
      value: "0.5B"
    },
    {
      img: 'assets/media/images/moonbox/silver.png',
      name: "Silver",
      value: "1B"
    },
    {
      img: 'assets/media/images/moonbox/gold.png',
      name: "Gold",
      value: "2B"
    },
    {
      img: 'assets/media/images/moonbox/diamond.png',
      name: "Diamond",
      value: "10B"
    }
  ];

  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('APPKEY', 'mTb+T!5!crBEQEL2!$PJ9&JSjeT3M6Hs*RytA-eaDSBS5UU@8-fCJHu6F?kp@s+JTu2-_-V8L#?5');
  vendor: any;
  
  constructor(
    private httpClient: HttpClient,
    private walletConnectService: WalletConnectService,
    private toastrService:ToastrService
  ) { this.data = this.walletConnectService.getData(); }

  submitBet( data: any ): Observable<any> {
    const url = `${baseURL}userBid`;

    return this.httpClient.post( url, data, { headers: this.headers } );
  }

  getMaxSupply( userWalletAddress: string ): Observable<any> {
    const params = { userWalletAddress, ArtistwalletAddress: environment.ownerAddress };
    const url = `${baseURL}typeCount`;

    return this.httpClient.get( url, { headers: this.headers, params} );
  }

  getUserBetData( data: any ): Observable<any> {
    const params = { userAddress: data };
    const url = `${baseURL}userBetData`;

    return this.httpClient.get( url, { headers: this.headers, params } );
  }

  getUserInventory( data: any ): Observable<any> {
    const params = { userAddress: data.userAddress, NSFW: data.nsfwstatus };
    const url = `${baseURL}userData`;

    return this.httpClient.get( url, { headers: this.headers, params } );
  }

  getuserUpcomingNft( data: any ): Observable<any> {
    const params = { userAddress: data.userAddress, nsfw: data.nsfwstatus };
    const url = `${baseURL}userUpcomingNft`;

    return this.httpClient.get( url, { headers: this.headers, params } );
  }

  verifyBetHash( data: any ): Observable<any> {
    const url = `${baseURL}verifyBetHash`;

    return this.httpClient.post( url, data, { headers: this.headers } );
  }

  changeStatusClaim( data: any ): Observable<any> {
    const url = `${baseURL}userClaim`;

    return this.httpClient.post( url, data, { headers: this.headers } );
  }
  
  getMoonCount( userAddress: string ): Observable<any> {
    const params = { userAddress };
    const url = `${baseURL}allArtistBanners`;

    return this.httpClient.get( url,{ headers: this.headers,params } );
  } 

  /***** Artist pages apis *****/
  getAllCollections( NSFW: boolean, walletAddress: string ): Observable<any> {
    const params = { NSFW, walletAddress };
    const url = `${baseURL}allArtistBanners`;

    return this.httpClient.get( url, { headers: this.headers, params } );
  } 
  
  
  getUpcomingArtistCollections( NSFW: boolean, walletAddress: string ): Observable<any> {
    const params = { NSFW, walletAddress };
    const url = `${baseURL}upcomingArtistBanners`;

    return this.httpClient.get( url, { headers: this.headers, params } );
  } 
  
  getArtistMoonboxData( artistWalletAddress: string, userAddress: string ): Observable<any> {
    const params = { artistWalletAddress, userAddress };
    const url = `${baseURL}getArtistMoonboxData`;

    return this.httpClient.get( url, { headers: this.headers, params } );
  } 

  submitBetForArtistApi( data: any ): Observable<any> {
    const url = `${baseURL}BidForArtist`;
    return this.httpClient.post( url, data, { headers: this.headers } );
  }

  claimRewardDetails( data: any ): Observable<any> {
    const url = `${baseURL}getReward`;
    return this.httpClient.post( url, data, { headers: this.headers } );
  }

  claimRewardTransactionHashUpdate( data: any ): Observable<any> {
    const url = `${baseURL}transactionHashForReward`;
    return this.httpClient.post( url, data, { headers: this.headers } );
  }

  transferNft( data: any ): Observable<any> {
    const url = `${baseURL}transferNft`;
    return this.httpClient.post( url, data, { headers: this.headers } );
  }

  
  revealData( data: any ): Observable<any> {
    const url = `${baseURL}revealData`;
    return this.httpClient.post( url, data, { headers: this.headers } );
  }

  showToastr( message: string, isSuccess: boolean ): void {
    if( isSuccess )
      this.toastrService.success(message);
    else
      this.toastrService.error(message);
  }

  sendMessage( message: boolean ): void {
    this.subject.next({ text: message });
  }

  clearMessages(): void {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
