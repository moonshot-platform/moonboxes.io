import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ArtistMoonbox } from '../models/artist-moonbox.model';

import { plainToClass } from 'class-transformer';
import { AdminMoonbox } from '../models/admin-moonbox.model';

const baseURL: any = environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  userInfo: any;
  data: any;
  headers: any;

  private subject = new Subject();

  public lootBoxDetails: any = [
    { name: 'Wood' },
    { name: 'Silver' },
    { name: 'Gold' },
    { name: 'Diamond' }
  ];


  vendor: any;
  chainId: string;

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) {
    // //
    this.chainId = localStorage.getItem('manual_chainId') ?? "56";

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('APPKEY', 'mTb+T!5!crBEQEL2!$PJ9&JSjeT3M6Hs*RytA-eaDSBS5UU@8-fCJHu6F?kp@s+JTu2-_-V8L#?5')
      .set('blockchainId', `${this.chainId}`);
  }

  submitBet(data: any): Observable<any> {
    const url = `${baseURL}userBid`;

    return this.httpClient.post(url, data, { headers: this.headers });
  }

  getMaxSupply(userWalletAddress: string): Observable<AdminMoonbox> {
    const params = { userWalletAddress, ArtistwalletAddress: environment.ownerAddress };
    const url = `${baseURL}typeCount`;

    return this.httpClient.get(url, { headers: this.headers, params })
      .pipe(map((r: Response) => plainToClass(AdminMoonbox, r)));
  }

  getUserBetData(data: any): Observable<any> {
    const params = { userAddress: data };
    const url = `${baseURL}userBetData`;

    return this.httpClient.get(url, { headers: this.headers, params });
  }

  getUserInventory(data: any): Promise<any> {
    const params = { userAddress: data.userAddress, NSFW: data.nsfwstatus };
    const url = `${baseURL}userData`;

    return this.httpClient.get(url, { headers: this.headers, params }).toPromise();
  }

  getuserUpcomingNft(data: any): Observable<any> {
    const params = { userAddress: data.userAddress, nsfw: data.nsfwstatus };
    const url = `${baseURL}userUpcomingNft`;

    return this.httpClient.get(url, { headers: this.headers, params });
  }

  verifyBetHash(data: any): Observable<any> {
    const url = `${baseURL}verifyBetHash`;

    return this.httpClient.post(url, data, { headers: this.headers });
  }

  changeStatusClaim(data: any): Observable<any> {
    const url = `${baseURL}userClaim`;

    return this.httpClient.post(url, data, { headers: this.headers });
  }

  getMoonCount(userAddress: string): Promise<any> {
    const params = { userAddress };
    const url = `${baseURL}landingPageData`;

    return this.httpClient.get(url, { headers: this.headers, params }).toPromise();
  }

  /***** Artist pages apis *****/
  getAllCollections(NSFW: boolean, walletAddress: string): Observable<any> {
    const params = { NSFW, walletAddress };
    const url = `${baseURL}allArtistBanners`;

    return this.httpClient.get(url, { headers: this.headers, params });
  }

  getUpcomingArtistCollections(NSFW: boolean, walletAddress: string): Observable<any> {
    const params = { NSFW, walletAddress };
    const url = `${baseURL}upcomingArtistBanners`;

    return this.httpClient.get(url, { headers: this.headers, params });
  }

  getLiveCollectionsBanner(): Promise<any> {
    let NSFW: boolean = true;
    let walletAddress: string = '';
    const params = { NSFW, walletAddress };
    // const url = `${baseURL}allArtistBanners`;
    const url = `${baseURL}allArtistCollectionList`; // new api to get upcoming collection images

    return this.httpClient.get(url, { headers: this.headers, params }).toPromise();
  }

  getArtistMoonboxData(artistWalletAddress: string, userAddress: string): Promise<any> {
    const params = { artistWalletAddress, userAddress };
    const url = `${baseURL}getArtistMoonboxData`;
    let promise = new Promise((resolve, reject) => {
      this.httpClient.get(url, { headers: this.headers, params })
        .pipe(map((r: Response) => plainToClass(ArtistMoonbox, r))).subscribe({
          next: (res: any) => {
            resolve(res)
          },
          error:(err)=>{
            reject(err)
          }
        });
    })

    return promise;

  }

  getRandomCollectionImageListFromArtist(artistAddress: string): Promise<any> {
    const params = { artistAddress: artistAddress };
    // 
    const url = `${baseURL}randCollectionImageListArtist`;

    return this.httpClient.get(url, { headers: this.headers, params }).toPromise();
  }

  submitBetForArtistApi(data: any): Observable<any> {
    const url = `${baseURL}BidForArtist`;
    return this.httpClient.post(url, data, { headers: this.headers });
  }

  claimRewardDetails(data: any): Observable<any> {
    const url = `${baseURL}getReward`;
    return this.httpClient.post(url, data, { headers: this.headers });
  }

  claimRewardTransactionHashUpdate(data: any): Observable<any> {
    const url = `${baseURL}transactionHashForReward`;
    return this.httpClient.post(url, data, { headers: this.headers });
  }

  transferNft(data: any): Observable<any> {
    const url = `${baseURL}transferNft`;
    return this.httpClient.post(url, data, { headers: this.headers });
  }


  revealData(data: any): Observable<any> {
    const url = `${baseURL}revealData`;
    return this.httpClient.post(url, data, { headers: this.headers });
  }


  isUserAdded(data: any): Observable<any> {
    return this.httpClient.post(baseURL + 'isUserAdded', data, { headers: this.headers });

  }

  addArtist(data: any): Observable<any> {
    return this.httpClient.post(baseURL + 'addUser', data, { headers: this.headers });

  }

  showToastr(message: string, isSuccess: boolean): void {
    if (isSuccess)
      this.toastrService.success(message);
    else
      this.toastrService.error(message);
  }

  sendMessage(message: boolean): void {
    this.subject.next({ text: message });
  }

  clearMessages(): void {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }


  getRequest(urlLink) {
    const url = `${baseURL}${urlLink}`;
    return this.httpClient.get(url, { headers: this.headers });
  }

  postRequest(link: any, body: any): Observable<any> {
    let url = `${baseURL}${link}`;
    return this.httpClient.post(url, body, { headers: this.headers });
  }




}
