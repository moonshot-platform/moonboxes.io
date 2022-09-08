import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DeployContractService } from 'src/app/services/deploy-contract.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  addArtistForm: FormGroup ;
  submitted: boolean = false;
  transactionInitiated: boolean = false;
  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>,private fb:FormBuilder,private apiService:HttpApiService, private contractService:WalletConnectService,private deployContract:DeployContractService) { }

  ngOnInit(): void {
    this.addArtistForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      userName: ['', Validators.compose([Validators.required])],
      walletAddress: ['', Validators.compose([Validators.required])],
      collectionName: ['', Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.addArtistForm.controls;
  }

  onSubmit(){
    var data = {
      walletAddress: this.addArtistForm.controls.walletAddress.value,
    }
    console.log(this.addArtistForm.value);


    this.apiService.isUserAdded(data).subscribe(
      (response: any) => {
        if (response.status == 200 && response.isSuccess) {
          this.apiService.showToastr(response.data.message, false);
          this.transactionInitiated = false;
          this.submitted = false;
        }
        else {
          this.isValidData();
        }


      }, (error) => {
        console.log(error);
        this.apiService.showToastr('something went wrong', false);
        this.transactionInitiated = false;
        this.submitted = false;
      });
    
  }


  async isValidData() {
    var deployStatus: any;
    this.transactionInitiated = true;
    deployStatus = await this.deployContract.deploy(this.contractService, this.addArtistForm.controls.walletAddress.value, this.addArtistForm.controls.collectionName.value);
    if (deployStatus.status) {
      this.getTransactionStatus(deployStatus.deployedAddress);
    }
    else {
      this.apiService.showToastr("contract not uploaded", false);
      this.transactionInitiated = false;
    }

  }


  async getTransactionStatus(ArtistNFTAddress: string) {
    var data = {
      name: this.addArtistForm.controls.name.value,
      userName: this.addArtistForm.controls.userName.value,
      walletAddress: this.addArtistForm.controls.walletAddress.value,
      // password:this.addArtistForm.controls.password.value,
      ArtistNFTAddress: ArtistNFTAddress
    }
    this.apiService.addArtist(data).subscribe(
      (response: any) => {
        this.apiService.showToastr(response.data.message, response.isSuccess);
        this.addArtistForm.reset();
        this.transactionInitiated = false;
        this.submitted = false;
        this.closeModal();
      }, (error) => {
        console.log(error);
        this.apiService.showToastr('something went wrong', false);
        this.transactionInitiated = false;
        this.submitted = false;
      });
  }

  closeModal(){
    this.dialogRef.close();
  }
}
