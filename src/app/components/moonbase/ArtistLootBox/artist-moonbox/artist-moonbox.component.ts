import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ModalForTransactionComponent } from '../../modal-for-transaction/modal-for-transaction.component';
import { environment } from 'src/environments/environment';
import { WalletConnectComponent } from 'src/app/components/base/wallet/connect/connect.component';
import { ArtistMoonbox, Supply } from 'src/app/models/artist-moonbox.model';
import { MESSAGES } from 'src/app/messages.enum';
import { UserDetailsProvider } from 'src/app/services/user-details.provider';
import { UserDetailsModel } from 'src/app/models/user-details.model';
import { SwiperOptions } from 'swiper';
import { CollectionOverviewComponent } from 'src/app/components/base/dialogs/collection-overview/collection-overview.component';

@Component({
  selector: 'app-artist-moonbox',
  templateUrl: './artist-moonbox.component.html',
  styleUrls: ['./artist-moonbox.component.scss']
})
export class ArtistMoonboxComponent implements OnInit {

  static readonly routeName: string = 'artist/:artistAddress';

  slides: any[] = [];
  artistData: any;
  removeitemIndex: any[] = [];
  isgetMaxSupplyCall = false;

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    effect: 'fade',
    allowTouchMove: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      pauseOnMouseEnter: true,
    },
    speed: 3000,
    freeMode: {
      enabled: false,
      sticky: true,
    },
    grabCursor: false,
    loop: true,
    coverflowEffect: {
      depth: 500,
      slideShadows: false,
      rotate: -40,
      stretch: 100,
    },
  };

  swiperConfigMobile: SwiperOptions = {
    slidesPerView: 3,
    effect: 'coverflow',
    direction: 'horizontal',
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 1000,
    centerInsufficientSlides: true,
    freeMode: {
      enabled: false,
      sticky: true,
    },
    grabCursor: true,
    initialSlide: 3,
    loop: true,
    coverflowEffect: {
      depth: 400,
      slideShadows: false,
      rotate: 0,
      stretch: 0,
    },
    breakpoints: {
      700: {
        slidesPerView: 3,
      },
      600: {
        slidesPerView: 3,
      },
      500: {
        slidesPerView: 2.4,
      },
      300: {
        slidesPerView: 1.5,
      },
      200: {
        slidesPerView: 1.5,
      }

    }

  };


  readonly messages = MESSAGES;
  mainMessage: string = MESSAGES.IDLE;

   boxTypes = ["wood", "silver", "gold", "diamond"]

  current = 0;
  supply: number[] = [];

  isConnected: boolean = false;
  popupClosed: boolean = false;
  fadeOut: boolean = false;
  invisible: boolean = false;

  public lootBoxDetails: any = [];
  data: any;
  supplyDetails: Supply[];
  balance: number;
  artistDetails: ArtistMoonbox;
  moonBoxLimitDetails: any;
  public infoHoverList: any[] = [
    {
      "isHovered": false,
      "tooltipText": "You need 0 Moonshot token\nto open a Wood MoonBox."
    },
    {
      "isHovered": false,
      "tooltipText": "You need 75,000,000,000 Moonshot tokens to open a Silver MoonBox."
    },
    {
      "isHovered": false,
      "tooltipText": "You need 150,000,000,000 Moonshot tokens to open a Gold MoonBox."
    },
    {
      "isHovered": false,
      "tooltipText": "You need 250,000,000,000 Moonshot tokens to open a Diamond MoonBox."
    },
  ];
  chainId: number;

  pageLoader :boolean =false;
  constructor(
    public walletConnectService: WalletConnectService,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    public httpApi: HttpApiService,
    private activatedRoute: ActivatedRoute,
    private userProvider: UserDetailsProvider,
    private changeDetectionRef: ChangeDetectorRef
  ) {
    this.lootBoxDetails = httpApi.lootBoxDetails;

    this.getSliderImages();
  }

  ngOnInit(): void {
    this.walletConnectService.init();

    this.walletConnectService.onWalletStateChanged().subscribe((state: boolean) => this.isConnected = state);
    this.walletConnectService.getData().subscribe((data) => {

      if (data === undefined || data.address === undefined) {
        this.mainMessage = MESSAGES.UNABLE_TO_CONNECT;
        return;
      }

      if (environment.chainId.indexOf(data.networkId.chainId) == -1) {
        this.mainMessage = MESSAGES.UNABLE_TO_CONNECT;
        return;
      }

      this.data = data;
    });

    this.walletConnectService.getChainId().subscribe((data) => {
      this.chainId = data;
    });

    this.userProvider.onReceive().subscribe((userData: any) => {

      this.balance = userData.balance;



      this.getMoonboxTierLimits();
    }, (error) => { console.log(error); });

    if (!this.isConnected) {

    }
    this.getMaxSupply();
  }

  hasEnoughMoonshots(index: number) {

    if (this.balance != null && this.moonBoxLimitDetails != null) {
      return (Number(this.balance) >= Number(this.moonBoxLimitDetails[index]));
    }

    return false;
  }

  async getMoonboxTierLimits() {
    if (this.balance >= 0) {

      this.moonBoxLimitDetails = await this.walletConnectService.getDetailsMoonboxlimit(this.artistDetails.walletAddress == environment.ownerAddress ? false : true);
      // console.log(this.moonBoxLimitDetails.length)
      for (let i = 0; i < 4; i++) {
        this.infoHoverList[i].tooltipText = "You need " + (this.moonBoxLimitDetails[i] / 1e18).toLocaleString('en-us', { minimumFractionDigits: 0 }) + " Moonshot token\nto open a " + this.boxTypes[i] + " MoonBox.";
      }
    }

  }

  onIncreaseSupplyInterestAmount(index: number) {
    this.supply[index] += this.supply[index] < this.supplyDetails[index].currentSupply ? 1 : 0;
  }

  onDecreaseSupplyInterestAmount(index: number) {
    this.supply[index] -= this.supply[index] > 1 ? 1 : 0;
  }

  next(by: number) {
    const boxes = this.lootBoxDetails.length;
    this.current = (this.current + by) - boxes * Math.floor((this.current + by) / boxes);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(WalletConnectComponent, { width: 'auto' });

    dialogRef.afterClosed().subscribe((_) => {
      this.walletConnectService.getData().subscribe((data) => {
        this.data = data;
        this.isConnected = this.data.address !== undefined;
      })
    });
  }

  async getMaxSupply() {

  await  this.httpApi.getArtistMoonboxData(
      this.activatedRoute.snapshot.params['artistAddress'],
      this.data?.address
    ).then((response: ArtistMoonbox) => {
      if (response.isSuccess) {
  
        this.artistDetails = response;
        this.supplyDetails = this.artistDetails.data;
        this.supplyDetails.forEach((item: Supply) => {
          if (!item.isminted) {
            const index = this.boxTypes.findIndex(box => box.toLocaleLowerCase() == item.type.toLocaleLowerCase());
            this.removeitemIndex.push(index);
           
          }
          this.supply.push(item.hasSupply() ? 1 : 0);
          debugger

        });
       debugger
        if (this.removeitemIndex.length > 0) {
        debugger
          if (!this.isgetMaxSupplyCall) {
            this.removeitem(this.removeitemIndex);
          }
        }
      } else {
        this.mainMessage = MESSAGES.NO_SUPPLY;
      }
    })
    this.pageLoader=true;
    this.changeDetectionRef.detectChanges();
  }


  removeitem(removeValFromIndex: any) {
   debugger
    for (var i = removeValFromIndex.length - 1; i >= 0; i--) {
      this.boxTypes.splice(removeValFromIndex[i], 1);
      this.supplyDetails.splice(removeValFromIndex[i], 1);
      this.supply.splice(removeValFromIndex[i], 1);
    }
    this.isgetMaxSupplyCall = true;
  }

  buyMoonBase(index: number) {

    if (!this.hasEnoughMoonshots(index) || this.supply[index] === 0) {
      return false
    }
    else if (this.data === undefined || this.data.address === undefined)
      this.openDialog();
    else
      this.submitBetToContract(index);

    return false;
  }

  async submitBetToContract(index: number) {
    const item: Supply = this.supplyDetails[index];

    if (item.currentSupply === 0) return false;

    if (!item.canBuyWithinSupplyAmount(this.supply[index])) {
      this.httpApi.showToastr(MESSAGES.INVALID_NUMBER_OF_BET, false);
      return false;
    }

    // if (!this.hasEnoughMoonshots(index)) {

    //   this.httpApi.showToastr('You are not eligible for this Tier', false);
    //   return false;
    // }

    // if (this.supplyDetails[index]?.isUpcoming) return false;
    this.invisible = true;
    this.fadeOut = true;
    this.dialog.open(ModalForTransactionComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        inputNumber: this.supply[index],
        lootBoxName: this.lootBoxDetails[index].name,
        data: this.data,
        index: index,
        balance: this.balance,
        isArtistLootBox: this.artistDetails.walletAddress == environment.ownerAddress ? false : true,
        artistDetails: {
          lootBoxId: this.supplyDetails[index].id,
          price: this.supplyDetails[index].price,
          address: this.artistDetails.walletAddress,
          signature: this.supplyDetails[index].signature,
          limit: this.supplyDetails[index].limitPerTxn,
          tokenAddress: this.supplyDetails[index].tokenAddress,
          ArtistNFTAddress: this.artistDetails.ArtistNFTAddress
        }
      },
      panelClass: 'custom-modalbox'
    }).afterClosed().subscribe(async result => {
      this.pageLoader = false;
      this.userProvider.onReceive().subscribe((userData: any) => {
        this.balance = userData.balance;
        // this.getMaxSupply();
        // this.getMoonboxTierLimits();
        // console.log(userData);
      }, (error) => {

      });
      this.invisible = false;
      this.fadeOut = result;
      this.popupClosed = true;
      this.getMoonboxTierLimits();
      this.resetMaxSupplyCalldata();
       await this.getMaxSupply()
      this.pageLoader = true;
      this.walletConnectService.getAccountAddress();

    }

    );


    return true;
  }

  resetMaxSupplyCalldata()
  {
    this.boxTypes = ["wood", "silver", "gold", "diamond"];
    this.isgetMaxSupplyCall = false;
    this.supply=[];
    this.removeitemIndex=[];
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  closeCollectionInfoDialog() {
    this.dialog.closeAll();
  }

  trackByFn(index: number, item: any) {
    return item;
  }

  viewDetails(): void {
    if (this.slides === null || this.artistData === null)
      return;

    this.dialog.open(
      CollectionOverviewComponent,
      {
        width: '100%',
        maxWidth: '1000px',
        data: { "slides": this.slides, "artistData": this.artistData },
        panelClass: 'collection-info-popup-panel',
      }
    );
  }

  getSliderImages = () => this.httpApi.getRandomCollectionImageListFromArtist(
    this.activatedRoute.snapshot.params['artistAddress']).then((res) => {
      this.slides = res.data;
      this.artistData = res.artistData;
    });

}

