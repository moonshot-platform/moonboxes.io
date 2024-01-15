import { Component, OnInit, TemplateRef } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MESSAGES } from 'src/app/messages.enum';
import { WalletConnectComponent } from '../../base/wallet/connect/connect.component';
import { ItemOverviewComponent } from '../../base/dialogs/item-overview/item-overview.component';
import { NftMigrationComponent } from '../dialogs/nft-migration/nft-migration.component';

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
  NFTDetails: any;

  NSFWToggleState = false;
  isConnected = false;
  tabs: any = [];
  selectedIndex: number;
  nftMigrationDialogRef: any;
  IsNftMigrated: boolean = false;
  userAddress: any;
  nftCountToSwap: any;
  SwapNftCount: any;
  addressName:any={};
  constructor(
    private walletConnectService: WalletConnectService,
    private httpApi: HttpApiService,
    private localStorage: LocalStorageService,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    this.NSFWToggleState = this.localStorage.getNSFW();
    this.userAddress = this.localStorage.get('address');

    this.localStorage.whenNSFWToggled().subscribe((NSFWToggleState) => {
      this.NSFWToggleState = NSFWToggleState;
    });

    this.walletConnectService.init().then((data: boolean) => {
      this.isConnected = data;
      this.getUserData01();
    });

    this.walletConnectService.onWalletStateChanged().subscribe((state: boolean) => {
      this.isConnected = state;
    });

    this.walletConnectService.getData().subscribe(async (data:any) => {
      if (this.data === undefined || this.data.address != data.address) {
        this.data = data ?? {};
        this.addressName = await this.walletConnectService.spaceAddress(this.data?.address);

        if (Object.keys(this.data).length > 0)
          this.getUserData();
        else
          this.mainMessage = MESSAGES.NO_WALLET_DATA_FROM_SERVER;
      }

    });
   
  }

  getUserData() {
    const data = {
      userAddress: this.data.address,
      NSFW: true
    };

    this.httpApi.getUserInventory(data).then((response: any) => {
      const { isSuccess, status } = response;

      if (isSuccess && (status === 200 || status === 204)) {
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
      if (property.hasOwnProperty('key')) {
        if (property.key === 'Rarity Score') {
          item['rarity'] = `Rarity score: ${property.value}`;
          tempIndex = i;
        }
      }

      if (property.hasOwnProperty('probability')) {
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
    if (!url) return false;

    const images = ['jpg', 'gif', 'png', 'jpeg', 'JPG', 'GIF', 'PNG', 'JPEG']
    const videos = ['mp4', '3gp', 'ogg', 'MP4', '3GP', 'OGG']

    const urltemp = new URL(url)
    const extension = urltemp.pathname.substring(urltemp.pathname.lastIndexOf('.') + 1)

    if (images.includes(extension)) {
      return "true"
    } else if (videos.includes(extension)) {
      return false;
    }
    return true;
  }

  openWalletDialog(): void {
    let dialogRef = this.dialog.open(WalletConnectComponent, { width: 'auto' });

    dialogRef.afterClosed().subscribe((_) => {
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

  trackByFn(index, item) {
    return item.title;
  }

  viewDetails(item: any, index: number): void {

    let tempIndex: number;
    item['properties'].forEach((property: any, i: number) => {
      if (property.hasOwnProperty('key')) {
        if (property.key === 'Rarity Score') {
          item['rarity'] = `Rarity score: ${property.value}`;
          tempIndex = i;
        }
      }

      if (property.hasOwnProperty('probability')) {
        Object.defineProperty(
          property, 'rarity',
          Object.getOwnPropertyDescriptor(property, 'probability')
        );
        delete property['probability'];
      }
    });

    item['properties'].splice(tempIndex, 1);

    item['address'] = this.data.address;

    this.NFTDetails = item;
    this.selectedIndex = index;

    this.dialog.open(ItemOverviewComponent, { width: '100%', maxWidth: '1000px', data: item });
  }



  openNftMigrationDialog() {
debugger
    this.nftMigrationDialogRef = this.dialog.open(NftMigrationComponent, {
      width: '800px',
      data: { data: this.tabs, swapCount: this.SwapNftCount, nftCountToSwap: this.nftCountToSwap },
    });
  }



  getUserData01() {
    let url = "userDataCount?userAddress=" + this.userAddress;
    this.httpApi.getRequest(url).subscribe(async (res: any) => {
      if (res.status == 200) {
        this.IsNftMigrated = res.IsNftMigrated;
        if (!this.IsNftMigrated) {
          // this.toastrService.success("minted");
          this.nftCountToSwap = res.nftCountToSwap;
          this.SwapNftCount = res.SwapNftCount;
          await this.getBannerUser()
          this.openNftMigrationDialog();
        }
      }
    }, (err: any) => {
      this.toastrService.error("something went wrong with user data count");
    })
  }

  getBannerUser() {
    let promis = new Promise((resolve, reject) => {
      let url = "userSwappingData?userAddress=" + this.userAddress;
      this.httpApi.getRequest(url).subscribe((res: any) => {
        if (res.status == 200) {
          this.tabs = res.data;
          resolve(this.tabs)
        }
        else {

        }
      }, (err: any) => {
        reject(err);
      })
    });

    return promis;
  }
}
