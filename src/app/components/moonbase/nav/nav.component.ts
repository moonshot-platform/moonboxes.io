import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { TokenomicsService } from 'src/app/services/tokenomics.service';
import { MoonbaseComponent } from '../moonbase.component';
import { WalletConnectComponent } from '../../base/wallet/connect/connect.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  data: any;
  isConnected: boolean = false;
  balanceOfMoon: any = 0;
  moonCountData: any;
  isNSFWStatus = false;
  menuItem = false;
  public isTooltipActive = true;

  public navItems: any[] = [
    {
      'name': 'MoonBoxes',
      'path': ''
    },
  ];


  public navSubItems: any[] = [
    {
      'icon': 'assets/media/icons/moonbase/nav/Menu_return_black.svg',
      'alt': 'return back',
      'tooltip': 'Back',
      'click': () => { },
      'routerLink': null, // [''],
      'route': '/'
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/Menu_drops_black.svg',
      'alt': 'drops',
      'tooltip': 'This is an overview of all NFT drops, here you will be able to see recent, live and upcoming NFT drops.',
      'click': null,
      'routerLink': ['/live'],
      'route': '/live'
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/Menu_inventory_black.svg',
      'alt': 'inventory',
      'tooltip': 'This is your inventory. An overview of all NFTs you received out of the MoonBoxes.',
      'click': null,
      'routerLink': ['/inventory'],
      'route': '/inventory'
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/Menu_history_black.svg',
      'alt': 'history',
      'tooltip': 'This is your history. An overview of your MoonBox NFT claims.',
      'click': null,
      'routerLink': ['/history'],
      'route': '/history'
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/Menu_info_black.svg',
      'alt': 'info',
      'tooltip': 'This is an overview of all information about the MoonBase dApp. Coming soon!',
      'click': null,
      'routerLink': ['/info'],
      'route': '/info'
    }
  ];

  public open = false;

  constructor(
    public dialog: MatDialog,
    private walletConnectService: WalletConnectService,
    private tokenomicsService: TokenomicsService,
    private localStorage: LocalStorageService,
    public router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.walletConnectService.init();
    this.getNSFWStatus();
    
    setTimeout(async () => {
      this.walletConnectService.getData().subscribe((data) => {
        if (data !== undefined && data.address != undefined) {
          this.data = data;
          this.isConnected = true;
          if (this.data.networkId.chainId == environment.chainId) {
            this.getMoonShootBalance();
          }
        }
        else {
          this.balanceOfMoon = "Awaiting Connection";
        }
      });

    }, 1000);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(WalletConnectComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  async getMoonShootBalance() {
    this.balanceOfMoon = await this.walletConnectService.getBalanceOfUser(this.data.address);

    this.balanceOfMoon /= 1e9;
    this.balanceOfMoon = Math.trunc(this.balanceOfMoon);
    this.balanceOfMoon = this.balanceOfMoon.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  menuopen() {
    this.menuItem = true;
  }

  closeMenu() {
    this.menuItem = false;
  }

  closeTooltip() {
    this.isTooltipActive = false;
  }

  goBack() {
    if( this.router.url.replace('/', '') !== MoonbaseComponent.routeName )
      this.location.back();
  }
  toggleTokenomics() {
    this.tokenomicsService.onToggle(true);
    this.closeMenu();
  }

  changeNSFWStatus( state: boolean ) {
    this.localStorage.setNSFW( state );
  }

  getNSFWStatus() {
    this.isNSFWStatus = this.localStorage.getNSFW();
  }

}
