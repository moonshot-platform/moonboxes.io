import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  constructor(
    private walletConnectService: WalletConnectService,
    public parentDialogRef : MatDialogRef<ConnectComponent>,
  ) { }

  ngOnInit(): void {}

  async connectToMetamask() {
     await this.walletConnectService.connectToWallet();
     this.parentDialogRef.close()
  }

  connectToWalletConnect() {
      this.walletConnectService.connectToWalletConnect();
  }

}
