import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { CollectionOverviewComponent } from 'src/app/components/base/dialogs/collection-overview/collection-overview.component';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { WalletConnectComponent } from 'src/app/components/base/wallet/connect/connect.component';
import { TimerPopUPComponent } from './timer-pop-up/timer-pop-up.component';
import {Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
enum DROPS_CATEGORY {
  RECENT = 0,
  LIVE = 1,
  UPCOMING = 2
}

const applicationData = {
  "url": "http://forms.gle/2YkZHLdYKGseBCURA",
  "ArtistName": "by YOU",
  "description": "",
  "NSFW": false,
  "revealDate": "Application form",
  "supply": '- ',
  "TotalMaxSupply": ' -',
  "minPrice": '-',
  "filePath": "assets/media/images/apply-banner.png",
  "name": "Awesome NFT Collection"
}

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit,OnDestroy {
  static readonly routeName: string = 'upcoming';

  public dropsCategory = DROPS_CATEGORY;
  list = null;
  currentCategory: number;
  NSFWToggleState = false;

  lootBoxDetails = [];
  artistDetails: any;

  data: any;
  address: string;
  selectedIndex: number;


  slides: any[] = [];
  artistData: any;

  isCollectionDataLoading: boolean = false;
  isShowPriceAvailability : boolean = true;

  constructor(
    private httpService: HttpApiService,
    private localStorage: LocalStorageService,
    private walletConnectService: WalletConnectService,
    private route: ActivatedRoute,
    private title: Title,
    private location: Location,
    public dialog: MatDialog,
    public router:Router
  ) {
    this.walletConnectService.init();
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.NSFWToggleState = this.localStorage.getNSFW();

    this.localStorage.whenNSFWToggled().subscribe((NSFWToggleState) => {
      this.NSFWToggleState = NSFWToggleState;
    });

    this.route.data.subscribe((data) => { this.currentCategory = data.activeTab ?? 2; });
    this.getConnectedAccount();

    this.route.url.subscribe(url => {
      switch (url[0].path) {
        case 'recent':
          this.currentCategory = DROPS_CATEGORY.RECENT;
          this.title.setTitle('Moonbox drops - recent');
          this.isShowPriceAvailability = false;
          break;
        case 'live':
          this.currentCategory = DROPS_CATEGORY.LIVE;
          this.title.setTitle('Moonbox drops - live');
          this.isShowPriceAvailability = true;
          break;
        case 'upcoming':
          this.currentCategory = DROPS_CATEGORY.UPCOMING;
          this.title.setTitle('Moonbox drops - upcoming');
          this.isShowPriceAvailability = true;
          break;
      }
    })

  

  }

  isTimerUp(event:any){
    if(event.isShowPopUp){
    this.dialog.open(TimerPopUPComponent,{data:event.nftDetails})
    }
  }



  changeTab(tabIndex: DROPS_CATEGORY) {
    this.clearLootboxDetails();
    this.currentCategory = tabIndex;

    const categoryName = (Object.values(DROPS_CATEGORY)[tabIndex]).toString().toLowerCase();
    categoryName == 'recent' ?  this.isShowPriceAvailability = false : this.isShowPriceAvailability = true;
    this.title.setTitle(`Moonbox drops - ${categoryName}`);
    this.location.go(`/${categoryName}`);
  }

  async getConnectedAccount() {
    this.walletConnectService.getData().subscribe((data) => {
      this.data = data;
      this.address = data.address;
    });
    this.getAllCollections();
  }

  getMinPrice(item: any) {
    const { Diamond, Wood, Silver, Gold } = item;
    if (Diamond == Wood && Diamond == Silver && Diamond && Gold)
      return item['minPrice'];

    return `from ${item['minPrice']}`;
  }

  async getAllCollections() {
    this.httpService.getAllCollections(this.NSFWToggleState, this.address).subscribe((response) => {
      if( response.isSuccess && response.status === 200 || response.status === 204 ) {

        let tempList = [[/* RECENT */], [/* LIVE */], [/* RECENT */]];

        tempList[DROPS_CATEGORY.LIVE] = response.data.live_data_array;
        tempList[DROPS_CATEGORY.RECENT] = response.data.recent_data_array;

        this.httpService.getUpcomingArtistCollections(this.NSFWToggleState, this.address).subscribe((response) => {
      
          if( response.isSuccess && response.status === 200 || response.status === 204 ) {
            tempList[DROPS_CATEGORY.UPCOMING] = response.data;
            tempList[DROPS_CATEGORY.UPCOMING].push( applicationData );
          }
          this.list = tempList;
        });
      }
    });
  }

  setSelected(index: number, item: any) {
    if (item.revealDate === 'Application form')
      return;

    this.selectedIndex = index;

    this.clearLootboxDetails();
    this.lootBoxDetails[index] = item;
    this.lootBoxDetails[index].disabled = false;
    setTimeout(() => {
      this.scrollToElement('', 'collection-info');
    }, 100);
  }

  clearLootboxDetails() {
    this.lootBoxDetails = [];
  }

  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  trackByFn(index: number, item: any) {
    return item.title;
  }

  getButtonType(tabButton: DROPS_CATEGORY) {
    return this.currentCategory === tabButton ? 'button' : 'outlined-button';
  }

  viewDetails(data: any): void {
    if (data === null || data['revealDate'] === 'Application form')
      return;

    this.isCollectionDataLoading = true;

    this.getSliderImages(data.walletAddress).then((val) => {
      let collectionData = {
        "slides": this.slides,
        "artistData": this.artistData
      }

      this.isCollectionDataLoading = false;

      this.dialog.open(
        CollectionOverviewComponent,
        {
          width: '100%',
          maxWidth: '1000px',
          data: collectionData,
          panelClass: 'collection-info-popup-panel',
        }
      );
    });
  }

  getSliderImages = (walletAddress: any) => this.httpService.getRandomCollectionImageListFromArtist(walletAddress).then((res) => {
    this.slides = res.data;
    this.artistData = res.artistData;
  });


  openDialoagOfAddUser(){
    let wallet =  this.localStorage.getWallet();
    if(wallet == 1 || wallet == 2){
      this.dialog.open(AddUserDialogComponent,{width:'500px',disableClose:true}).afterClosed().subscribe({
        next:(res:any)=>{}
      })
    }else{
      this.dialog.open(WalletConnectComponent,{width: 'auto'})
    }
   
  }
}
