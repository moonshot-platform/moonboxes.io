import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { rejects } from 'assert';
import { ethers } from 'ethers';
import { WalletConnectComponent } from 'src/app/components/base/wallet/connect/connect.component';
import { DeployContractService } from 'src/app/services/deploy-contract.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  addArtistForm: FormGroup;
  submitted: boolean = false;
  transactionInitiated: boolean = false;
  formType = 'step1';
  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>, private fb: FormBuilder, private apiService: HttpApiService, private contractService: WalletConnectService, private deployContract: DeployContractService,
    private localStorageService: LocalStorageService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.addArtistForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      symbol: ['', Validators.compose([Validators.required])],
      userName: ['', Validators.compose([Validators.required])],
      walletAddress: ['', Validators.compose([Validators.required])],
      collectionName: ['', Validators.compose([Validators.required])]
    });

    this.addArtistForm.controls.walletAddress.valueChanges.subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.checkValidAddress(res);
        }

      }
    })

    this.addArtistForm.patchValue({
      walletAddress: this.localStorageService.getAddress()
    })
  }



  checkValidAddress(address: any) {

    if (ethers.utils.isAddress(address)) {
      this.addArtistForm.controls.walletAddress.setErrors(null);
    } else {
      this.addArtistForm.controls.walletAddress.setErrors({ incorrect: true });
    }

  }




  get f() {
    return this.addArtistForm.controls;
  }

  async onSubmit() {
    this.transactionInitiated = true;
    let obj = { username: this.addArtistForm.value.userName, wallet_address: this.addArtistForm.value.walletAddress, blockchain_id: localStorage.getItem(this.localStorageService.chainId) }


    this.apiService.postRequest(`user_name_exist`, obj).subscribe({
      next: async (res: any) => {
        if (res.is_already_exist) {
          this.formType = 'step3';
        } else {
          let status;
          status = await this.contractService.registorCheck({
            name: this.addArtistForm.value.name, symbol: this.addArtistForm.value.symbol, username: this.addArtistForm.value.userName,
            collectionName: this.addArtistForm.value.collectionName,walletAddress:this.addArtistForm.value.walletAddress
          });


          if (status.status) {
            await status.hash.wait(3);
            this.transactionInitiated = false;
            this.formType = 'step2';

          } else {
            this.transactionInitiated = false;

          }
        }
      },
      error: (err: any) => {

      }
    })














    ////////////////////////////////////////////////////////////
    // this.apiService.isUserAdded(data).subscribe(
    //   (response: any) => {
    //     if (response.status == 200 && response.isSuccess) {
    //       this.apiService.showToastr(response.data.message, false);
    //       this.transactionInitiated = false;
    //       this.submitted = false;
    //     }
    //     else {
    //       this.isValidData();
    //     }


    //   }, (error) => {
    //     console.log(error);
    //     this.apiService.showToastr('something went wrong', false);
    //     this.transactionInitiated = false;
    //     this.submitted = false;
    //   });



  }


  async isValidData() {
    var deployStatus: any;
    this.transactionInitiated = true;
    deployStatus = await this.deployContract.deploy(this.contractService, this.addArtistForm.controls.walletAddress.value, this.addArtistForm.controls.collectionName.value, this.addArtistForm.controls.symbol.value);
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

  closeModal() {
    this.dialogRef.close();
  }

  gotoAdminpanel() {
    window.open(environment.adminPanelUrl, '_blank')
  }
}
