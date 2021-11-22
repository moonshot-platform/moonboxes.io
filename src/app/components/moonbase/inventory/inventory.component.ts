import { Component, OnInit, TemplateRef } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SocialShareComponent } from '../modal-for-transaction/social-share/social-share.component';
import { TransferComponent } from '../modal-for-transaction/transfer/transfer.component';
import { Observable, Observer } from 'rxjs';

enum MESSAGES {
  IDLE = 'Connecting wallet',
  EMPTY_WALLET = 'No MoonBase NFTs found in your wallet.',
  UNABLE_TO_CONNECT = 'Unable to connect to your wallet. Please check your wallet network and try again.',
  NO_WALLET_DATA_FROM_SERVER = 'Could not receive wallet data from the server.',
};

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  static readonly routeName: string = 'inventory';

  data: any;
  inventoryList: any;

  base64Image: any;
  
  lootBoxDetails = [];
  lootBoxDetailsAttributes = [];
  
  NSFWToggleState = false;
  isConnected = false;

  selectedIndex: number;
  mainMessage: string = MESSAGES.IDLE;

  constructor(
    private walletConnectService: WalletConnectService,
    private httpApi: HttpApiService, 
    private localStorage: LocalStorageService,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.NSFWToggleState = this.localStorage.getNSFW();

    this.localStorage.whenNSFWToggled().subscribe( (NSFWToggleState) => {
      this.NSFWToggleState = NSFWToggleState;
    } );
    
    this.walletConnectService.init();
    
    this.walletConnectService.onWalletStateChanged().subscribe( (state: boolean) => this.isConnected = state );
      
    this.walletConnectService.getData().subscribe((data) => {
      this.data = data ?? {};

      if( Object.keys(this.data).length > 0 ) {
        this.getUserData();
      } else {
        this.mainMessage = MESSAGES.NO_WALLET_DATA_FROM_SERVER;
      }
    });
  }

  getUserData() {
    this.httpApi.getUserInventory({
      userAddress: this.data.address,
      nsfwstatus: true
    }).then((response: any) => {
      const {isSuccess, status} = response;

      if (isSuccess && status === 200) {
        this.inventoryList = response.data.data ?? [];
        this.mainMessage = this.inventoryList.length == 0 ? MESSAGES.EMPTY_WALLET : null;
      } else {
        this.toastrService.error("something went wrong");
      }
    });
  }

  setSelected(index: number, item: any) {
    this.lootBoxDetailsAttributes = [];
    this.lootBoxDetailsAttributes[index] = item;
    this.lootBoxDetailsAttributes[index].disabled = false;
    this.selectedIndex = index;

    if( this.lootBoxDetailsAttributes[index].hasOwnProperty('rarityScore') ) {
      const score = this.lootBoxDetailsAttributes[index].rarityScore;
      this.lootBoxDetailsAttributes[index].rarity = `Rarity score: ${score}`;
    }
    
    setTimeout(() => {
      this.scrollToElement('', 'attribute-info');
    }, 100);
  }

  closeAttributes() {
    this.lootBoxDetailsAttributes = [];
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
      const txnstatus: any = await this.walletConnectService.claimRewardTransaction(
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

  fileTypeIsImage(url: string) {
    const images = ['jpg', 'gif', 'png', 'jpeg', 'JPG', 'GIF', 'PNG', 'JPEG']
    const videos = ['mp4', '3gp', 'ogg', 'MP4', '3GP', 'OGG']

    const urltemp = new URL(url)
    const extension = urltemp.pathname.substring(urltemp.pathname.lastIndexOf('.') + 1)

    if (images.includes(extension)) return true;

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
    this.dialog.open(TransferComponent, {
      width: 'auto',
      data: {
        details: data,
        walletAddress: this.data.address
      }
    });
  }

  public downloadImage(data: any) {
    this.getBase64ImageFromURL(data.logo_path).subscribe(base64data => {

      this.base64Image = 'data:image/jpg;base64,' + base64data;

      const link = document.createElement("a");

      document.body.appendChild(link); // for Firefox

      if (data.logo_path.slice(-3) == 'gif') {
        link.setAttribute("href", data.logo_path);
        link.setAttribute("download", `${data.name}.gif`);
      } else {
        link.setAttribute("href", this.base64Image);
        link.setAttribute("download", `${data.name}.jpg`);
      }
      link.click();
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  trackByFn(index, item) {
    return item.title;
  }

}