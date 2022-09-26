import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { TokenomicsService } from 'src/app/services/tokenomics.service';
import { MoonbaseComponent } from '../moonbase.component';
import { WalletConnectComponent } from '../../base/wallet/connect/connect.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NetworkComponent } from '../../base/wallet/connect/network/network.component';
import { CHAIN_CONFIGS } from '../../base/wallet/connect/constants/blockchain.configs';
import { ErrorDialogComponent } from '../../base/wallet/connect/error-dialog/error-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { WindowRefService } from 'src/app/services/window-ref.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  data: any;
  isConnected: boolean = false;
  balance: any = 0;
  moonCountData: any;
  isNSFWStatus = false;
  menuItem = false;
  public isTooltipActive = true;
  chainName: any;
  selectedChainId: number = 0;
  ChainId: number = 0;
  event$
  public navItems: any[] = [
    // {
    //   'name': 'MoonBoxes',
    //   'path': ''
    // },
  ];
  chains: any[] = environment.chainId;
  chainConfigs = CHAIN_CONFIGS;
  currentChainId: number = 0;
  isMultiChainDropdownActive: boolean = false;
  address: string = '';

  public navSubItems: any[] = [
    {
      icon: 'assets/media/icons/moonbase/nav/Menu_return_black.svg',
      alt: 'return back',
      tooltip: 'Back',
      click: () => { },
      routerLink: null, // [''],
      route: '/',
    },
    {
      icon: 'assets/media/icons/moonbase/nav/Menu_drops_black.svg',
      alt: 'drops',
      tooltip:
        'Recent, live and upcoming NFT drops.',
      click: null,
      routerLink: ['/live'],
      route: '/live',
    },
    {
      icon: 'assets/media/icons/moonbase/nav/Menu_inventory_black.svg',
      alt: 'inventory',
      tooltip:
        'This is your wallet inventory. An overview of all NFTs you received out of the MoonBoxes.',
      click: null,
      routerLink: ['/inventory'],
      route: '/inventory',
    },
    {
      icon: 'assets/media/icons/moonbase/nav/Menu_history_black.svg',
      alt: 'history',
      tooltip: 'This is your history. An overview of your MoonBox NFT claims.',
      click: null,
      routerLink: ['/history'],
      route: '/history',
    },
    {
      icon: 'assets/media/icons/moonbase/nav/Menu_info_black.svg',
      alt: 'info',
      tooltip: 'Here you can find more information about the MoonBoxes tiers.',
      click: null,
      routerLink: ['/info'],
      route: '/info',
    },
  ];

  public open = false;
  showMultiChainDialog: boolean = true;

  backButton: any = {
    icon: 'assets/media/icons/moonbase/nav/Menu_return_black.svg',
    alt: 'return back',
    tooltip: 'Back',
    click: () => this.goBack(),
    routerLink: null, // [''],
    route: '/',
  };

  homeButton: any = {
    icon: 'assets/media/icons/moonbase/nav/Home.svg',
    alt: 'return home',
    tooltip: 'Home',
    click: () => {
      this.router.navigate(['/'], { replaceUrl: true })
    },
    routerLink: null,
    route: '/',
  };

  constructor(
    public dialog: MatDialog,
    private walletConnectService: WalletConnectService,
    private tokenomicsService: TokenomicsService,
    private localStorage: LocalStorageService,
    private toastrService: ToastrService,
    public router: Router,
    private location: Location,
    private windowRef: WindowRefService,

  ) {
    this.event$ = location.onUrlChange((val) => {
      this.isMultiChain();
    })

    this.changeNavBarBackButton(window.innerWidth < 1148)

  }

  ngOnInit(): void {
    this.walletConnectService.init();
    this.walletConnectService.updateChainId(parseInt(localStorage.getItem('manual_chainId') ?? "56"));
    // this.walletConnectService.updateSelectedChainId(parseInt(localStorage.getItem('chainId') ?? "56"));

    console.log(parseInt(localStorage.getItem('manual_chainId') ?? "56"));

    this.getNSFWStatus();

    this.walletConnectService.getSelectedChainId().subscribe((response) => {
      this.selectedChainId = response;
      this.currentChainId = response;

      this.isMultiChain();
      // this.checkNetwork();
    });

    this.walletConnectService.getChainId().subscribe((response) => {
      this.ChainId = response;

      this.checkNetwork();
    });

    this.walletConnectService.getData().subscribe((data) => {
      if (data !== undefined && data.address != undefined) {
        this.data = data;
        this.address = data.address;
        // this.checkNetwork();
        this.isConnected = true;
        if (this.data.networkId.chainId == environment.chainId) {
          this.getMoonShootBalance();
        }
      } else {
        this.balance = 'Awaiting Connection';
        this.isConnected = false;
      }
    });

    this.walletConnectService.onWalletStateChanged().subscribe((state) => {
      this.isConnected = state;
    })

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(WalletConnectComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => { });
  }

  async getMoonShootBalance() {
    const balance = Number(
      await this.walletConnectService.getUserBalance(this.data.address)
    );
    this.balance = this.walletConnectService.convertBalance(balance);
  }

  menuopen() {
    this.menuItem = true;
  }

  closeMenu() {
    this.menuItem = false;
  }

  closeTooltip() {
    this.isTooltipActive = false;
  }

  goBack() {
    if (this.router.url.replace('/', '') !== MoonbaseComponent.routeName)
      this.location.back();
  }
  toggleTokenomics() {
    this.tokenomicsService.onToggle(true);
    this.closeMenu();
  }

  changeNSFWStatus(state: boolean) {
    this.localStorage.setNSFW(state);
  }

  getNSFWStatus() {
    this.isNSFWStatus = this.localStorage.getNSFW();
  }

  network() {
    let dialogRef = this.dialog.open(NetworkComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => { });
  }

  changeAccountDetected(accounts: any) {
    this.walletConnectService.getChainId().subscribe(async (response) => {
      this.selectedChainId = response;
      this.currentChainId = response;

      let currentNetworkID = await this.walletConnectService.getNetworkChainId();
      if (this.chains[response] != currentNetworkID)
        this.currentChainId = response;

      this.checkNetwork();
    });
  }

  checkNetwork() {
    this.chainName = CHAIN_CONFIGS[this.ChainId].name;
    if (environment.chainId.indexOf(this.selectedChainId) == -1) {
      // this.openerr(1);
    }
  }

  openerr(err: number) {
    let dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: err,
      disableClose: true,
    });
  }

  isMultiChain() {
    if (this.router.url === '/live' || this.router.url === '/inventory' || this.router.url === '/history') {
      this.showMultiChainDialog = false;
    }
    else {
      this.showMultiChainDialog = true;
    }
  }

  async toggleChainDropdown() {
    document?.getElementById("myDropdown")?.classList.toggle("show");
    this.isMultiChainDropdownActive = !this.isMultiChainDropdownActive;
  }

  @HostListener('document:click', ['$event'])
  onMouseEnter(event: any) {
    if (!document.getElementById('dropdwonButton').contains(event.target)) {
      var dropdowns = document.getElementsByClassName('dropdown-content');
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          this.isMultiChainDropdownActive = false;
        }
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.changeNavBarBackButton(event.target.innerWidth < 1148)
  }

  changeNavBarBackButton(isMobile: boolean) {
    if (isMobile) {
      this.navSubItems[0] = this.homeButton;
    } else {
      this.navSubItems[0] = this.backButton;
    }
  }

  async changeChain(config: any, index: any) {

    if (config !== undefined) {
      try {
        await this.windowRef.nativeWindow.ethereum.request(config);

        this.walletConnectService.updateChainId(this.chains[index]);
        this.toastrService.success(`You are connected to the ${this.chainConfigs[this.chains[index] ?? 97].name}`, "NETWORK");
        // //debugger
        window.location.reload();
      } catch (error) {

        console.log(error);

        this.toastrService.error("You selected an unsupported Network!\n" + error.message, "NETWORK")
      }
    }
  }
}
