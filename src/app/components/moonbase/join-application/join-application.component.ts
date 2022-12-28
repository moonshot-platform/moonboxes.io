import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WalletConnectComponent } from '../../base/wallet/connect/connect.component';
import { AddUserDialogComponent } from '../ArtistLootBox/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-join-application',
  templateUrl: './join-application.component.html',
  styleUrls: ['./join-application.component.scss']
})
export class JoinApplicationComponent implements OnInit {

  constructor(private localStorage: LocalStorageService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }



  openDialoagOfAddUser(){
    let wallet =  this.localStorage.getWallet();
    if(wallet == 1 || wallet == 2){
      this.dialog.open(AddUserDialogComponent,{width:'500px',disableClose:true}).afterClosed().subscribe({
        next:(res:any)=>{}
      })
    }else{
      this.dialog.open(WalletConnectComponent,{width: 'auto'})
    }
   
  }
}
