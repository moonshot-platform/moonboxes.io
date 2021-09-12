import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SocialShareComponent } from '../modal-for-transaction/social-share/social-share.component';

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
  inventoryListUpcoming: any;
  lootBoxDetails = [];
  lootBoxDetailsAttributes = [];
  lootBoxDetailsAttributesMobile = [];
  isNSFWStatus = false;
 
  constructor(private walletConnectService:WalletConnectService,
    private httpApi:HttpApiService,private toastrService:ToastrService,
    public dialog: MatDialog) { 
      this.lootBoxDetails = httpApi.lootBoxDetails;
    }

  ngOnInit(): void {
    this.walletConnectService.init();
    this.isNSFWStatus = this.httpApi.getNSFWStatus();
    this.checkNSFWStatus();
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
    this.httpApi.getUserInventory({
      userAddress : this.data.address,
      nsfwstatus : this.isNSFWStatus
    }).subscribe((response:any)=>{
      if(response.isSuccess){
        this.inventoryList=response.data.data;
      }
      else
      {
        this.toastrService.error("something went wrong");
      }
    });

    this.httpApi.getuserUpcomingNft({
      userAddress : this.data.address,
      nsfw : this.isNSFWStatus
    }).subscribe((response:any)=>{
      if(response.isSuccess){
        this.inventoryListUpcoming=response.data.data;
        
      }
      else
      {
        this.toastrService.error("something went wrong");
      }
    });
  }

  

  getImagePath(type)
  {
      if(type=="Wood")
      {
        return this.lootBoxDetails[0].img;
      }
      else if(type=="Silver")
      {
        return this.lootBoxDetails[1].img;
      }
      else if(type=="Gold")
      {
        return this.lootBoxDetails[2].img;
      }
      else 
      {
        return this.lootBoxDetails[3].img;
      }
  }

  setSelected(index:number,item:any)
  {
    this.lootBoxDetailsAttributes=[];
    this.lootBoxDetailsAttributes[index]=item;
    this.lootBoxDetailsAttributes[index].disabled = false;
  }

  setSelectedMobile(index:number,item:any)
  {
    this.lootBoxDetailsAttributesMobile =[];
    this.lootBoxDetailsAttributesMobile[index]=item;
    this.lootBoxDetailsAttributesMobile[index].disabled = false;
  }

  closeAttributes()
  {
    this.lootBoxDetailsAttributes=[];
    this.lootBoxDetailsAttributesMobile=[];
  }

  claimReward(details:any,event:any,index:any)
  {
    this.lootBoxDetailsAttributes[index].disabled = true;
    
    this.httpApi.claimRewardDetails({
      userAddress : this.data.address,
      nftId : details.nftId
    }).subscribe((response)=>{
      if(response.isSuccess)
      {
        this.claimRewardTransaction(response.data,details.nftId,details.total,index);
      }
      else{
        this.lootBoxDetailsAttributes[index].disabled = false;
      }

    })
  
  }

  async claimRewardTransaction(data:any,nftId,supply:Number,index:any)
  {
    try{
      
      var txnstatus:any = await this.walletConnectService.claimRewardTransaction(
        data.junkAmount,nftId,supply,data.id,data.id,data.signHash
      );

      if(txnstatus.status)
      {
        txnstatus.hash.wait(1);
            this.httpApi.claimRewardTransactionHashUpdate({
              userAddress:this.data.address,
              id:data.id,
              transactionHash:txnstatus.hash.hash
            }).subscribe((response:any)=>
            {
                if(response.isSuccess)
                {
                  this.lootBoxDetailsAttributes[index].isRewardAvailable = false;
                  this.httpApi.showToastr(response.data.message,true);
                }
                else{
                  this.lootBoxDetailsAttributes[index].disabled = false;
                  this.httpApi.showToastr(response.data.message,false);
                }
                
            })
      }
    }
    catch(e)
    {
      this.lootBoxDetailsAttributes[index].disabled = false;
    }
  }


  checkNSFWStatus()
  {
    setInterval(() => {
      this.checkNSFWStatusFromStorage()
    }, 4000);
    
  }

  checkNSFWStatusFromStorage()
  {
    let tempstatus = this.httpApi.getNSFWStatus();
      if(this.isNSFWStatus!=tempstatus)
      {
        this.isNSFWStatus = tempstatus;
        this.getUserData();
      }
  }

  checkFileType(url:string)
  {
    const images = ["jpg", "gif", "png","jpeg"]
    const videos = ["mp4", "3gp", "ogg"]

    const urltemp = new URL(url)
    const extension = urltemp.pathname.substring(urltemp.pathname.lastIndexOf('.') + 1)
    
    if (images.includes(extension)) {
      return "true"
    } else if (videos.includes(extension)) {
      return false;
    }
    return false;
  }

  openDialog(imagePath:string) {
    let dialogRef = this.dialog.open(SocialShareComponent, {
      width: 'auto',
       data: { name: imagePath }
    });
  }  

}
