import { Component } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-wallet-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class WalletConnectComponent {
  
  constructor(
    private walletConnectService: WalletConnectService,
    public parentDialogRef : MatDialogRef<WalletConnectComponent>
  ) { }

  async connectToMetamask() {
    this.parentDialogRef.close();
    this.walletConnectService.connectToWallet(); 
  }

  async connectToWalletConnect() {
    this.parentDialogRef.close();
    this.walletConnectService.connectToWalletConnect();
  }
}
