import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  btnText: string="Transfer";
  showError: boolean = false;

  constructor(public dialogRef: MatDialogRef<TransferComponent>,
    public dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private walletConnectService:WalletConnectService,
    private httpApi:HttpApiService) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  async transfer(userAddress:any)
  {
    try{
    if(userAddress=="")
    {
        this.showError = true;
    }
    else
    {
      this.showError = false;
    }
    var transferTxn = await this.walletConnectService.safeTransfer(this.data.walletAddress,userAddress,this.data.details.nftId);
    this.btnText = "Waiting for confirmation";
    transferTxn.wait(3);
    this.httpApi.transferNft({
      fromAddress : this.data.walletAddress,
      toAddress :userAddress,
      nftId : this.data.details.nftId,
      amount : 1,
      transactionHash: transferTxn.hash
    }).subscribe((response:any)=>{
      if(response.isSuccess) {
        this.dialog.closeAll();
        location.reload();
      }
      this.httpApi.showToastr(response.data.message,response.isSuccess);
    });
  } catch (e) {
    this.btnText = "Transfer";
    if (e.code == 4001)
      this.httpApi.showToastr(e.message, false);
    else if(e.data)
      this.httpApi.showToastr(e.data?.message,false);
    else if(e.error)
    this.httpApi.showToastr(e.error?.message,false);
    return false;
  }
      return true;
  }

}
