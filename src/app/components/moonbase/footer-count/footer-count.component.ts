import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetailsProvider } from 'src/app/services/user-details.provider';
import { UserDetailsModel } from 'src/app/models/user-details.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
  moonBoxLimitDetails: any = [];
  eligibleTier = "-";
  messages: any[] = [];
  subscription: Subscription;
  bgChange: boolean = false;

  constructor(
    private walletConnectService: WalletConnectService,
    private httpApi: HttpApiService,
    private userProvider: UserDetailsProvider,
    private localStorage: LocalStorageService
  ) {
    this.userProvider.onShare(<UserDetailsModel>{});
    this.subscription = this.httpApi.getMessage().subscribe(message => {
      this.bgChange = message.text;
    });
  }

  ngOnInit(): void {
    this.walletConnectService.getData().subscribe((data) => {
      if (data != undefined && data.address != undefined && this.data != data) {
        this.data = data;
        this.isConnected = true;
        // this.localStorage.get();
        // if (this.data.networkId.chainId == environment.chainId[0]) {
        this.getMoonShootBalance();
        // }
      }
    });
  }

  async getTier(moonBalance: number) {
    const tiers = [
      "Wood",
      "Silver",
      "Gold",
      "Diamond"
    ];

    this.moonBoxLimitDetails = await this.walletConnectService.getDetailsMoonboxlimit();

    for (let i = 3; i >= 0; i--) {

      if (moonBalance >= Number(this.moonBoxLimitDetails[i])) {
        this.eligibleTier = tiers[i]
        break;
      }
    }
  }

  async getMoonShootBalance() {

    const balance = await this.walletConnectService.getUserBalance(this.data.address);

    await this.getTier(balance);

    this.moonCountData = (await this.httpApi.getMoonCount(this.data.address)).data;

    this.balance = this.walletConnectService.convertBalance(balance);

    const userData = new UserDetailsModel(this.data.address, balance);

    this.userProvider.onShare(userData);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
