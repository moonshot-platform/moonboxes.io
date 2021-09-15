import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnetwalletComponent } from '../connetwallet/connetwallet.component';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
    // {
    //   'name': 'MoonLottery',
    //   'path': '',
    // },
    // {
    //   'name': 'MoonArcade',
    //   'path': ''
    // }
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
      'tooltip': 'This is an overview of all NFT drops, here you will be able to see upcoming, active and recent NFT drops.',
      'click': null,
      'routerLink': ['/upcoming'],
      'route': '/upcoming'
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/Menu_inventory_black.svg',
      'alt': 'inventory',
      'tooltip': 'This is your inventory. An overview of all NFTs you received out of the Moonboxes.',
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
      'tooltip': 'This is an overview of all information about the moonbase dApp. Coming soon!',
      'click': null,
      'routerLink': ['/info'],
      'route': '/info'
    }
  ];

  public open = false;

  constructor(
    public dialog: MatDialog,
    private walletConnectService: WalletConnectService,
    private httpApi: HttpApiService,
    public router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.walletConnectService.init();
    this.getNSFWStatus();

    setTimeout(async () => {
      await this.walletConnectService.getData().subscribe((data) => {
        this.data = data;
      });

      if (this.data !== undefined && this.data.address != undefined) {
        this.isConnected = true;
        this.getMoonShootBalance();
      }
      else {
        this.balanceOfMoon = "Awaiting Connection";
      }
    }, 1000);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ConnetwalletComponent, {
      width: 'auto',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getMoonShootBalance() {
    this.walletConnectService.getBalanceOfUser(this.data.address)
      .then((response: any) => {
        this.balanceOfMoon = response > 0 ? response / 1e9 : 0;
      })
  }

  changeNSFWStatus(event: any) {

    this.httpApi.setNSFWStatus(event);
  }

  getNSFWStatus() {
    this.isNSFWStatus = this.httpApi.getNSFWStatus();
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
    this.location.back();
  }

}
