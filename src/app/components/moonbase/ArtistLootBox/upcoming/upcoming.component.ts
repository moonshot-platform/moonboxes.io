import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

enum DROPS_CATEGORY {
  RECENT = 0,
  LIVE = 1,
  UPCOMING = 2
}

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss', './../../buy-moonbase/buy-moonbase.component.scss', './../../moonbase.component.scss', './../../intro/intro.component.scss']
})
export class UpcomingComponent implements OnInit {
  static readonly routeName: string = 'upcoming';
  
  public dropsCategory = DROPS_CATEGORY;
  list = [ [/* RECENT */], [/* LIVE */], [/* RECENT */] ];
  currentCategory: number;

  NSFWToggleState = false;
  
  lootBoxDetailsAttributes = [];
  lootBoxDetailsAttributesMobile = [];
  artistDetails: any;

  data: any;
  address: string;
  selectedIndex: number;
  

  constructor(
    private httpService: HttpApiService,
    private localStorage: LocalStorageService,
    private walletConnectService: WalletConnectService,
    private route: ActivatedRoute,
    private title: Title,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.NSFWToggleState = this.localStorage.getNSFW();
    
    this.localStorage.whenNSFWToggled().subscribe( (NSFWToggleState) => {
      this.NSFWToggleState = NSFWToggleState;
    } );

    this.route.data.subscribe( ( data ) => { this.currentCategory = data.activeTab ?? 2; } );
    this.getConnectedAccount();

    this.route.url.subscribe(url => {
      switch (url[0].path) {
        case 'recent':
          this.currentCategory = DROPS_CATEGORY.RECENT;
          this.title.setTitle('Moonbox drops - recent');
          break;
        case 'live':
          this.currentCategory = DROPS_CATEGORY.LIVE;
          this.title.setTitle('Moonbox drops - live');
          break;
        case 'upcoming':
          this.currentCategory = DROPS_CATEGORY.UPCOMING;
          this.title.setTitle('Moonbox drops - upcoming');
          break;
      }
    })
  }

  changeTab(tabIndex: DROPS_CATEGORY) {
    this.closeAttributes();
    this.currentCategory = tabIndex;

    const categoryName = (Object.values(DROPS_CATEGORY)[tabIndex]).toString().toLowerCase();
    this.title.setTitle(`Moonbox drops - ${categoryName}`);
    this.location.go(`/${categoryName}`);
  }



  async getConnectedAccount() {
    this.walletConnectService.getData().subscribe((data) => {
      if (this.data != data && data != undefined && data.address != undefined) {
        this.data = data;
        this.address = data.address;

        this.getAllCollections();
      }
    });

    if (this.data == undefined || this.data.address == undefined) {
      this.getAllCollections();
    }
  }

  async getAllCollections() {

    this.httpService.getAllCollections( this.NSFWToggleState, this.address ).subscribe((response) => {
      this.list[DROPS_CATEGORY.LIVE] = response.data.live_data_array;
      this.list[DROPS_CATEGORY.RECENT] = response.data.recent_data_array;
    });

    this.httpService.getUpcomingArtistCollections( this.NSFWToggleState, this.address ).subscribe((response) => {
      this.list[DROPS_CATEGORY.UPCOMING] = response.data;
    });
  }

  setSelected(index: number, item: any) {
    this.selectedIndex = index;
    this.lootBoxDetailsAttributes = [];
    this.lootBoxDetailsAttributes[index] = item;
    this.lootBoxDetailsAttributes[index].disabled = false;
    setTimeout(() => {
      this.scrollToElement('', 'collection-info');
    }, 100);
  }

  setSelectedMobile(index: number, item: any) {
    this.selectedIndex = index;
    this.lootBoxDetailsAttributesMobile = [];
    this.lootBoxDetailsAttributesMobile[index] = item;
    this.lootBoxDetailsAttributesMobile[index].disabled = false;
    setTimeout(() => {
      this.scrollToElement('', 'collection-info');
    }, 100);
  }

  closeAttributes() {
    this.lootBoxDetailsAttributes = [];
    this.lootBoxDetailsAttributesMobile = [];
  }

  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  trackByFn(index, item) {
    return item.title;
  }
}
