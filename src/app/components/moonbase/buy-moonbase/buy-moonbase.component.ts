import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { ConnetwalletComponent } from '../connetwallet/connetwallet.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';

import { ModalForTransactionComponent } from '../modal-for-transaction/modal-for-transaction.component';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-buy-moonbase',
  templateUrl: './buy-moonbase.component.html',
  styleUrls: ['./buy-moonbase.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class BuyMoonbaseComponent implements OnInit {

  current = 0;
  inputnumber = [];
  public lootboxfloating = ['wood','silver','gold','diamond']
  isConnected:boolean = false;
  isWrongNetwork:boolean = false;
  invisible: boolean = false;
  static readonly routeName: string = 'buy_moonbase';


  public lootBoxDetails: any =[];

  
  data: any;
  supplyDetails: any;
  balanceOfMoon: any;
  moonBoxLimitDetails: any;
  maxSupply = [];

  constructor(public walletConnectService:WalletConnectService,public dialog: MatDialog,
    public httpApi:HttpApiService) {
    this.lootBoxDetails=httpApi.lootBoxDetails;
    this.inputnumber[0]=0;
    this.inputnumber[1]=0;
    this.inputnumber[2]=0;
    this.inputnumber[3]=0;
    this.inputnumber[4]=0;

    this.getMaxSupply();
  }

  ngOnInit(): void {
    this.walletConnectService.init();

    setTimeout(async() => {
      await this.walletConnectService.getData().subscribe((data)=>{
        this.data=data;
      });

      if(this.data!==undefined && this.data.address!=undefined)
      {
        this.isConnected=true;
        if(this.data.networkId.chainId!=97)
        {
          this.isWrongNetwork=true;
        }
        this.getMoonShootBalance();
      }
      else
      {
        this.isConnected = false;
      }
    }, 1000);
  }

  async getMoonShootBalance()
  {
    this.walletConnectService.getBalanceOfUser(this.data.address)
    .then((response:any)=>
    {
      this.balanceOfMoon=response;
    });

    this.moonBoxLimitDetails = await this.walletConnectService.getDetailsMoonboxlimit();
    
  }

  plus(index:number) {
    return false;
    if(this.supplyDetails[this.lootBoxDetails[index-1].name]>this.inputnumber[index]){
    this.inputnumber[index] = this.inputnumber[index] + 1;
    }
  }
  minus(index:number) {
    return false;
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
      this.walletConnectService.getData().subscribe((data)=>{
        this.data=data;
        if(this.data.address!==undefined)
        {
          this.isConnected=true;
        }
        else
        {
          this.isConnected=false;
        }
      })
    });
  }

  async getMaxSupply()
  {
    this.httpApi.getMaxSupply().subscribe((response:any)=>{
      if(response.isSuccess){
        this.supplyDetails=response.data.data;
        if(this.supplyDetails[this.lootBoxDetails[0].name]>0)
        this.inputnumber[1]=1;
        if(this.supplyDetails[this.lootBoxDetails[1].name]>0)
        this.inputnumber[2]=1;
        if(this.supplyDetails[this.lootBoxDetails[2].name]>0)
        this.inputnumber[3]=1;
        if(this.supplyDetails[this.lootBoxDetails[3].name]>0)
        this.inputnumber[4]=1;

        this.maxSupply[0]=this.supplyDetails[this.lootBoxDetails[0].name];
        this.maxSupply[1]=this.supplyDetails[this.lootBoxDetails[1].name];
        this.maxSupply[2]=this.supplyDetails[this.lootBoxDetails[2].name];
        this.maxSupply[3]=this.supplyDetails[this.lootBoxDetails[3].name];
      }
    });

    
  }

  buyMoonBase(index : number)
  {
      if(this.data===undefined || this.data.address===undefined)
      {
        this.openDialog();
      }
      else
      {
          this.submitBetToContract(index);
      }
  }

  async submitBetToContract(index:number){
   var maxSupply= this.supplyDetails[this.lootBoxDetails[index-1].name];
   if(maxSupply==0)
   {
     return false;
   }
   var moonShootLimit = this.moonBoxLimitDetails[index-1];
   if(Number(this.balanceOfMoon)<Number(moonShootLimit))
   {
     this.httpApi.showToastr("Lower token balance ",false)
     return false;
   }
   if(maxSupply<this.inputnumber[index] || this.inputnumber[index]==0)
   {
     alert("invalid no of bet");
     return false;
  }

  this.invisible = true;

  let dialogRef = this.dialog.open(ModalForTransactionComponent, {
    width: 'auto',
    disableClose : true,
     data: {
       inputNumber : this.inputnumber,
       lootBoxName : this.lootBoxDetails[index-1].name,
       data : this.data,
       index : index,
       balance : this.balanceOfMoon,
       isArtistLootBox : false
     }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.invisible = false;
    });

  return true;
    }



}
