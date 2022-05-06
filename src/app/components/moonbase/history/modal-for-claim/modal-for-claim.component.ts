import { Component, OnInit, Inject } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';

@Component({
  selector: 'app-modal-for-claim',
  templateUrl: './modal-for-claim.component.html',
  styleUrls: ['./modal-for-claim.component.scss']
})
export class ModalForClaimComponent implements OnInit {

  btn1Text = "Waiting for Transaction";
  btn2Text = "Start now";
  successIcon: boolean = false;
  successIcon2: boolean = false;
  isCompletedProcess: boolean = false;
  claimed: boolean = false;
  constructor(private walletConnectService: WalletConnectService, public dialog: MatDialogRef<ModalForClaimComponent>, private httpApi: HttpApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {

    this.claim();

  }

  async claim() {
    debugger
    var nftSupply = [];
    var nftIds = [];
    var sign;
    this.data.nftDetails.nftData.forEach(element => {
      nftSupply.push(element.nftAmount);
      nftIds.push(element.Id);
      sign = element.signature;
    });
    this.successIcon = true;
    this.btn1Text = "Approved";
    this.btn2Text = "Waiting for transaction";
    var txStatus: any;
    try {
      txStatus = await this.walletConnectService.getRedeemBulk(nftIds, nftSupply, this.data.nftDetails.betId, sign, this.data.nftDetails.isArtist, this.data.nftDetails.artistAddress, this.data.nftDetails.ArtistNFTAddress);
      debugger
    }
    catch (e) {
      this.closeDialog();
      if (e.hash.code == 4001)
        this.httpApi.showToastr(e.hash.message, false);
      else if (e.hash?.data)
        this.httpApi.showToastr(e.hash?.data?.message, false);
      else if (e.hash?.error)
        this.httpApi.showToastr(e.hash?.error?.message, false);
      return false;
    }

    if (txStatus.status) {
      this.successIcon2 = true;
      this.btn2Text = "Submitting data";
      this.httpApi.changeStatusClaim({
        userAddress: this.data.userAddress,
        transactionHash: txStatus.hash,
        id: this.data.nftDetails.id
      }).subscribe((response: any) => {
        if (response.isSuccess) {
          this.claimed = true;
          this.btn2Text = "Done";
          this.isCompletedProcess = true;
          this.httpApi.showToastr(response.data.message, true);
        }
      })
    } else {
      console.error("error redeem");
    }

    return false;
  }

  closeDialogDone() {
    if (this.isCompletedProcess) this.closeDialog();
  }

  closeDialog() {
    this.dialog.close(this.claimed);
  }
}
