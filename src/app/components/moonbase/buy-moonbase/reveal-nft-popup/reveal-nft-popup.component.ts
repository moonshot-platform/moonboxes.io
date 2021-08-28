import { Component, OnInit, Inject } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';

@Component({
  selector: 'app-reveal-nft-popup',
  templateUrl: './reveal-nft-popup.component.html',
  styleUrls: ['./reveal-nft-popup.component.scss']
})
export class RevealNftPopupComponent implements OnInit {
  btn1Text="Waiting for Transaction";
  btn2Text="Start now";
  successIcon: boolean = false;
  successIcon2: boolean = false;
  isCompletedProcess : boolean = false;
  
  constructor(private walletConnectService:WalletConnectService,public dialog: MatDialog,private httpApi:HttpApiService,
    @Inject(MAT_DIALOG_DATA) public data: any){

   }

  ngOnInit(): void {
    this.submitBet();
  }

  async submitBet()
  {
    debugger
    var price:any = await this.walletConnectService.getDetailsMoonboxPrice();
    
    this.successIcon = true;
    this.btn1Text="Approved";
    this.btn2Text="Waiting for transaction..";
    var transactionDetails:any;
    try{
    transactionDetails = await this.walletConnectService.redeemBulkTransaction(this.data.index,price,this.data.inputNumber[this.data.index],this.data.data.address)
    }
    catch(e)
    {
      this.dialog.closeAll();
      if(e.hash.code==4001)
        this.httpApi.showToastr(e.hash.message,false);
      else
        this.httpApi.showToastr(e.hash.data.message,false);
      return false;
    }                     
    
    if(transactionDetails.status){
    this.successIcon2 = true;
    this.btn2Text="Submitting data...";
    this.httpApi.submitBet({
      userAddress: this.data.data.address,
      transactionHash : transactionDetails.hash,
      type : this.data.lootBoxName,
      quantity : this.data.inputNumber[this.data.index]
    }).subscribe((response:any)=>
    {
      if(response.isSuccess)
      {
        this.btn2Text="Done";
        this.isCompletedProcess=true;
        this.httpApi.showToastr(response.data.message,true);
      }
      else
      {
        this.httpApi.showToastr(response.data.message,false)
      }
    });
  }
  else
  {
    this.dialog.closeAll();
  }
  
  return false;
  }

}
