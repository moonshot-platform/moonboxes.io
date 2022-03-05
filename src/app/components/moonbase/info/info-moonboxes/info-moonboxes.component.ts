import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletConnectComponent } from 'src/app/components/base/wallet/connect/connect.component';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';

@Component({
  selector: 'app-info-moonboxes',
  templateUrl: './info-moonboxes.component.html',
  styleUrls: ['./info-moonboxes.component.scss']
})
export class InfoMoonboxesComponent implements OnInit {

  private userData: any;

  bnbCountFromInput: number = 1;
  isConnected: boolean = false;
  isInProcess: boolean = false;

  buttonName = '';

  boxes: any[] = [
    {
      "img": "assets/media/images/moonbox/landing/wood.png",
      "name": "Wood",
      "quantity": "0,5B",
    },
    {
      "img": "assets/media/images/moonbox/landing/silver.png",
      "name": "Silver",
      "quantity": "1B",
    },
    {
      "img": "assets/media/images/moonbox/landing/gold.png",
      "name": "Gold",
      "quantity": "2B",
    },
    {
      "img": "assets/media/images/moonbox/landing/diamond.png",
      "name": "Diamond",
      "quantity": "10B",
    }
  ];
  boxIndex = 0;
  boxForMobile: any = this.boxes[this.boxIndex];


  constructor(
    private walletConnectService: WalletConnectService,
    private dialog: MatDialog
  ) {
    this.walletConnectService.init().then((data: any) => {
      this.isConnected = data !== undefined;
      this.walletConnectService.setWalletState(this.isConnected);
      // console.log('CONSTRUCTOR: ' + this.isConnected);

      this.updateButtonName();
    });

    this.updateButtonName();
  }

  ngOnInit(): void {
  }

  updateButtonName() {
    if (!this.isConnected) {
      this.buttonName = 'Connect Wallet';
    } else {
      this.buttonName = 'Market Buy';
    }
  }

  openWalletConnectionDialog(): void {
    let dialogRef = this.dialog.open(
      WalletConnectComponent,
      { width: 'auto' }
    );

    dialogRef.afterClosed().subscribe(result => { });
  }

  async buyMSHOTWithBNB() {
    if (this.isConnected) {
      this.isInProcess = true;

      // await this.walletConnectService.addMoonshotTokentToWalletAsset();

      await this.walletConnectService.buyMSHOT(
        Number(this.bnbCountFromInput) <= 0 ? 0.001 : Number(this.bnbCountFromInput)
      );

      this.isInProcess = false;
    } else {
      this.openWalletConnectionDialog();
    }
  }

  nextBox(): void {
    if (this.boxIndex < this.boxes.length) {
      this.boxIndex++;
    } else {
      this.boxIndex = 0;
    }
    this.boxForMobile = this.boxes[this.boxIndex];
  }
  prevBox(): void {
    if (this.boxIndex >= 0) {
      this.boxIndex--;
    } else {
      this.boxIndex = this.boxes.length - 1;
    }
    this.boxForMobile = this.boxes[this.boxIndex];
  }

  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
