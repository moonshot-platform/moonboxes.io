import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletConnectComponent } from './connect.component';
import { NetworkComponent } from './network/network.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    WalletConnectComponent,
    NetworkComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WalletConnectComponent
  ]
})
export class WalletConnectModule {}
