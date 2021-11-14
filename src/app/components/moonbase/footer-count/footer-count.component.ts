import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer-count',
  templateUrl: './footer-count.component.html',
  styleUrls: ['./footer-count.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class FooterCountComponent implements OnInit {
  data: any;
  isConnected: boolean = false;
  balance: any = "-";
  moonCountData: any;
  moonBoxLimitDetails: any;
  eligibleTier = "-";
  messages: any[] = [];
  subscription: Subscription;
  bgChange: boolean = false;

  constructor(private walletConnectService: WalletConnectService,
    private httpApi: HttpApiService) {
    this.subscription = this.httpApi.getMessage().subscribe(message => {
      this.bgChange = message.text;
    });
  }

  ngOnInit(): void {
    setTimeout(async () => {
      this.walletConnectService.getData().subscribe((data) => {
        if (data != undefined && data.address != undefined && this.data != data) {
          this.data = data;
          this.isConnected = true;
          if (this.data.networkId.chainId == environment.chainId) {
            this.getMoonShootBalance();
          }
        }
      });


    }, 1000);
  }

  async getTier(moonBalance: number) {
    const tiers = [
      "Wood",
      "Silver",
      "Gold",
      "Diamond"
    ];
    
    this.moonBoxLimitDetails = await this.walletConnectService.getDetailsMoonboxlimit();
    for( let i = this.moonBoxLimitDetails.length - 1; i >= 0; i-- ) {
      if( moonBalance >= Number(this.moonBoxLimitDetails[i]) ) {
        this.eligibleTier = tiers[i]
        break;
      }
    }
  }

  async convertBalanceWithDecimals( balance: number ) {
    this.balance = balance / 1e9;
    this.balance = Math.trunc(this.balance);
    this.balance = this.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async getMoonShootBalance() {
    const balance = Number( await this.walletConnectService.getBalanceOfUser(this.data.address) );
    
    await this.getTier( balance );

    this.moonCountData = (await this.httpApi.getMoonCount(this.data.address)).data;
    
    this.convertBalanceWithDecimals( balance );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
