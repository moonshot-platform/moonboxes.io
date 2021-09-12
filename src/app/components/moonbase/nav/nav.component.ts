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
      'icon': 'assets/media/icons/moonbase/nav/moon.svg',
      'alt': 'moon',
      'tooltip': 'This is your inventory, an overview of rare NFTs you’ve won.',
      'click': null,
      'routerLink': ['/prizepool']
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/diamond.svg',
      'alt': 'diamond',
      'tooltip': 'This is your inventory, an overview of rare NFTs you’ve won.',
      'click': 'openDialog()',
      'routerLink': null
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/folder.svg',
      'alt': 'folder',
      'tooltip': 'This is your history. An overview of your MoonBox NFT claims.',
      'click': null,
      'routerLink': ['/history']
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/lock.svg',
      'alt': 'lock',
      'tooltip': 'This is your inventory. An overview of the NFTs you received on the MoonBox platform.',
      'click': null,
      'routerLink': ['/inventory']
    },
    {
      'icon': 'assets/media/icons/moonbase/nav/info.svg',
      'alt': 'info',
      'tooltip': 'This is your inventory. An overview of the NFTs you received on the MoonBox platform.',
      'click': null,
      'routerLink': ['/introduction']
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
