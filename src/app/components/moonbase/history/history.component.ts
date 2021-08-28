import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModalForClaimComponent } from './modal-for-claim/modal-for-claim.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class HistoryComponent implements OnInit {

  static readonly routeName: string = 'history';
  data: any;
  historyData : any;
  p: number = 1;
  maxSize:number = 9;
  constructor(public toastrService: ToastrService,public httpApiService:HttpApiService,public walletConnectService:WalletConnectService,
    public dialog: MatDialog) {

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

  async ClaimNft(data:any,index:number)
  {
    const dialogref = this.dialog.open(ModalForClaimComponent, {
      width: 'auto',
      disableClose : true,
       data: {
         nftDetails : data,
         userAddress : this.data.address
       }
    });

    dialogref.afterClosed().subscribe(result => {
      this.historyData[index].isClaimed = result;

    });
  
  }

}
