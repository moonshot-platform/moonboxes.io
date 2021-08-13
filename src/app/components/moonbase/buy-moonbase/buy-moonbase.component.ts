import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
declare let particlesJS: any;
=======
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { ConnetwalletComponent } from '../connetwallet/connetwallet.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ToastrService } from 'ngx-toastr';
import { ModalForTransactionComponent } from '../modal-for-transaction/modal-for-transaction.component';
>>>>>>> Stashed changes

@Component({
  selector: 'app-buy-moonbase',
  templateUrl: './buy-moonbase.component.html',
  styleUrls: ['./buy-moonbase.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class BuyMoonbaseComponent implements OnInit {

  current = 0;
  inputnumber = [];
  isConnected:boolean = false;
  isWrongNetwork:boolean = false;
  static readonly routeName: string = 'buy_moonbase';
<<<<<<< Updated upstream
  constructor() { 
    particlesJS.load('moonbase-particles', 'assets/json/particlesjs-config.json');
=======

  public lootBoxName = ['','Bronze','Silver','Gold','Diamond'];

  public shirts: any = [
    {
      img: 'assets/media/images/moonbox/wood.png',
      name: "Wood",
      value: "0.5B"
    },
    {
      img: 'assets/media/images/moonbox/silver.png',
      name: "Silver",
      value: "1B"
    },
    {
      img: 'assets/media/images/moonbox/gold.png',
      name: "Gold",
      value: "2B"
    },
    {
      img: 'assets/media/images/moonbox/diamond.png',
      name: "Diamond",
      value: "10B"
    }
  ]
  data: any;
  supplyDetails: any;
  balanceOfMoon: any;

  constructor(public walletConnectService:WalletConnectService,public dialog: MatDialog,
    public httpApi:HttpApiService,private toastrService:ToastrService) { 
    this.inputnumber[0]=0;
    this.inputnumber[1]=0;
    this.inputnumber[2]=0;
    this.inputnumber[3]=0;
    this.inputnumber[4]=0;

    this.getMaxSupply();
    
    
>>>>>>> Stashed changes
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
        this.getTransactionReceipt();
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

  getMoonShootBalance()
  {
    this.walletConnectService.getBalanceOfUser(this.data.address)
    .then((response:any)=>
    {
      this.balanceOfMoon=response;
    })
  }

  plus(index:number) {
    debugger
    if(this.supplyDetails[this.lootBoxName[index]]>this.inputnumber[index]){
    this.inputnumber[index] = this.inputnumber[index] + 1;
    }
  }
  minus(index:number) {
    if (this.inputnumber[index] != 1) {
      this.inputnumber[index] = this.inputnumber[index] - 1;
    }
  }

  next() {
    this.current = this.current < this.shirts.length - 1 ? this.current + 1 : 0;
  }

  prev() {
    this.current = this.current > 0 ? this.current - 1 : this.shirts.length - 1;
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

  getMaxSupply()
  {
    this.httpApi.getMaxSupply().subscribe((response:any)=>{
      if(response.isSuccess){
        this.supplyDetails=response.data.data;
        this.inputnumber[0]=1;
        if(this.supplyDetails[this.lootBoxName[1]]>0)
        this.inputnumber[1]=1;
        if(this.supplyDetails[this.lootBoxName[2]]>0)
        this.inputnumber[2]=1;
        if(this.supplyDetails[this.lootBoxName[3]]>0)
        this.inputnumber[3]=1;
        if(this.supplyDetails[this.lootBoxName[4]]>0)
        this.inputnumber[4]=1;
      }
    })
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
   var maxSupply= this.supplyDetails[this.lootBoxName[index]];
   if(maxSupply==0)
   {
     return false;
   }
   if(maxSupply<this.inputnumber[index] || this.inputnumber[index]==0)
   {
     alert("invalid no of bet");
     return false;
  }
  

   this.dialog.open(ModalForTransactionComponent, {
    width: 'auto',
     data: {
       inputNumber : this.inputnumber,
       lootBoxName : this.lootBoxName,
       data : this.data,
       index : index,
       balance : this.balanceOfMoon
     }
  });
  
  
  return true;
    }


    getTransactionReceipt()
    {
      this.walletConnectService.getTransactionReceipt()
      .then((response:any)=>
      {
        console.log(response);
      })
    }
  
}
