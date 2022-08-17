import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpApiService } from 'src/app/services/http-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';

@Component({
  selector: 'app-disconnect-wallet',
  templateUrl: './disconnect-wallet.component.html',
  styleUrls: ['./disconnect-wallet.component.scss']
})
export class DisconnectWalletComponent implements OnInit {
  tabs: any = [];
  @ViewChild('tabGroup') tabGroup;
  userAddress: any;
  swapCount: any;
  nftCountToSwap: any;
  IsNftMigrated: any;

  constructor(
    public dialogRef: MatDialogRef<DisconnectWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private walletConnectService: WalletConnectService,
  ) { }

  ngOnInit(): void {

  }

  Disconnected()
  {
    this.walletConnectService.setWalletDisconnected();
    window.location.reload();
  }


  closeDialog() {
    this.dialogRef.close();
  }



}
