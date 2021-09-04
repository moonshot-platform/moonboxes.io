import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer-count',
  templateUrl: './footer-count.component.html',
  styleUrls: ['./footer-count.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class FooterCountComponent implements OnInit {
  data: any;
  isConnected: boolean = false;
  balanceOfMoon: any = 0;
  moonCountData: any;
  moonBoxLimitDetails: any;
  eligibleTier = "-";
  messages: any[] = [];
  subscription: Subscription;
  bgChange : boolean = false;

  constructor(private walletConnectService: WalletConnectService,
    private httpApi: HttpApiService) {
    this.subscription = this.httpApi.getMessage().subscribe(message => {
        this.bgChange = message.text;
        console.log(this.bgChange);
    });
  }

  ngOnInit(): void {
    this.walletConnectService.init();

    setTimeout(async () => {
      await this.walletConnectService.getData().subscribe((data) => {
        this.data = data;
      });

      if (this.data !== undefined && this.data.address != undefined) {
        this.isConnected = true;
        this.getMoonShootBalance();
      }
    }, 1000);
  }

  async getMoonShootBalance() {
    this.balanceOfMoon = await this.walletConnectService.getBalanceOfUser(this.data.address);

    this.httpApi.getMoonCount(this.data.address)
      .subscribe((response: any) => {
        this.moonCountData = response.data;
      });

    this.moonBoxLimitDetails = await this.walletConnectService.getDetailsMoonboxlimit();

    if (Number(this.balanceOfMoon) >= Number(this.moonBoxLimitDetails[3])) {
      this.eligibleTier = "Diamond";
    }
    else if (Number(this.balanceOfMoon) >= Number(this.moonBoxLimitDetails[2])) {
      this.eligibleTier = "Silver";
    }
    else if (Number(this.balanceOfMoon) >= Number(this.moonBoxLimitDetails[1])) {
      this.eligibleTier = "Gold";
    }
    else {
      this.eligibleTier = "Wood";
    }


  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
