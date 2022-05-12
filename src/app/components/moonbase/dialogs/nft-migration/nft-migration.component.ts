import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-nft-migration',
  templateUrl: './nft-migration.component.html',
  styleUrls: ['./nft-migration.component.scss'],
})
export class NftMigrationComponent implements OnInit {
  tabs: any = [];
  @ViewChild('tabGroup') tabGroup;
  userAddress: any;

  constructor(
    public dialogRef: MatDialogRef<NftMigrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpapiservice: HttpApiService,
    private localstorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.userAddress = this.localstorage.get('address');
    this.tabs = this.data.data;  
  }



  migrate(){

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
