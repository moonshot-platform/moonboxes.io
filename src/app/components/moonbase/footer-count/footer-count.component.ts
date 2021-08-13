import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpApiService } from 'src/app/services/http-api.service';

@Component({
  selector: 'app-footer-count',
  templateUrl: './footer-count.component.html',
  styleUrls: ['./footer-count.component.scss','./../moonbase.component.scss', './../intro/intro.component.scss']
})
export class FooterCountComponent implements OnInit {
  data: any;
  isConnected:boolean = false;
  balanceOfMoon: any=0;
  moonCountData: any;
  constructor(private walletConnectService:WalletConnectService,
    private httpApi:HttpApiService) { }

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
    },1000);
  }

  getMoonShootBalance()
  {
    this.walletConnectService.getBalanceOfUser(this.data.address)
    .then((response:any)=>
    {
      this.balanceOfMoon=response;
    })

    this.httpApi.getMoonCount(this.data.address)
    .subscribe((response:any)=>
    {
      this.moonCountData=response.data;
    })
  }

}
