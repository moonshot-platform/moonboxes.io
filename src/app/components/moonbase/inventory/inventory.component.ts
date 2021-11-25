import { Component, OnInit, TemplateRef } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SocialShareComponent } from '../modal-for-transaction/social-share/social-share.component';
import { TransferComponent } from '../modal-for-transaction/transfer/transfer.component';
import { Observable, Observer } from 'rxjs';
import { MESSAGES } from 'src/app/messages.enum';
import { WalletConnectComponent } from '../../base/wallet/connect/connect.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  static readonly routeName: string = 'inventory';

  readonly messages = MESSAGES;
  mainMessage: string = MESSAGES.IDLE;

  data: any;
  inventoryList: any;

  base64Image: any;
  
  lootBoxDetails = [];
  NFTDetails: any;
  
  NSFWToggleState = false;
  isConnected = false;

  selectedIndex: number;

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
    
    this.walletConnectService.init().then( ( data: string ) => {
      this.isConnected = data !== null;
    });
      
    this.walletConnectService.onWalletStateChanged().subscribe( (state: boolean) => {
      this.isConnected = state
    } );
      
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

    let tempIndex: number;
    item['properties'].forEach((property: any, i: number) => {
      if( property.hasOwnProperty('key') ) {
          if( property.key === 'Rarity Score' ) {
            item['rarity'] = `Rarity score: ${property.value}`;
            tempIndex = i;
          }
      }

      if( property.hasOwnProperty('probability') ) {
        Object.defineProperty(
          property, 'rarity', 
          Object.getOwnPropertyDescriptor(property, 'probability')
        );
        delete property['probability'];
      }
    });

    item['properties'].splice(tempIndex, 1);

    this.NFTDetails = item;
    this.selectedIndex = index;
    
    
    setTimeout(() => {
      this.scrollToElement('', 'attribute-info');
    }, 100);
  }

  closeAttributes() {
    this.NFTDetails = null;
  }

  fileTypeIsImage(url: string) {
    if( !url ) return false;
    
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

  openWalletDialog(): void {
    let dialogRef = this.dialog.open( WalletConnectComponent, { width: 'auto' } );

    dialogRef.afterClosed().subscribe( (_) => {
      this.walletConnectService.getData().subscribe((data) => {
        this.isConnected = data.address !== undefined;
      })
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