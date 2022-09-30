import { SocialShareComponent } from './social-share/social-share.component';
import { Component, OnInit, Inject } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-for-transaction',
  templateUrl: './modal-for-transaction.component.html',
  styleUrls: ['./modal-for-transaction.component.scss']
})
export class ModalForTransactionComponent implements OnInit {

  btn1Text = "Waiting for Transaction";
  btn2Text = "Start now";
  successIcon: boolean = false;
  successIcon2: boolean = false;
  isCompletedProcess: boolean = false;
  videoSource = [
    "assets/media/videos/Moonboxes_WOOD.webm",
    "assets/media/videos/Moonboxes_SILVER.webm",
    "assets/media/videos/Moonboxes_GOLD.webm",
    "assets/media/videos/Moonboxes_DIAMOND.webm"
  ]
  videoSourceFallback = [
    "assets/media/videos/Moonboxes_WOOD_fallback.webm",
    "assets/media/videos/Moonboxes_SILVER_fallback.webm",
    "assets/media/videos/Moonboxes_GOLD_fallback.webm",
    "assets/media/videos/Moonboxes_DIAMOND_fallback.webm"
  ]
  nftrevealed: boolean = false;
  playvideo: boolean = false;
  social: boolean = false;
  nftImgRevealed = [];
  messages: any[] = [];
  subscription: Subscription;
  current = 0;

  constructor(private walletConnectService: WalletConnectService, public dialog: MatDialog, private httpApi: HttpApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef:MatDialogRef<ModalForTransactionComponent>) {

  }

  ngOnInit(): void {
    this.httpApi.sendMessage(true);
    if (this.data.isArtistLootBox) {
      this.submitBetForArtist();
    } else {
      this.submitBet();
    }
  }

  next() {
    this.current = this.current < this.nftImgRevealed.length - 1  ? this.current + 1 : 0;
  }

  prev() {
    this.current = this.current > 0 ? this.current - 1 : this.nftImgRevealed.length - 1 ;
  }

  async submitBet() {
    var price: any = await this.walletConnectService.getDetailsMoonboxPrice();
    this.btn1Text = "Waiting for transaction";
    var transactionDetails: any;
    //debugger
    try {
      transactionDetails = await this.walletConnectService.redeemBulkTransaction(this.data.index, price, this.data.inputNumber, this.data.data.address)
    }
    catch (e) {
      //debugger
      console.log(e);
      this.closeDialog()
      if (e.hash.code == 4001)
        this.httpApi.showToastr(e.hash.message, false);
      else if (e.hash?.data)
        this.httpApi.showToastr(e.hash?.data?.message, false);
      else if (e.hash?.error)
        this.httpApi.showToastr(e.hash?.error?.message, false);
      return false;
    }

    if (transactionDetails.status) {

      this.btn1Text = "Submitting data";
      this.httpApi.submitBet({
        userAddress: this.data.data.address,
        transactionHash: transactionDetails.hash,
        type: this.data.lootBoxName,
        quantity: this.data.inputNumber
      }).subscribe((response: any) => {
        if (response.isSuccess) {
          this.successIcon = true;
          this.btn1Text = "Done";
          //this.isCompletedProcess=true;
          this.revealNft(transactionDetails.hash);
          this.httpApi.showToastr(response.data.message, true);
        }
        else {
          this.httpApi.showToastr(response.data.message, false)
        }
      });
    }
    else {
      //debugger
      this.closeDialog()
      if (transactionDetails.error.code == 4001)
        this.httpApi.showToastr(transactionDetails.error.message, false);
      else if (transactionDetails.error?.data)
        this.httpApi.showToastr(transactionDetails.error?.data?.message, false);
      else if (transactionDetails.error?.error)
        this.httpApi.showToastr(transactionDetails.error?.error?.message, false);
      return false;
    }

    return false;
  }

  async revealNft(txnHash: any) {
    this.httpApi.verifyBetHash({
      transactionHash: txnHash,
      userAddress: this.data.data.address
    }).subscribe((response: any) => {
      if (response.status == 408) {
        this.httpApi.showToastr("Contract address not matched", false);
        this.closeDialog();
      }
      else if (response.isSuccess) {
        this.claimTransactionInitiate(response.data);
      }
      else {
        setTimeout(() => {
          this.revealNft(txnHash);
        }, 5000);
      }
    });

  }

  async claimTransactionInitiate(nftDetails) {
    var nftSupply = [];
    var nftIds = [];
    var sign;

    nftDetails.nftData.forEach(element => {
      nftSupply.push(element.nftAmount);
      nftIds.push(element.Id);
      sign = element.signature;
    });

    var txStatus: any;
    try {
      txStatus = await this.walletConnectService.getRedeemBulk(nftIds, nftSupply, nftDetails.betId, sign, nftDetails.isArtist, nftDetails.artistAddress, this.data.artistDetails.ArtistNFTAddress);
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
        userAddress: this.data.data.address,
        transactionHash: txStatus.hash,
        id: nftDetails.id
      }).subscribe((response: any) => {
        if (response.isSuccess) {
          this.btn2Text = "Done";
          this.nftImgRevealed = response.filePath;
          this.isCompletedProcess = true;
          setTimeout(() => {
            this.playvideo = true;
          }, 3000);

          this.httpApi.showToastr(response.data.message, true);
        }
      })
    }
    else {
      //debugger
      this.closeDialog();
      if (txStatus.hash.code == 4001)
        this.httpApi.showToastr(txStatus.hash.message, false);
      else if (txStatus.hash?.data)
        this.httpApi.showToastr(txStatus.hash?.data?.message, false);
      else if (txStatus.hash?.error)
        this.httpApi.showToastr(txStatus.hash?.error?.message, false);
      return false;
    }
    return false;
  }


  async submitBetForArtist() {
    this.btn1Text = "Waiting for transaction";
    var transactionDetails: any;
    try {
      if (this.data.artistDetails.tokenAddress != '0x0000000000000000000000000000000000000000') {
        let allowance: any = await this.walletConnectService.checkAllowance(this.data.artistDetails.tokenAddress, this.data.artistDetails.price);
        if (allowance.status && !allowance.allowance) {
          this.btn1Text = "Approve Token..."
          let txn: any = await this.walletConnectService.approveToken(this.data.artistDetails.price, this.data.artistDetails.tokenAddress);
          await txn.hash.wait(3);
        }
      }
      transactionDetails = await this.walletConnectService
        .redeemBulkTransactionArtist(
          this.data.artistDetails.lootBoxId,
          this.data.inputNumber,
          this.data.artistDetails.price,
          this.data.artistDetails.address,
          this.data.artistDetails.signature,
          this.data.artistDetails.limit,
          this.data.artistDetails.tokenAddress
        );
    }
    catch (e) {
      //debugger
      console.log(e);
      this.closeDialog()
      if (e.hash?.code == 4001)
        this.httpApi.showToastr(e.hash.message, false);
      else if (e.hash?.data)
        this.httpApi.showToastr(e.hash?.data?.message, false);
      else if (e.hash?.error)
        this.httpApi.showToastr(e.hash?.error?.message, false);
        else
        this.httpApi.showToastr(e, false);
      return false;
    }

    if (transactionDetails.status) {
      this.btn1Text = "Submitting data";
      this.httpApi.submitBetForArtistApi({
        userAddress: this.data.data.address,
        transactionHash: transactionDetails.hash,
        type: this.data.lootBoxName,
        quantity: this.data.inputNumber,
        id: this.data.artistDetails.lootBoxId
      }).subscribe((response: any) => {
        if (response.isSuccess) {
          this.successIcon = true;
          this.btn1Text = "Done";
          // this.isCompletedProcess=true;
          this.revealNft(transactionDetails.hash);
          this.httpApi.showToastr(response.data.message, true)
        }
        else {
          this.httpApi.showToastr(response.data.message, false)
        }
      });
    }
    else {
      //debugger
      this.closeDialog()
      if (transactionDetails.error.code == 4001)
        this.httpApi.showToastr(transactionDetails.error.message, false);
      else if (transactionDetails.error?.data)
        this.httpApi.showToastr(transactionDetails.error?.data?.message, false);
      else if (transactionDetails.error?.error)
        this.httpApi.showToastr(transactionDetails.error?.error?.message, false);
      return false;
    }

    return false;
  }

  closeDialogDone() {
    if (this.isCompletedProcess) {
      this.closeDialog();
    }
  }

  closeDialog() {
    this.httpApi.sendMessage(false);
    this.dialogRef.close();
    this.dialog.closeAll();
  }

  nftVisible() {
    this.nftrevealed = true;
  }

  shareSocial() {

    this.closeDialog();
    this.social = true;
  }

  openDialog() {
    this.dialog.open(SocialShareComponent, {
      width: 'auto',
      data: { name: this.nftImgRevealed }
    });
  }


  checkFileType(url: string) {
    const images = ["jpg", "gif", "png", "jpeg", "JPG", "GIF", "PNG", "JPEG"]
    const videos = ["mp4", "3gp", "ogg", "MP4", "3GP", "OGG"]

    const urltemp = new URL(url)
    const extension = urltemp.pathname.substring(urltemp.pathname.lastIndexOf('.') + 1)

    if (images.includes(extension)) {
      return "true"
    } else if (videos.includes(extension)) {
      return false;
    }
    return true;
  }




  clearMessages(): void {
    this.httpApi.clearMessages();
  }

}
