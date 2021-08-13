import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-connetwallet',
  templateUrl: './connetwallet.component.html',
  styleUrls: ['./connetwallet.component.scss']
})
export class ConnetwalletComponent implements OnInit {
  data: any;

  constructor(private walletConnectService:WalletConnectService,
    public parentDialogRef : MatDialogRef<ConnetwalletComponent>,) { }

  ngOnInit(): void {
   
  }

  async connectToMetamask()
  {
     await this.walletConnectService.connectToWallet();
     this.parentDialogRef.close()
  }

  connectToWalletConnect()
  {
      this.walletConnectService.connectToWalletConnect();
  }



}
