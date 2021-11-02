import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-wallet-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class WalletConnectComponent implements OnInit {
  data: any;

  constructor(private walletConnectService:WalletConnectService,
    public parentDialogRef : MatDialogRef<WalletConnectComponent>,) { }

  ngOnInit(): void {
   
  }

  async connectToMetamask()
  {
    this.parentDialogRef.close();
    await this.walletConnectService.connectToWallet(); 
  }

  async connectToWalletConnect()
  {
    this.parentDialogRef.close();
    await this.walletConnectService.connectToWalletConnect();
  }

}
