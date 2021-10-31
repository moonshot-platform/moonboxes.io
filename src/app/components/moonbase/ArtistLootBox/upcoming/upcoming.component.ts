import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss', './../../buy-moonbase/buy-moonbase.component.scss', './../../moonbase.component.scss', './../../intro/intro.component.scss']
})
export class UpcomingComponent implements OnInit {
  static readonly routeName: string = 'upcoming';
  listOfArtistCollection = [];
  listOfArtistUpcoming = [];
  listOfRecentDrops = [];
  isNSFWStatus = false;
  activeTab = 1;
  lootBoxDetailsAttributes = [];
  lootBoxDetailsAttributesMobile = [];
  artistDetails: any;
  listData = [];
  public innerWidth: any;
  singleView = 4;
  data: any;
  userAddress: any;
  reveal = false;
  public isTooltipActive: boolean[] = [];

  constructor(
    private httpService: HttpApiService,
    private walletConnectService: WalletConnectService,
    private route: ActivatedRoute,
    private title: Title,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.isNSFWStatus = this.httpService.getNSFWStatus();
    this.checkNSFWStatus();

    this.route
      .data
      .subscribe((value) => {
        switch (value.activeTab) {
          case 1:
            this.activeTab = 1;
            break;
          case 2:
            this.activeTab = 2;
            break;
          case 3:
            this.activeTab = 3;
            break;
          default:
            this.activeTab = 2;
            break;
        }
      });
    this.getConnectedAccount();

    if (window.innerWidth < 768) {
      this.singleView = 1;
    }

    this.route.url.subscribe(url => {
      
      switch (url[0].path) {

        case 'recent':
          this.activeTab = 3;
          break;
        case 'live':
          this.activeTab = 2;
          break;
        case 'upcoming':
          this.activeTab = 1;
          break;
      }
    })
  }

  changeTab(tabIndex: number) {
    this.closeAttributes();
    this.activeTab = tabIndex;

    if (this.activeTab == 1) {
      this.title.setTitle('Moonbox drops - Upcoming');
      this.location.go('/upcoming');

      this.listData = [];
      this.listData = this.listOfArtistUpcoming;
    }

    else if (this.activeTab == 2) {
      this.title.setTitle('Moonbox drops - Live');
      this.location.go('/live');
      this.listData = this.listOfArtistCollection;
    }

    else if (this.activeTab == 3) {
      this.title.setTitle('Moonbox drops - Recent');
      this.location.go('/recent');
      this.listData = this.listOfRecentDrops;
    }
    for (let index = 0; index < this.listData.length; index++) {
      this.isTooltipActive[index] = false;
    }
  }



  async getConnectedAccount() {
    this.walletConnectService.getData().subscribe((data) => {
      if (this.data != data && data != undefined && data.address != undefined) {
        this.data = data;
        this.userAddress = data.address;

        this.getAllCollections();
      }
    });

    if (this.data == undefined || this.data.address == undefined) {
      this.getAllCollections();
    }
  }

  async
  getAllCollections() {

    this.httpService.getAllCollections(this.isNSFWStatus, this.userAddress).subscribe((response) => {

      this.listOfArtistCollection = response.data.live_data_array;

      this.listOfRecentDrops = response.data.recent_data_array;
      if (this.activeTab == 2) {
        this.listData = this.listOfArtistCollection;
      }
      else if (this.activeTab == 3) {
        this.listData = this.listOfRecentDrops;
      }

    });

    this.httpService.getUpcomingArtistCollections(this.isNSFWStatus, this.userAddress).subscribe((response) => {

      this.listOfArtistUpcoming = response.data;

      if (this.activeTab == 1) {
        this.listData = [];
        this.listData = this.listOfArtistUpcoming;
      }
      for (let index = 0; index < this.listData.length; index++) {
        this.isTooltipActive[index] = false;
      }
    });
  }

  checkNSFWStatus() {
    setInterval(() => {
      this.checkNSFWStatusFromStorage()
    }, 4000);

  }

  checkNSFWStatusFromStorage() {
    let tempstatus = this.httpService.getNSFWStatus();
    if (this.isNSFWStatus != tempstatus) {
      this.isNSFWStatus = tempstatus;
      this.getAllCollections();
    }
  }



  setSelected(index: number, item: any) {
    this.lootBoxDetailsAttributes = [];
    this.lootBoxDetailsAttributes[index] = item;
    this.lootBoxDetailsAttributes[index].disabled = false;
    setTimeout(() => {
      this.scrollToElement('', 'collection-info');
    }, 100);
  }

  setSelectedMobile(index: number, item: any) {
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

}
