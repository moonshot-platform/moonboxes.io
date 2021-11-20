import { Component, OnInit, TemplateRef } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ModalForTransactionComponent } from '../../modal-for-transaction/modal-for-transaction.component';
import { environment } from 'src/environments/environment';
import { WalletConnectComponent } from 'src/app/components/base/wallet/connect/connect.component';
import { Artist, Supply } from 'src/app/models/artist.model';

@Component({
  selector: 'app-artist-moonbox',
  templateUrl: './artist-moonbox.component.html',
  styleUrls: ['./artist-moonbox.component.scss']
})
export class ArtistMoonboxComponent implements OnInit {
  
  current = 0;

  readonly boxTypes = [
    'wood',
    'silver',
    'gold',
    'diamond'
  ]

  supply: number[] = [];
  
  isConnected: boolean = false;
  isWrongNetwork: boolean = false;
  popupClosed: boolean = false;
  fadeOut: boolean = false;
  static readonly routeName: string = 'artist_moonbase/:artistAddress';


  public lootBoxDetails: any = [];
  data: any;
  supplyDetails: Supply[] = [];
  balance: any;
  artistDetails: Artist;
  moonBoxLimitDetails: any;
  invisible: boolean = false;

  constructor(public walletConnectService: WalletConnectService, private toastrService:ToastrService, public dialog: MatDialog,
    public httpApi: HttpApiService, private activatedRoute: ActivatedRoute) {
    this.lootBoxDetails = httpApi.lootBoxDetails;
  }

  ngOnInit(): void {
    this.walletConnectService.init();

    setTimeout( async () => {
      this.walletConnectService.getData().subscribe((data) => {
        if( data != undefined && data.address != undefined && this.data != data ) {
          this.data = data;
          this.isConnected = this.walletConnectService.isWalletConnected();
          
          if (this.data.networkId.chainId != environment.chainId) {
            this.isWrongNetwork = true;
            this.toastrService.error("You are on the wrong network");
          } else this.getMoonShootBalance();
        }
       
        this.getMaxSupply();
      });
    }, 1000 );
    
  }

  async getMoonShootBalance() {
    this.balance = await this.walletConnectService.getUserBalance( this.data.address );
    this.moonBoxLimitDetails = await this.walletConnectService.getDetailsMoonboxlimit(true);
  }

  onIncreaseSupplyInterestAmount(index: number) {
    this.supply[index] += this.supply[index] < this.supplyDetails[index].currentSupply ? 1 : 0;
  }

  onDecreaseSupplyInterestAmount(index: number) {
    this.supply[index] -= this.supply[index] > 1 ? 1 : 0;
  }

  next( by: number ) {
    const boxes = this.lootBoxDetails.length;
    this.current = ( this.current + by ) - boxes * Math.floor( ( this.current + by ) / boxes);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open( WalletConnectComponent, { width: 'auto' } );

    dialogRef.afterClosed().subscribe( (_) => {
      this.walletConnectService.getData().subscribe((data) => {
        this.data = data;
        this.isConnected = this.data.address !== undefined;
      })
    });
  }

  getMaxSupply() {
    this.httpApi.getArtistMoonboxData(
      this.activatedRoute.snapshot.params['artistAddress'],
      this.data?.address
    ).subscribe((response: Artist) => {
      if (response.isSuccess) {
        this.artistDetails = response;
        this.supplyDetails = this.artistDetails.data;

        this.supplyDetails.forEach((item: Supply) => {
          this.supply.push( item.hasSupply() ? 1 : 0 );
        });
        
      }
    })
  }

  buyMoonBase(index: number) {
    if (this.data === undefined || this.data.address === undefined)
      this.openDialog();
    else
      this.submitBetToContract(index);
  }

  async submitBetToContract(index: number) {
    const item: Supply = this.supplyDetails[index];

    if( item.currentSupply === 0 ) return false;

    if ( !item.canBuyWithinSupplyAmount( this.supply[index] ) ) {
      this.httpApi.showToastr( 'Invalid no of bet', false );
      return false;
    }

    if( Number( this.balance ) < Number( this.moonBoxLimitDetails[index] ) ) {
      this.httpApi.showToastr( 'You are not eligible for this Tier', false );
      return false;
    }

    if ( this.supplyDetails[index]?.isUpcoming )
      return false;

    this.invisible = true;
    this.fadeOut = true;

    console.log('asd');
    

    let dialogRef = this.dialog.open( ModalForTransactionComponent, {
      width: 'auto',
      disableClose : true,
      data: {
        inputNumber: this.supply[index],
        lootBoxName: this.lootBoxDetails[index].name,
        data: this.data,
        index: index,
        balance: this.balance,
        isArtistLootBox: true,
        artistDetails: {
          lootBoxId: this.supplyDetails[index].id,
          price: this.supplyDetails[index].price,
          address: this.artistDetails.walletAddress,
          signature: this.supplyDetails[index].signature,
          limit : this.supplyDetails[index].limitPerTxn
        }
      },
      panelClass: 'custom-modalbox'
    });

     dialogRef.afterClosed().subscribe(result => {
       this.getMaxSupply();
       this.invisible = false;
       this.fadeOut = result;
       this.popupClosed = true;
    });


    return true;
  }

  openDialogWithTemplateRef (templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

}