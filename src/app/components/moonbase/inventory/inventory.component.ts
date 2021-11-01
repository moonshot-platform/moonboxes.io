import { Component, OnInit, TemplateRef } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SocialShareComponent } from '../modal-for-transaction/social-share/social-share.component';
import { TransferComponent } from '../modal-for-transaction/transfer/transfer.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class InventoryComponent implements OnInit {
  static readonly routeName: string = 'inventory';
  data: any;
  inventoryList: any;

  p: number = 1;
  maxSize: number = 9;
  inventoryListUpcoming: any;
  lootBoxDetails = [];
  lootBoxDetailsAttributes = [];
  lootBoxDetailsAttributesMobile = [];
  isNSFWStatus = false;
  isRarityTooltipActive: boolean = false;
  isConnected = false;
  address = "";

  constructor(private walletConnectService: WalletConnectService,
    private httpApi: HttpApiService, private toastrService: ToastrService,
    public dialog: MatDialog) {
    this.lootBoxDetails = httpApi.lootBoxDetails;
  }

  ngOnInit(): void {
    this.walletConnectService.init();
    this.isNSFWStatus = this.httpApi.getNSFWStatus();
    this.checkNSFWStatus();
    setTimeout(async () => {
      this.walletConnectService.getData().subscribe((data) => {
        this.data = data;
      });
      if (this.data !== undefined && this.data.address != undefined) {
        this.getUserData();
      }
      this.isConnected = this.walletConnectService.isWalletConnected();
      this.address = this.walletConnectService.getAccount();
    }, 1000);
  }
  getUserData() {
    this.httpApi.getUserInventory({
      userAddress: this.data.address,
      nsfwstatus: this.isNSFWStatus
    }).subscribe((response: any) => {
      if (response.isSuccess) {
        this.inventoryList = response.data.data;
      }
      else {
        this.toastrService.error("something went wrong");
      }
    });

    this.httpApi.getuserUpcomingNft({
      userAddress: this.data.address,
      nsfwstatus: this.isNSFWStatus
    }).subscribe((response: any) => {
      if (response.isSuccess) {
        this.inventoryListUpcoming = response.data.data;

      }
      else {
        this.toastrService.error("something went wrong");
      }
    });
  }



  getImagePath(type) {
    if (type == "Wood") {
      return this.lootBoxDetails[0].img;
    }
    else if (type == "Silver") {
      return this.lootBoxDetails[1].img;
    }
    else if (type == "Gold") {
      return this.lootBoxDetails[2].img;
    }
    else {
      return this.lootBoxDetails[3].img;
    }
  }

  setSelected(index: number, item: any) {
    this.lootBoxDetailsAttributes = [];
    this.lootBoxDetailsAttributes[index] = item;
    this.lootBoxDetailsAttributes[index].disabled = false;
    setTimeout(() => {
      this.scrollToElement('', 'attribute-info');
    }, 100);
  }

  setSelectedMobile(index: number, item: any) {
    this.lootBoxDetailsAttributesMobile = [];
    this.lootBoxDetailsAttributesMobile[index] = item;
    this.lootBoxDetailsAttributesMobile[index].disabled = false;
    setTimeout(() => {
      this.scrollToElement('', 'attribute-info-mobile');
    }, 100);
  }

  closeAttributes() {
    this.lootBoxDetailsAttributes = [];
    this.lootBoxDetailsAttributesMobile = [];
  }

  claimReward(details: any, event: any, index: any) {
    this.lootBoxDetailsAttributes[index].disabled = true;

    this.httpApi.claimRewardDetails({
      userAddress: this.data.address,
      nftId: details.nftId
    }).subscribe((response) => {
      if (response.isSuccess) {
        this.claimRewardTransaction(response.data, details.nftId, details.total, index);
      }
      else {
        this.lootBoxDetailsAttributes[index].disabled = false;
      }

    })

  }

  async claimRewardTransaction(data: any, nftId, supply: Number, index: any) {
    try {
      //debugger
      var txnstatus: any = await this.walletConnectService.claimRewardTransaction(
        data.junkAmount, nftId, supply, data.id, data.id, data.signHash
      );

      if (txnstatus.status) {
        txnstatus.hash.wait(1);
        this.httpApi.claimRewardTransactionHashUpdate({
          userAddress: this.data.address,
          id: data.id,
          transactionHash: txnstatus.hash.hash
        }).subscribe((response: any) => {
          if (response.isSuccess) {
            this.lootBoxDetailsAttributes[index].isRewardAvailable = false;
            this.httpApi.showToastr(response.data.message, true);
          }
          else {
            this.lootBoxDetailsAttributes[index].disabled = false;
            this.httpApi.showToastr(response.data.message, false);
          }
          //debugger
        })
      }
    }
    catch (e) {
      this.lootBoxDetailsAttributes[index].disabled = false;
    }
  }


  checkNSFWStatus() {
    setInterval(() => {
      this.checkNSFWStatusFromStorage()
    }, 4000);

  }

  checkNSFWStatusFromStorage() {
    let tempstatus = this.httpApi.getNSFWStatus();
    if (this.isNSFWStatus != tempstatus && this.isNSFWStatus != undefined) {
      this.isNSFWStatus = tempstatus;
      this.getUserData();
    }
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
    return false;
  }

  openDialog(data: any) {

    let dialogRef = this.dialog.open(SocialShareComponent, {
      width: 'auto',
      data: { imageUrl: data.logo_path, name: data.name, url: '' }
    });
  }

  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  openTransferDialog(data: any) {
    let dialogRef = this.dialog.open(TransferComponent, {
      width: 'auto',
      data: {
        details: data,
        walletAddress: this.data.address
      }
    });
  }

}