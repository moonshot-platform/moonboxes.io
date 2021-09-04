import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WalletConnectService } from './wallet-connect.service';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

const baseURL: any = "http://66.29.144.2/api/";

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
  .set('APPKEY', 'moonbox');
  vendor: any;
  
  constructor(private httpClient: HttpClient, private walletConnectService: WalletConnectService,private toastrService:ToastrService) {
    this.data = this.walletConnectService.getData();
  }
  

  submitBet(data:any): Observable<any> {
    return this.httpClient.post(baseURL + 'userBid', data,{ headers:this.headers});
  }

  getMaxSupply():Observable<any>
  {
    return this.httpClient.get(baseURL+"typeCount",{ headers:this.headers});
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
  getAllCollections(nsfwStatus:boolean):Observable<any>
  {
    return this.httpClient.get(baseURL+"allArtistBanners?NSFW="+nsfwStatus,{ headers:this.headers});
  } 
  
  getUpcomingArtistCollections(nsfwStatus:boolean):Observable<any>
  {
    return this.httpClient.get(baseURL+"upcomingArtistBanners?NSFW="+nsfwStatus,{ headers:this.headers});
  } 
  
  getArtistMoonboxData(userAddress:any):Observable<any>
  {
    return this.httpClient.get(baseURL+"getArtistMoonboxData?userAddress="+userAddress,{ headers:this.headers});
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
