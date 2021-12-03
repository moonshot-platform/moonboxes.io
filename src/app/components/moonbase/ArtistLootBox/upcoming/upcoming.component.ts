import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { CollectionOverviewComponent } from 'src/app/components/base/dialogs/collection-overview/collection-overview.component';

enum DROPS_CATEGORY {
  RECENT = 0,
  LIVE = 1,
  UPCOMING = 2
}

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {
  static readonly routeName: string = 'upcoming';
  
  public dropsCategory = DROPS_CATEGORY;
  list = [ [/* RECENT */], [/* LIVE */], [/* RECENT */] ];
  currentCategory: number;

  NSFWToggleState = false;
  
  lootBoxDetails = [];
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
    private location: Location,
    public dialog: MatDialog,
  ) {
    this.walletConnectService.init();
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
    this.clearLootboxDetails();
    this.currentCategory = tabIndex;

    const categoryName = (Object.values(DROPS_CATEGORY)[tabIndex]).toString().toLowerCase();
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

  getMinPrice( item: any ) {
    const { Diamond, Wood, Silver, Gold } = item;
    if( Diamond == Wood && Diamond == Silver && Diamond && Gold  )
      return item['minPrice'];

    return `from ${item['minPrice']}`;
  }

  async getAllCollections() {

    this.httpService.getAllCollections( this.NSFWToggleState, this.address ).subscribe((response) => {
      this.list[DROPS_CATEGORY.LIVE] = response.data.live_data_array;
      this.list[DROPS_CATEGORY.RECENT] = response.data.recent_data_array;
    });

    this.httpService.getUpcomingArtistCollections( this.NSFWToggleState, this.address ).subscribe((response) => {
      this.list[DROPS_CATEGORY.UPCOMING] = response.data;

      this.list[DROPS_CATEGORY.UPCOMING].push(
        {
          "url": "http://forms.gle/2YkZHLdYKGseBCURA",
          "ArtistName": "by YOU",
          "description": "sadasd asdasd asdsdf",
          "NSFW": false,
          "revealDate": "Application form",
          "supply": '- ',
          "TotalMaxSupply": ' -',
          "minPrice": '-',
          "filePath": "assets/media/images/apply-banner.png",
          "name": "Awesome NFT Collection"
      }
    );
    });
  }

  setSelected(index: number, item: any) {
    if( item.revealDate === 'Application form' )
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

  getButtonType( tabButton: DROPS_CATEGORY ) {
    return this.currentCategory === tabButton ? 'button' : 'outlined-button';
  }

  viewDetails( data: any ): void {
    this.dialog.open(CollectionOverviewComponent, { width: '100%', maxWidth: '1000px', data });
  }
}
