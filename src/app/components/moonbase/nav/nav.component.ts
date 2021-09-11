import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnetwalletComponent } from '../connetwallet/connetwallet.component';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';

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
      'path': '/moonbase'
    },
    {
      'name': 'MoonLottery',
      'path': '',
    },
    {
      'name': 'MoonArcade',
      'path': ''
    }
  ];


  public navSubItems: any[] = [
    {
      'icon': 'assets/media/icons/moonbase/nav/Menu_return_black.svg',
      'alt': 'return back',
      'tooltip': 'This is your MoonBase. Home of this dApp.',
      'click': null,
      'routerLink': ['']
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/Menu_drops_black.svg',
      'alt': 'drops',
      'tooltip': 'This is your inventory. An overview of the NFTs you received on the MoonBox platform.',
      'click': null,
      'routerLink': ['/upcoming']
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/Menu_inventory_black.svg',
      'alt': 'inventory',
      'tooltip': 'This is your inventory, an overview of rare NFTs you’ve won.',
      'click': null,
      'routerLink': ['/inventory']
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/Menu_history_black.svg',
      'alt': 'history',
      'tooltip': 'This is your history. An overview of your MoonBox NFT claims.',
      'click': null,
      'routerLink': ['/history']
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/Menu_info_black.svg',
      'alt': 'info',
      'tooltip': 'This is your inventory, an overview of rare NFTs you’ve won.',
      'click': null,
      'routerLink': ['/prizepool']
    }
  ];

  public open = false;

  constructor(public dialog: MatDialog, private walletConnectService: WalletConnectService,
    private httpApi: HttpApiService) { }

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
    debugger
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

}
