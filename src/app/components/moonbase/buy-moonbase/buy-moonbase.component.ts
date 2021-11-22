import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';

import { ModalForTransactionComponent } from '../modal-for-transaction/modal-for-transaction.component';
import { environment } from './../../../../environments/environment';

import { ToastrService } from 'ngx-toastr';
import { WalletConnectComponent } from '../../base/wallet/connect/connect.component';
import { AdminMoonbox, Supply } from 'src/app/models/admin-moonbox.model';
import { Moonbox } from 'src/app/models/moonbox.model';

@Component({
  selector: 'app-buy-moonbase',
  templateUrl: './buy-moonbase.component.html',
  styleUrls: ['./buy-moonbase.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class BuyMoonbaseComponent implements OnInit {

  static readonly routeName: string = 'buy_moonbase';

  current = 0;

  supply: Moonbox[];
  inputnumber = [];
  
  readonly boxTypes = [ 'wood', 'silver', 'gold', 'diamond' ]

  isConnected: boolean = false;
  isWrongNetwork: boolean = false;
  invisible: boolean = false;
  popupClosed: boolean = false;
  
  public isTooltipActive: boolean[] = [false, false, false, false];

  data: any;
  balance: any;
  moonBoxLimitDetails: any;
  maxSupply = [];
  fadeOut: boolean = false;
  priceForMoonBox = 0;

  constructor(
    public walletConnectService: WalletConnectService, 
    private toastrService:ToastrService,
    public dialog: MatDialog,
    public httpApi: HttpApiService
  ) { }

  ngOnInit(): void {
    this.walletConnectService.init();

    
    this.walletConnectService.onWalletStateChanged().subscribe( (state: boolean) => this.isConnected = state );
    this.walletConnectService.getData().subscribe((data) => {
      if (data !== undefined && data.address != undefined && data != this.data) {
        this.data = data;        

        if (this.data.networkId.chainId != environment.chainId) {
          this.isWrongNetwork = true;
          this.toastrService.error("You are on the wrong network");
        }
        else {
          this.getMoonShootBalance();
        }
      } 
    });

    this.getMaxSupply();
  }

  async getBoxPrices() {
    try {
      this.moonBoxLimitDetails = await this.walletConnectService.getDetailsMoonboxlimit();

      let priceForMoonBoxTemp: any = await this.walletConnectService.getDetailsMoonboxPrice();
      this.priceForMoonBox = priceForMoonBoxTemp / 1e18;
    } catch (e) {
      console.error(e)
    }
  }

  async getMoonShootBalance() {
    this.balance = await this.walletConnectService.getUserBalance( this.data.address );
    this.getBoxPrices();
  }

  next( by: number ) {
    const boxes = this.boxTypes.length;
    this.current = ( this.current + by ) - boxes * Math.floor( ( this.current + by ) / boxes);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(WalletConnectComponent, { width: 'auto' });

    dialogRef.afterClosed().subscribe((result) => {
      this.walletConnectService.getData().subscribe((data) => {
        this.data = data;
        this.isConnected = (data.address !== undefined)
      });
    });
  }

  getMaxSupply() {
    this.httpApi.getMaxSupply(
      this.data?.address
    ).subscribe((response: AdminMoonbox) => {
      
      if (response.isSuccess) {
        this.supply = response.data.get();
        
        this.supply.forEach((item: Moonbox) => {
          this.inputnumber.push( item.currentSupply >= 1 ? 1 : 0 );
        });
        
        
      } else this.httpApi.showToastr( 'Couldn\'t get max supply, please try again later', false );
    })
  }

  buyMoonBase(index: number) {
    if (this.data === undefined || this.data.address === undefined)
      this.openDialog();
    else
      this.submitBetToContract(index);
  }

  async submitBetToContract(index: number) {
    const maxSupply = this.supply[index].currentSupply;
    if ( maxSupply === 0 ) return false;

    if( Number( this.balance ) < Number( this.moonBoxLimitDetails[index] ) ) {
      this.httpApi.showToastr( 'You are not eligible for this Tier', false );
      return false;
    }
    
    if ( this.inputnumber[index] > maxSupply || this.inputnumber[index] == 0) {
      this.httpApi.showToastr( 'Invalid no of bet', false );
      return false;
    }

    this.invisible = true;
    this.fadeOut = true;

    let dialogRef = this.dialog.open( ModalForTransactionComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        inputNumber: this.inputnumber[index],
        lootBoxName: this.supply[index].type,
        data: this.data,
        index: index,
        balance: this.balance,
        isArtistLootBox: false
      },
      panelClass: 'custom-modalbox'
    } );

    dialogRef.afterClosed().subscribe(result => {
      this.invisible = false;
      // this.getMaxSupply();
      this.fadeOut = false;
      this.popupClosed = true;
    });

    return true;
  }

  trackByFn(index: number, item: any) {
    return item;
  }
}