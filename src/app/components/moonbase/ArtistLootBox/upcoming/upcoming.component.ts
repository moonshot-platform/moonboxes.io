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
  endTime = '2021-09-29T00:00:00';
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

  fakeCollectionData = {
    ArtistName: "Ra8bits",
    NSFW: false.valueOf,
    TotalMaxSupply: 1,
    description: "In an epic journey through outer space, the MoonShooter finds himself on a mission to explore the surface of the Moon. His objective? To continue the unending search for the uncharted relic artifacts. Legend says there are orb-like objects scattered throughout the Moon, which behold powers beyond our perception. Only those, truly balanced by heart and mind, will be able to observe the orbs and harvest their energy.\n\nWill he be the one? The one that will be allowed to witness the true and enormous power of these mysterious orbs?\n\nCheck out the first episode of The Moonshooter \"First Landing\" here:  https://youtu.be/uRi-6OL-QrI",
    discord: "https://discord.com/invite/QrXVQRKzrh",
    filePath: "assets/media/icons/drops/The_Ra8bits_Series.jpg",
    id: 1,
    instagram: "https://www.instagram.com/moonshotrs25/",
    isAdmin: true,
    minPrice: "-",
    name: "The Ra8bits Series",
    opensea: "",
    rarible: "",
    revealDate: "2021/10/07 18:00:00",
    supply: 1,
    telegram: "https://t.me/MoonShotChat",
    transactionhash: "0x09d7e6b10a34748f2399b146c3ef275f2d2628dad324f7a6a1184d0c963e8463",
    twitter: "https://twitter.com/RS25Moonshot",
    walletAddress: "0x4fdf3c15758EFc81Ad809420ABd7bD1D02B4734e",
    website: "https://project-moonshot.me/",
    isFake: true,
  };

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
    
    this.getConnectedAccount();

    if (window.innerWidth < 768) {
      this.singleView = 1;
    }

    this.route.url.subscribe(url => {
      console.log(url);

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
      // this.listData.push(this.fakeCollectionData);
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

  async getAllCollections() {

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
        // this.listData.push(this.fakeCollectionData);
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
