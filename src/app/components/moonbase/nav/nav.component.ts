import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnetwalletComponent } from '../connetwallet/connetwallet.component';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { TokenomicsService } from 'src/app/services/tokenomics.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  data: any;
  isConnected:boolean = false;
  balanceOfMoon: any=0;
  moonCountData: any;
  menuItem = false;
  public navItems: any[] = [
    {
      'name': 'MoonBoxes',
      'path': '/moonbase'
    },
    {
      'name': 'MoonLottery',
      'path': '/history',
      // 'path': '/moonpaper'
    },
    {
      'name': 'MoonArcade',
      'path': '/community'
    }
  ];

  public open = false;

  constructor(public dialog: MatDialog,private walletConnectService:WalletConnectService,
    private httpApi:HttpApiService, private tokenomicsService: TokenomicsService) { }

  ngOnInit(): void {
    this.walletConnectService.init();

    setTimeout(async() => {
      await this.walletConnectService.getData().subscribe((data)=>{
        this.data=data;
      });
      
      if(this.data!==undefined && this.data.address!=undefined)
      {
        this.isConnected=true;
        this.getMoonShootBalance();
      }
      else
      {
        this.balanceOfMoon="Awaiting Connection";
      }
    },1000);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ConnetwalletComponent, {
      width: 'auto',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  
  getMoonShootBalance()
  {
    this.walletConnectService.getBalanceOfUser(this.data.address)
    .then((response:any)=>
    {
      this.balanceOfMoon=response>0 ? response/1e9 : 0;
    })

   
  }
  
  toggleTokenomics() {
    this.open = false;
    this.tokenomicsService.onToggle(false);
  }

  menuopen() {
    this.menuItem = true;
  }
  
  closeMenu() {
    this.menuItem = false;
  }

}
