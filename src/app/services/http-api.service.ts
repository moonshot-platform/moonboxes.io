import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WalletConnectService } from './wallet-connect.service';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

const baseURL: any = "http://codetentacles-006-site3.htempurl.com/api/";

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
  
  constructor(private httpClient: HttpClient, private walletConnectService: WalletConnectService,private toastrService:ToastrService) {
    this.data = this.walletConnectService.getData();
  }
  

  submitBet(data:any): Observable<any> {
    return this.httpClient.post(baseURL + 'userBid', data,{ headers:this.headers});
  }

  getMaxSupply(userAddress:any):Observable<any>
  {
    return this.httpClient.get(baseURL+"typeCount?userWalletAddress="+userAddress+"&ArtistwalletAddress="+environment.ownerAddress,{ headers:this.headers});
  }

  getUserBetData(data:any):Observable<any>
  {
    return this.httpClient.get(baseURL+"userBetData?userAddress="+data,{ headers:this.headers});
  }

  getUserInventory(data:any):Observable<any>
  {
    return this.httpClient.get(baseURL+"userData?userAddress="+data.userAddress+"&NSFW="+data.nsfwstatus,{ headers:this.headers});
  }

  getuserUpcomingNft(data:any):Observable<any>
  {
    return this.httpClient.get(baseURL+"userUpcomingNft?userAddress="+data.userAddress+"&nsfw="+data.nsfwstatus,{ headers:this.headers});
  }

  verifyBetHash(data:any) : Observable<any>
  {
    return this.httpClient.post(baseURL + 'verifyBetHash', data,{ headers:this.headers});
  }

  changeStatusClaim(data:any) : Observable<any>
  {
    return this.httpClient.post(baseURL + 'userClaim', data,{ headers:this.headers});
  }
  
  getMoonCount(userAddress:any):Observable<any>
  {
    return this.httpClient.get(baseURL+"landingPageData?userAddress="+userAddress,{ headers:this.headers});
  } 

  /***** Artist pages apis *****/
  getAllCollections(nsfwStatus:boolean, LootboxAddress: string):Observable<any>
  {
    return this.httpClient.get(baseURL+"allArtistBanners?NSFW="+nsfwStatus+"&walletAddress="+LootboxAddress,{ headers:this.headers});
  } 
  
  
  getUpcomingArtistCollections(nsfwStatus:boolean,address:string):Observable<any>
  {
    return this.httpClient.get(baseURL+"upcomingArtistBanners?NSFW="+nsfwStatus+"&walletAddress="+address,{ headers:this.headers});
  } 
  
  getArtistMoonboxData(artistWalletAddress:any,userAddress:any):Observable<any>
  {
    return this.httpClient.get(baseURL+"getArtistMoonboxData?artistWalletAddress="+artistWalletAddress+"&userAddress="+userAddress,{ headers:this.headers});
  } 

  submitBetForArtistApi(data:any): Observable<any> {
    return this.httpClient.post(baseURL + 'BidForArtist', data,{ headers:this.headers});
  }

  claimRewardDetails(data:any): Observable<any> {
    return this.httpClient.post(baseURL + 'getReward', data,{ headers:this.headers});
  }

  claimRewardTransactionHashUpdate(data:any): Observable<any> {
    return this.httpClient.post(baseURL + 'transactionHashForReward', data,{ headers:this.headers});
  }



  
  revealData(data:any): Observable<any> {
    return this.httpClient.post(baseURL + 'revealData', data,{ headers:this.headers});
  }



  showToastr(message:string,isSuccess:boolean)
  {
    if(isSuccess)
    this.toastrService.success(message);
    else
    this.toastrService.error(message);
  }

  setNSFWStatus(status)
  {

    localStorage.setItem("nsfw",status);
  }

  getNSFWStatus()
  {
    return localStorage.getItem("nsfw")=="true";
  }

  sendMessage(message: boolean) {
    this.subject.next({ text: message });
}

clearMessages() {
    this.subject.next();
}

getMessage(): Observable<any> {
    return this.subject.asObservable();
}

}
