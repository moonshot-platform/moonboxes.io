import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { WindowRefService } from './window-ref.service';
import { ethers, BigNumber } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

export const SilverAddress = environment.silverAddress;
export const LootboxAddress = environment.lootboxAddress;
export const NFTAddress = environment.NFTAddress;
export const ArtistNFTAddress = environment.artistNFTAddress;

const providerMainNetURL = environment.providerMainNetURL;
const providerTestNetURL = environment.providerTestNetURL;
const providerChainID = environment.chainId;

const silverTokenAbi = require('./../../assets/abis/silverTokenAbi.json');
const lootBoxAbi = require('./../../assets/abis/lootBoxAbi.json');
const NFTAbi = require('./../../assets/abis/NFTAbi.json');
const ArtistNFTAbi = require('./../../assets/abis/ArtistNFTAbi.json');

//  Create WlletConnect Provider
const providerOptions = {
  rpc: {
    56: providerMainNetURL,
    97: providerTestNetURL,
 },
 network: "binance",
 chainId: providerChainID,
};

const provider = new WalletConnectProvider(providerOptions);

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
  private isConnected = false;
  private account = "";
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
  SilverContract: any;
  LootboxContract: any;
  NFTContract: any;
  artistLootBoxContract : any;

  constructor(private windowRef: WindowRefService, private toastrService:ToastrService) {
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
    var connectedWallet = localStorage.getItem('wallet')?.toString();

    if (connectedWallet == "1") {
      this.connectToWallet(1);
    }
    else if (connectedWallet == "2") {
      this.connectToWalletConnect(1);
    }
  }

  async connectToWallet(origin=0) {
    try {
      if (typeof this.windowRef.nativeWindow.ethereum !== 'undefined' || typeof this.windowRef.nativeWindow.ethereum !== undefined) {
        await this.windowRef.nativeWindow.ethereum.enable();
        this.provider = new ethers.providers.Web3Provider(this.windowRef.nativeWindow.ethereum);
        
        let currentNetwork = await this.provider.getNetwork();
        if(currentNetwork.chainId != providerChainID ) {
          this.toastrService.error("You are on the wrong network");
          throw "Wrong network";
        }
        
        await this.getAccountAddress();
        localStorage.setItem('wallet', '1');
        // Subscribe to accounts change
        this.windowRef.nativeWindow.ethereum.on("accountsChanged", (accounts: string[]) => {
          if(accounts.length == 0) { 
            // MetaMask is locked or the user has not connected any accounts
            console.log("Please connect to metamask");
            this.setWalletDisconnected();
          }
          else {
            this.connectToWallet();
            
          }
        });

        // Subscribe to session disconnection
        this.windowRef.nativeWindow.ethereum.on("networkChanged", (code: number, reason: string) => {
          this.connectToWallet();
          this.setWalletConnected();
        });

        // Subscribe to session disconnection
        this.windowRef.nativeWindow.ethereum.on("disconnect", (code: number, reason: string) => {
          if( provider.close ) {
            provider.close();
          }
          this.setWalletDisconnected();
        });

        this.setWalletConnected();

        if(origin==0)
        {
          location.reload();
        }
       
      }
    } catch(e) {
      this.setWalletDisconnected();
    }

  }

  async connectToWalletConnect(origin=0) {
    
    console.log("connectToWalletConnect ", origin);

    try {
      this.provider = new ethers.providers.Web3Provider(provider);
      await provider.enable();
      
      await this.getAccountAddress();
      localStorage.setItem('wallet', '2');
      // Subscribe to accounts change
      provider.on("accountsChanged", (accounts: string[]) => {
        this.connectToWalletConnect();
      });

      // Subscribe to session disconnection
      provider.on("disconnect", (code: number, reason: string) => {
        this.setWalletDisconnected();
      });

      // Subscribe to session disconnection
      provider.on("networkChanged", (code: number, reason: string) => {
        this.connectToWalletConnect();
        this.setWalletDisconnected();
      });

      this.setWalletConnected();
      if(origin==0)
      {
        location.reload();
      }
    }
    catch(e) {
      console.log(e.message);
      this.setWalletDisconnected();
      location.reload(); // FIXME: Without reloading the page, the WalletConnect modal does not open again after closing it  
     
    }
  }

  async getAccountAddress() {
    this.signer = this.provider.getSigner();
    var address = await this.signer.getAddress();
    var network = await this.provider.getNetwork();

    localStorage.setItem('address', address);

    if (network.chainId == environment.chainId) {
      this.SilverContract = new ethers.Contract(SilverAddress, silverTokenAbi, this.signer);
      this.LootboxContract = new ethers.Contract(LootboxAddress, lootBoxAbi, this.signer);
      this.NFTContract = new ethers.Contract(NFTAddress, NFTAbi, this.signer);
      this.artistLootBoxContract = new ethers.Contract(ArtistNFTAddress,ArtistNFTAbi,this.signer);
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

    this.account = address;
    this.updateData(data);
  }

  async getDetailsMoonboxPrice() {
    var price = await this.LootboxContract.moonboxPrice();
    return price;
  }

  async getDetailsMoonboxlimit() {
    var promise = new Promise((resolve, reject) => {
      try {
        this.LootboxContract.getMoonShootLimit()
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


  async getDetailsMoonboxlimitArtist() {
    var promise = new Promise((resolve, reject) => {
      try {
        this.artistLootBoxContract.getMoonShootLimit()
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
    var lootboxPrice = await this.getDetailsMoonboxPrice();

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
    var lootboxPrice = await this.getDetailsMoonboxPrice();
    const params2 =((noOfBets*Number(lootboxPrice)*1e9).toString());

    var promise = new Promise(async (resolve, reject) => {
      try {
        let tx =await this.SilverContract.approve(LootboxAddress, (params2))
         
          
          resolve({hash:tx,status:true,allowance:false})     
      }
      catch (e) {
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

  redeemBulkTransaction(lootBoxId, price, noOfBets,userAddress) {
    var promise = new Promise((resolve, reject) => {
      try {
        this.LootboxContract.submitBet(lootBoxId, price, noOfBets,{value:(price*noOfBets).toString()})
          .then(function (transactionHash) {
            resolve({ hash: transactionHash.hash, status: true });
          }).catch(function(e){
            reject({ hash: e, status: false });
          })
      }
      catch (e) {
       
        reject({ hash: "", status: false });
        
      }
    });
    return promise
  }

  async getRedeemBulk(id:any,nftAmount:any,bet:number,signature:any,isArtist:boolean,artistAddress:string)
  {
    var promise = new Promise((resolve, reject) => {
      var spliSign=ethers.utils.splitSignature(signature);
    if(isArtist){
      try {
          this.artistLootBoxContract.redeemBulk(NFTAddress, id, nftAmount,artistAddress, bet,spliSign.v,spliSign.r,spliSign.s)
            .then(function (transactionHash) {
              resolve({ hash: transactionHash.hash, status: true });
            }).catch(function(e){
              reject({ hash: e, status: false });
            });
            

        }
        catch (e) {
          console.log(e)
          reject({ hash: "", status: false });
        }
    }
    else
    {
        try {
            this.LootboxContract.redeemBulk(NFTAddress, id, nftAmount, bet,spliSign.v,spliSign.r,spliSign.s)
              .then(function (transactionHash) {
                resolve({ hash: transactionHash.hash, status: true });
              }).catch(function(e){
                reject({ hash: e, status: false });
              });
          }
          catch (e) {
            console.log(e)
            reject({ hash: "", status: false });
          }
       
    }
  });
    
   // address nftAsset, uint256[] calldata id, uint256[] calldata nftAmount, uint256 bet, uint8 v, bytes32 r, bytes32 s
      
      return promise;
  }

  

/** Artist  **/
redeemBulkTransactionArtist(lootBoxId, noOfBets:any,price,artistAddress,signature,betlimit) {
    const params2:any = ethers.utils.parseEther(price.toString());
    var spliSign=ethers.utils.splitSignature(signature);

    var promise = new Promise((resolve, reject) => {
      try {
        this.artistLootBoxContract.submitBet(lootBoxId, params2,artistAddress, noOfBets,betlimit,
          spliSign.v,spliSign.r,spliSign.s,
          {
            value : (params2*noOfBets).toString()
          })
          .then(function (transactionHash) {
            resolve({ hash: transactionHash.hash, status: true });
          }).catch(function(e){
            reject({ hash: e, status: false });
          });
      }
      catch (e) {
        reject({ hash: "", status: false });
      }
    });
    return promise
  }


  /** Artist  **/
  async claimRewardTransaction(junkAmount:any,nftId:any,nftAmount:any,betId:any,seed,signHash:any) {
    var spliSign=ethers.utils.splitSignature(signHash);
    const params2:any = (junkAmount.toString()); 
    var promise = new Promise(async (resolve, reject) => {
      try {
        var txn=await this.LootboxContract.claimReward(params2, NFTAddress,nftId,nftAmount,betId,
          spliSign.v,spliSign.r,spliSign.s)
         .catch(function(e){
            reject({ hash: e, status: false });
          });
          resolve({ hash: txn, status: true });
      }
      catch (e) {
        reject({ hash: "", status: false });
      }
    });
    return promise
  }


  async isApproved(address:any)
  {
    return await this.NFTContract.isApprovedForAll(address,address);
  }

  async setApproval(address:any)
  {
    return await this.NFTContract.setApprovalForAll(address,true);
  }

  async safeTransfer(address:any,toAddress:any,nftId:any)
  {
    return await this.NFTContract.safeTransferFrom(address,toAddress,nftId,1,"0x00");
  }

  isWalletConnected() {
    return this.isConnected;
  }

  getAccount() {
    return this.account;
  }

  setWalletConnected() {
    this.isConnected = true;
  }

  setWalletDisconnected() {
    this.isConnected = false;
    this.account = "";
    localStorage.removeItem('wallet');
  }
}
