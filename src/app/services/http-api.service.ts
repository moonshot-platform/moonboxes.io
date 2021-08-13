import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WalletConnectService } from './wallet-connect.service';
import { Observable } from 'rxjs';

const baseURL: any = "http://codetentacles-006-site3.htempurl.com/api/";

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {
  userInfo: any;
  data:any;
  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('APPKEY', 'moonbox');
  vendor: any;
  
  constructor(private httpClient: HttpClient, private walletConnectService: WalletConnectService) {
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
    return this.httpClient.get(baseURL+"userData?userAddress="+data,{ headers:this.headers});
  }

  changeStatusClaim(data:any) : Observable<any>
  {
    return this.httpClient.post(baseURL + 'userClaim', data,{ headers:this.headers});

  }
  
  getMoonCount(userAddress:any):Observable<any>
  {
    return this.httpClient.get(baseURL+"landingPageData?userAddress="+this.data.address,{ headers:this.headers});
  } 

}
