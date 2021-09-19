import { Component, OnInit, TemplateRef } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ConnetwalletComponent } from '../../connetwallet/connetwallet.component';
import { ModalForTransactionComponent } from '../../modal-for-transaction/modal-for-transaction.component';

@Component({
  selector: 'app-artist-moonbox',
  templateUrl: './artist-moonbox.component.html',
  styleUrls: ['./artist-moonbox.component.scss']
})
export class ArtistMoonboxComponent implements OnInit {
  current = 0;
  inputnumber = [];
  isConnected: boolean = false;
  isWrongNetwork: boolean = false;
  popupClosed: boolean = false;
  fadeOut: boolean = false;
  static readonly routeName: string = 'artist_moonbase/:artistAddress';


  public lootBoxDetails: any = [];
  public lootboxfloating = ['wood','silver','gold','diamond']
  data: any;
  supplyDetails: any = [];
  balanceOfMoon: any;
  artistAddress: string;
  artistDetails: any;
  moonBoxLimitDetails: any;
  invisible: boolean = false;

  constructor(public walletConnectService: WalletConnectService, public dialog: MatDialog,
    public httpApi: HttpApiService, private activatedRoute: ActivatedRoute) {
      this.lootBoxDetails=httpApi.lootBoxDetails;
    this.inputnumber[0] = 0;
    this.inputnumber[1] = 0;
    this.inputnumber[2] = 0;
    this.inputnumber[3] = 0;
    this.inputnumber[4] = 0;

    this.artistAddress = this.activatedRoute.snapshot.paramMap.get("artistAddress")

  }

  ngOnInit(): void {
    this.walletConnectService.init();

    setTimeout(async () => {
      await this.walletConnectService.getData().subscribe((data) => {
        this.data = data;
      });

      if (this.data !== undefined && this.data.address != undefined) {
        this.isConnected = true;
        if (this.data.networkId.chainId != 97) {
          this.isWrongNetwork = true;
        }
        this.getMoonShootBalance();
        
      }
      else {
        this.isConnected = false;
      }
      this.getMaxSupply();
    }, 1000);
    
  }

  async getMoonShootBalance() {
    this.walletConnectService.getBalanceOfUser(this.data.address)
      .then((response: any) => {
        this.balanceOfMoon = response;
      });

      this.moonBoxLimitDetails = await this.walletConnectService.getDetailsMoonboxlimitArtist();
  }

  plus(index: number) {
    
    if (this.supplyDetails[index - 1].currentSupply > this.inputnumber[index]) {
      this.inputnumber[index] = this.inputnumber[index] + 1;
    }
  }
  minus(index: number) {
    if (this.inputnumber[index] != 1) {
      this.inputnumber[index] = this.inputnumber[index] - 1;
    }
  }

  next() {
    this.current = this.current < this.lootBoxDetails.length - 1 ? this.current + 1 : 0;
  }

  prev() {
    this.current = this.current > 0 ? this.current - 1 : this.lootBoxDetails.length - 1;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ConnetwalletComponent, {
      width: 'auto',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.walletConnectService.getData().subscribe((data) => {
        this.data = data;
        if (this.data.address !== undefined) {
          this.isConnected = true;
        }
        else {
          this.isConnected = false;
        }
      })
    });
  }

  getMaxSupply() {
    
    this.httpApi.getArtistMoonboxData(this.artistAddress,this.data.address).subscribe((response: any) => {
      if (response.isSuccess) {
        this.supplyDetails = response.data;
        this.artistDetails = response;
        
        this.inputnumber[0] = 1;
        if (this.supplyDetails[0].currentSupply > 0)
          this.inputnumber[1] = 1;
        if (this.supplyDetails[1].currentSupply > 0)
          this.inputnumber[2] = 1;
        if (this.supplyDetails[2].currentSupply > 0)
          this.inputnumber[3] = 1;
        if (this.supplyDetails[3].currentSupply > 0)
          this.inputnumber[4] = 1;
      }
    })
  }

  buyMoonBase(index: number) {
    if (this.data === undefined || this.data.address === undefined) {
      this.openDialog();
    }
    else {
      this.submitBetToContract(index);
    }
  }

  async submitBetToContract(index: number) {
    var maxSupply = this.supplyDetails[index - 1].currentSupply;
    if (maxSupply == 0) {
      return false;
    }
    if (maxSupply < this.inputnumber[index] || this.inputnumber[index] == 0) {
      alert("invalid no of bet");
      return false;
    }
    var moonShootLimit = this.moonBoxLimitDetails[index-1];
   if(Number(this.balanceOfMoon)<Number(moonShootLimit))
   {
     this.httpApi.showToastr("Lower token balance ",false)
     return false;
   }

    const isUpcoming = this.supplyDetails[index]?.isUpcoming;
    if(isUpcoming)
    {
      return false;
    }
    this.invisible = true;
    this.fadeOut = true;

    let dialogRef = this.dialog.open(ModalForTransactionComponent, {
      width: 'auto',
      disableClose : true,
      data: {
        inputNumber: this.inputnumber,
        lootBoxName: this.lootBoxDetails[index-1].name,
        data: this.data,
        index: index,
        balance: this.balanceOfMoon,
        isArtistLootBox: true,
        artistDetails: {
          lootBoxId: this.supplyDetails[index - 1].id,
          price: this.supplyDetails[index - 1].price,
          address: this.artistDetails.walletAddress,
          signature: this.supplyDetails[index - 1].signature
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
