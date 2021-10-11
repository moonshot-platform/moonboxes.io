import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  btnText: string="Transfer";

  constructor(public dialogRef: MatDialogRef<TransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private walletConnectService:WalletConnectService,
    private httpApi:HttpApiService) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  async transfer(userAddress:any)
  {
    this.btnText = "Transfer inititated" ;
    var transferTxn = await this.walletConnectService.safeTransfer(this.data.walletAddress,userAddress,this.data.details.nftId);
    this.btnText = "Waiting for confirmation";
    transferTxn.wait(3);
    this.httpApi.transferNft({
      fromAddress : this.data.walletAddress,
      toAddress :userAddress,
      nftId : this.data.details.nftId,
      amount : 1
    }).subscribe((response:any)=>{
      this.httpApi.showToastr(response.data.message,response.isSuccess);
    });
      
  }

}
