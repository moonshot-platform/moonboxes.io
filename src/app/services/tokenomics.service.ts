import { Injectable } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { Observable, Subject } from 'rxjs';

import Web3 from 'web3';

import pancakeABI from '../../assets/web3/pancake-abi.json';
import ssABI from '../../assets/web3/ss-abi.json';
import mshotTokenABI from '../../assets/abis/mshot.token.abi.json';

@Injectable({
  providedIn: 'root'
})
export class TokenomicsService {
  private toggle = new Subject<any>();
  private data = new Subject<any>();
  private interval: any;
  private serverError: boolean = false;
  public tokenomicsData: any;
  public oldPancakeAddress = true;

  onToggle(state?: boolean) {
    this.toggle.next(state);
  }

  whenToggled(): Observable<any> {
    return this.toggle.asObservable();
  }

  onShare(state: any) {
    this.tokenomicsData = state;
    this.data.next(state);
  }

  whenShared(): Observable<any> {
    return this.data.asObservable();
  }

  init(): void {
    try {
      this.getTokenomicsData().then(() => {
        this.interval = setInterval(() => this.getTokenomicsData(), 5000);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getTokenomicsData() {
    var web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443');
    var web3 = new Web3(web3Provider);

    var panCakeRouter = new web3.eth.Contract(pancakeABI as any, "0x10ED43C718714eb63d5aA57B78B54704E256024E");
    var ssRouter = new web3.eth.Contract(mshotTokenABI as any, "0x5298AD82dD7C83eEaA31DDa9DEB4307664C60534");

    const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    const MOON = "0x5298AD82dD7C83eEaA31DDa9DEB4307664C60534";
    const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

    const amount = web3.utils.toWei("1");

    const busdPAir = await panCakeRouter.methods.getAmountsOut(amount, [WBNB, BUSD]).call();
    const uniTotalOutputSell = await panCakeRouter.methods.getAmountsOut(amount, [WBNB, MOON]).call();

    const totalSupply = await ssRouter.methods.totalSupply().call();
    const deadBalance = await ssRouter.methods.balanceOf("0x000000000000000000000000000000000000dead").call();
    const vestedBalance = await ssRouter.methods.balanceOf("0x02b2106e64d63d1dd3d4d6ec26bfa795193c9807").call();
    const v1Distribution = await ssRouter.methods.balanceOf("0x02b2106e64d63d1dd3d4d6ec26bfa795193c9807").call();
    // console.log("v1Distribution :" + v1Distribution);

    const totalSupplyBN = web3.utils.toBN(totalSupply);
    const deadSupplyBN = web3.utils.toBN(deadBalance);
    const vestedBalanceBN = web3.utils.toBN(vestedBalance);

    const circSupply = totalSupplyBN.sub(deadSupplyBN).sub(vestedBalanceBN);

    const circ = Math.round(Number(web3.utils.fromWei(circSupply.toString(), 'nanoether')));
    const dead = Math.round(Number(web3.utils.fromWei(deadBalance, 'nanoether')));
    const oneBNB = Math.round(Number(web3.utils.fromWei(uniTotalOutputSell[1], 'nanoether')));
    const price1bnb = Math.round(Number(web3.utils.fromWei(busdPAir[1], 'micro')));
    const priceFor1BNB = (price1bnb / oneBNB).toString();
    const priceFor1ss = priceFor1BNB.replace(".0", ".0000000");

    fetch("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT")
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {

        var data = {
          'circulatingSupply': this.formatAmount(circ),
          'burnedAmount': this.formatAmount(dead),
          'priceFor1BNB': this.formatAmount(oneBNB),
          'marketcap': this.formatAmount(Math.round(circ / oneBNB * myJson.price)),
          'priceFor1mMoonshot': priceFor1BNB,
          'priceForMoonshot': priceFor1ss,
          'unclaimedMoonshot': this.formatAmount(vestedBalance),
          'v1Distirubition': this.formatAmount(v1Distribution)
        }


        this.onShare(data);

      }).catch(function (e) {
        console.log(e);
        this.serverError = true;
      }
      ).finally(() => {
        if (this.serverError) clearInterval(this.interval)
      });
  }

  formatAmount(amount: any) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
