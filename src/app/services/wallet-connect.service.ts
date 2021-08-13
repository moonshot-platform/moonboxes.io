import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { WindowRefService } from './window-ref.service';
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";


export const SilverAddress = "0x46192Bd44C9066D425375326808109C7d97a2181";
export const LootboxAddress = "0x7213Affaf6C96a1e1E8A85A2547078819B89D293";
export const NFTAddress = "0xAF85238f41f6cA99d0f9391cBe74Bd7D548c9F53";

const silverTokenAbi = require('./../../assets/abis/silverTokenAbi.json');
const lootBoxAbi = require('./../../assets/abis/lootBoxAbi.json');
const NFTAbi = require('./../../assets/abis/NFTAbi.json');
//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  infuraId: "b0287acccb124ceb8306f3192f9e9c04",
});

@Injectable({
  providedIn: 'root'
})



export class WalletConnectService {
  private toggle = new BehaviorSubject<any>({});
  public data = new BehaviorSubject<any>({});
  private interval: any;
  private serverError: boolean = false;
  public tokenomicsData: any;
  public oldPancakeAddress = true;
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
  SilverContract: any;
  LootboxContract: any;
  NFTContract: any;
  constructor(private windowRef: WindowRefService) {

  }

  onToggle(state?: boolean) {
    this.toggle.next(state);
  }

  whenToggled(): Observable<any> {
    return this.toggle.asObservable();
  }

  updateData(state: any) {
    this.tokenomicsData = state;
    this.data.next(state);

  }

  getData(): Observable<any> {

    return this.data.asObservable();
  }

  init(): void {
    var connectedWallet = localStorage.getItem('wallet').toString();
    if (connectedWallet == "1") {
      this.connectToWallet(1);
    }
    else {
      this.connectToWalletConnect(1);
    }
  }

  async connectToWallet(origin=0) {

    if (typeof this.windowRef.nativeWindow.ethereum !== undefined) {
     await this.windowRef.nativeWindow.ethereum.enable();
      this.provider = new ethers.providers.Web3Provider(this.windowRef.nativeWindow.ethereum)
      await this.getAccountAddress();
      localStorage.setItem('wallet', '1');
      // Subscribe to accounts change
      this.windowRef.nativeWindow.ethereum.on("accountsChanged", (accounts: string[]) => {
        this.connectToWallet();
        location.reload();
      });


      // Subscribe to session disconnection
      this.windowRef.nativeWindow.ethereum.on("networkChanged", (code: number, reason: string) => {
        this.connectToWallet();
        location.reload();
      });
      if(origin==0)
      {
        location.reload();
      }
    }

  }

  async connectToWalletConnect(origin=0) {
    await provider.enable();
    this.provider = new ethers.providers.Web3Provider(provider);
    await this.getAccountAddress();
    localStorage.setItem('wallet', '2');
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts: string[]) => {
      this.connectToWalletConnect();
      location.reload();
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code: number, reason: string) => {

      location.reload();
    });

    // Subscribe to session disconnection
    provider.on("networkChanged", (code: number, reason: string) => {
      this.connectToWalletConnect();
      location.reload();
    });
    if(origin==0)
    {
      location.reload();
    }
  }

  async getAccountAddress() {
    this.signer = this.provider.getSigner();
    var address = await this.signer.getAddress();

    var network = await this.provider.getNetwork();

    localStorage.setItem('address', address);
    if (network.chainId == 97) {
      this.SilverContract = new ethers.Contract(SilverAddress, silverTokenAbi, this.signer);
      this.LootboxContract = new ethers.Contract(LootboxAddress, lootBoxAbi, this.signer);
      this.NFTContract = new ethers.Contract(NFTAddress, NFTAbi, this.signer);
    }
    var data = {
      'provider': this.provider,
      'signer': this.signer,
      'silverContract': this.SilverContract,
      'LootboxContract': this.LootboxContract,
      'nftContract': this.NFTContract,
      'address': address,
      'networkId': network
    }

    this.updateData(data);
  }

  async getDetailsLootboxPrice(lootBoxId) {
    var promise = new Promise((resolve, reject) => {
      try {

        this.LootboxContract.lootboxPrice(lootBoxId)
          .then(function (transactionHash) {
            resolve(transactionHash);
          })
      }
      catch (e) {
        reject(false);
      }
    });
    return promise
  }

  async getDetailsLootboxAddress(lootBoxId) {
    var promise = new Promise((resolve, reject) => {
      try {

        this.LootboxContract.lootboxPaymentToken(lootBoxId)
          .then(function (transactionHash) {
            resolve(transactionHash);
          })
      }
      catch (e) {
        reject(false);
      }
    });
    return promise
  }

  async getTransactionHashForAllowance(lootBoxId, noOfBets,userAddress) {
    var lootboxPrice = await this.getDetailsLootboxPrice(lootBoxId);

    var promise = new Promise((resolve, reject) => {
      try {
    const params2 =((noOfBets*Number(lootboxPrice)*1e9).toString());
      let that=this;
      this.SilverContract.allowance(userAddress, LootboxAddress)
      .then(async function (allowanceAmount) {
        if(allowanceAmount>=params2){
          resolve({ hash: "", status: true,allowance:true });
        }
        else{
        
          resolve({hash:"",status:true,allowance:false})
        }
        })
        
      }
      catch (e) {
        reject({ hash: "", status: false });
      }
    });
    return promise
  }

  async approveSilverToken(lootBoxId, noOfBets,userAddress)
  {
    var lootboxPrice = await this.getDetailsLootboxPrice(lootBoxId);
    const params2 =((noOfBets*Number(lootboxPrice)*1e9).toString());

    var promise = new Promise(async (resolve, reject) => {
      try {
        let tx =await this.SilverContract.approve(LootboxAddress, (params2))
         
          
          resolve({hash:tx,status:true,allowance:false})     
      }
      catch (e) {
        debugger
        reject({ hash: "", status: false });
      }
    });
    return promise
  }

  async getBalanceOfUser(userAddress:any)
  {
    var promise = new Promise((resolve, reject) => {
      this.SilverContract.balanceOf(userAddress).then(function (params:any) {
          resolve(params)
      })
    });
    return promise;
  }

  async getTransactionHashForBetSubmit(lootBoxId, seed, noOfBets,userAddress) {
  var status:any =   await this.getTransactionHashForAllowance(lootBoxId,noOfBets,userAddress);
    if(!status.allowance){  
      await status.hash.wait(1);
     status = await this.redeemBulkTransaction(lootBoxId, seed, noOfBets,userAddress);
    }else if(status.status){
      status = await this.redeemBulkTransaction(lootBoxId, seed, noOfBets,userAddress);
    }
    return status;
  }

  redeemBulkTransaction(lootBoxId, seed, noOfBets,userAddress) {
    var promise = new Promise((resolve, reject) => {
      try {
        this.LootboxContract.submitBet(lootBoxId, seed, noOfBets)
          .then(function (transactionHash) {
            resolve({ hash: transactionHash.hash, status: true });
          })
      }
      catch (e) {
        reject({ hash: "", status: false });
      }
    });
    return promise
  }

  

  async getRedeemBulk(id:any,nftAmount:any,bet:number,signature:any)
  {

    var spliSign=ethers.utils.splitSignature(signature);
   // address nftAsset, uint256[] calldata id, uint256[] calldata nftAmount, uint256 bet, uint8 v, bytes32 r, bytes32 s
      var promise = new Promise((resolve, reject) => {
      try {
        debugger
          this.LootboxContract.redeemBulk(NFTAddress, id, nftAmount, bet,spliSign.v,spliSign.r,spliSign.s)
            .then(function (transactionHash) {
              resolve({ hash: transactionHash.hash, status: true });
            })
        }
        catch (e) {
          console.log(e)
          reject({ hash: "", status: false });
        }
      });
      return promise;
  }

  async getTransactionReceipt()
  {
    const receipt = await this.provider.getTransactionReceipt("0xecb67e83e47ed6b91384022294c3ddbee695440bd1f74e4c78730b32fd902b07");
    
    return receipt;
  }
}
