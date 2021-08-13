import { Component, OnInit, Inject } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-for-transaction',
  templateUrl: './modal-for-transaction.component.html',
  styleUrls: ['./modal-for-transaction.component.scss']
})
export class ModalForTransactionComponent implements OnInit {
  
  btn1Text="Waiting for Transaction";
  btn2Text="Start now";
  successIcon: boolean = false;
  successIcon2: boolean = false;
  
  constructor(private walletConnectService:WalletConnectService,public dialog: MatDialog,private httpApi:HttpApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,private toastrService:ToastrService){

   }

  ngOnInit(): void {
       
    this.submitBet();

  }

  async submitBet()
  {
    var price:any = await this.walletConnectService.getDetailsLootboxPrice(this.data.index);
    debugger
    if(this.data.balance < (price*this.data.inputNumber[this.data.index])*1e9)
    {
      alert("Insufficient Balance");
      this.dialog.closeAll();
      debugger
      return false;
    }
    var allowanceDetails:any=await this.walletConnectService.getTransactionHashForAllowance(this.data.index,this.data.inputNumber[this.data.index],this.data.data.address);
    if(allowanceDetails.allowance)
    {
      this.btn1Text="Approved";
    }
    else
    {
      this.btn1Text="Waiting for Transaction";
      allowanceDetails =await this.walletConnectService.approveSilverToken(this.data.index,this.data.inputNumber[this.data.index],this.data.data.address);
      await allowanceDetails.hash.wait(1);
    }

    if(allowanceDetails.status){
    this.successIcon = true;
    this.btn1Text="Approved";
    this.btn2Text="Waiting for transaction..";

    var transactionDetails:any = await this.walletConnectService.redeemBulkTransaction(this.data.index,1213,this.data.inputNumber[this.data.index],this.data.data.address);
    this.successIcon2 = true;
    this.btn2Text="Submitting data...";
    this.httpApi.submitBet({
      userAddress: this.data.data.address,
      transactionHash : transactionDetails.hash,
      type : this.data.lootBoxName[this.data.index],
      quantity : this.data.inputNumber[this.data.index]
    }).subscribe((response:any)=>
    {
      if(response.isSuccess)
      {
        this.btn2Text="Done";
        this.toastrService.success(response.data.message)
      }
      else
      {
        this.toastrService.error(response.data.message)
      }
    });
  }
  return false;
  }

  closeDialog() {
  this.dialog.closeAll();
  }
}
