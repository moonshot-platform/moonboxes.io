import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModalForClaimComponent } from './modal-for-claim/modal-for-claim.component';
import { MESSAGES } from 'src/app/messages.enum';
import { WalletConnectComponent } from '../../base/wallet/connect/connect.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class HistoryComponent implements OnInit {

  static readonly routeName: string = 'history';

  readonly messages = MESSAGES;
  mainMessage: string = MESSAGES.IDLE;
  
  address: string = null;
  historyData: any = null;

  page: number = 1;
  maxSize: number = 9;

  isConnected = false;
  
  constructor(
    public toastrService: ToastrService, 
    public httpApiService: HttpApiService, 
    public walletConnectService: WalletConnectService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.walletConnectService.init().then( ( data: string ) => {
      this.isConnected = data !== null;
    });

    this.walletConnectService.getData().subscribe( ( data: any ) => {
      if( data ) {
        if(data.address!=this.address){
        this.address = data.address;
        this.getBidHistory();
        }
      } else
        this.toastrService.error( "Please connect your wallet" );
    });
  }

  getBidHistory() {
    this.httpApiService.getUserBetData( this.address ).subscribe( (response: any) => {
      if ( response.isSuccess )
        this.historyData = response.data;
      else
        this.toastrService.error( "Could not fetch History data" );
    });
  }

  onClaimNFT( data: any, index: number ) {
    this.dialog.open( ModalForClaimComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        nftDetails: data,
        userAddress: this.address
      }
    }).afterClosed().subscribe( result => {
      this.historyData[index].isClaimed = result;
    } );
  }

  openDialog(): void {
    let dialogRef = this.dialog.open( WalletConnectComponent, { width: 'auto' } );

    dialogRef.afterClosed().subscribe( (_) => {
      this.walletConnectService.getData().subscribe((data) => {
        this.isConnected = data.address !== undefined;
      })
    });
  }
}