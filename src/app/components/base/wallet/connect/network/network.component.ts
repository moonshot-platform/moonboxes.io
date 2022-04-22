import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { environment } from 'src/environments/environment';
import { CHAIN_CONFIGS } from '../constants/blockchain.configs';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  chains: any;
  chainName: any;
  chainConfigs = CHAIN_CONFIGS;

  constructor(
    public parentDialogRef: MatDialogRef<NetworkComponent>,
    private windowRef: WindowRefService,
    private walletconnect: WalletConnectService
  ) { }

  ngOnInit(): void {
    this.chains = environment.chainId
  }

  async changeChain(config: any,index:any) {
    if (config !== undefined)
      await this.windowRef.nativeWindow.ethereum.request(config);
      this.walletconnect.updateChainId(index);
    this.parentDialogRef.close();
  }

}
