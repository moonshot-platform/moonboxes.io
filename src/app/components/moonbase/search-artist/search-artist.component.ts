import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { ConnetwalletComponent } from '../connetwallet/connetwallet.component';

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.scss','./../intro/intro.component.scss']
})
export class SearchArtistComponent implements OnInit {

  static readonly routeName: string = 'search_artist';
 
  current = 0;
  inputnumber = [];
  isConnected:boolean = false;
  isWrongNetwork:boolean = false;

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

  constructor(public walletConnectService:WalletConnectService,public dialog: MatDialog) { 
    this.inputnumber[0]=1;
    this.inputnumber[1]=1;
    this.inputnumber[2]=1;
    this.inputnumber[3]=1;
    this.inputnumber[4]=1;

    
    
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
      }
      else
      {
        this.isConnected = false;
      }
    }, 1000);
  }

  plus(index:number) {
    this.inputnumber[index] = this.inputnumber[index] + 1;
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
      var transactionDetails=await this.walletConnectService.getTransactionHashForBetSubmit(index,123213123,this.inputnumber[index]);



  
    }
  
}
