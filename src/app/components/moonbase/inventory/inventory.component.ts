import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss','./../moonbase.component.scss', './../intro/intro.component.scss']
})
export class InventoryComponent implements OnInit {
  static readonly routeName: string = 'inventory';
  data: any;
  isConnected:boolean = false;
  inventoryList: any;
  p: number = 1;
  maxSize:number = 9;
 
  constructor(private walletConnectService:WalletConnectService,
    private httpApi:HttpApiService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.walletConnectService.init();

    setTimeout(async() => {
      await this.walletConnectService.getData().subscribe((data)=>{
        this.data=data;
      });
      
      if(this.data!==undefined && this.data.address!=undefined)
      {
        this.isConnected=true;
        this.getUserData();
      }
      else
      {
        this.isConnected = false;
      }
    }, 1000);
  }

  getUserData()
  {
    this.httpApi.getUserInventory(this.data.address).subscribe((response:any)=>{
      if(response.isSuccess){
        this.inventoryList=response.data.data;
      }
      else
      {
        this.toastrService.error("something wen wrong");
      }
    });
  }

  

}
