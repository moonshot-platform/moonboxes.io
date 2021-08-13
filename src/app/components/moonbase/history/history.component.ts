import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
declare let particlesJS: any;
=======
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { ToastrService } from 'ngx-toastr';
>>>>>>> Stashed changes

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class HistoryComponent implements OnInit {

  static readonly routeName: string = 'history';
<<<<<<< Updated upstream
  constructor() {
    particlesJS.load('moonbase-particles', 'assets/json/particlesjs-config.json');
=======
  data: any;
  historyData : any;
  p: number = 1;
  maxSize:number = 9;
  constructor(public toastrService: ToastrService,public httpApiService:HttpApiService,public walletConnectService:WalletConnectService) {

>>>>>>> Stashed changes
   }

  ngOnInit(): void {
    this.walletConnectService.init();

    setTimeout(async() => {
      await this.walletConnectService.getData().subscribe((data)=>{
        this.data=data;
      });
    this.getBidHistory();
    },1000);
  }

  getBidHistory()
  {
    this.httpApiService.getUserBetData(
     this.data.address
    ).subscribe((response:any)=>
    {
      if(response.isSuccess){
        this.historyData = response.data;
        
      }
      else
      {
        this.toastrService.error("something went wrong")
      }

    });
  }

  async ClaimNft(data:any)
  {
    
   var nftSupply=[];
    var nftIds=[];
    var sign;
      data.nftData.forEach(element => {
          nftSupply.push(element.nftAmount);
          nftIds.push(element.Id);
        sign=element.signature;
      });
    
      var txStatus:any = await this.walletConnectService.getRedeemBulk(nftIds,nftSupply,data.betId,sign);
    if(txStatus.status)
    {
      this.httpApiService.changeStatusClaim({
        userAddress : this.data.address,
        transactionHash : txStatus.hash,
        id : data.betId
      }).subscribe((response:any)=>{
          if(response.isSuccess)
          {
            this.toastrService.success(response.data.message);
          }
      })
    }
    else
    {
      console.log("error redeem")
    }
  }

}
