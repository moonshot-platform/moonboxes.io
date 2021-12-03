import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

import { MoonbaseRoutingModule } from './moonbase-routing.module';
import { MoonbaseComponent } from './moonbase.component';
import { NavModule } from './nav/nav.module';
import { IntroComponent } from './intro/intro.component';
import { MatIconModule } from '@angular/material/icon';
import { NgParticlesModule } from 'ng-particles';
import { PrizePoolComponent } from './prize-pool/prize-pool.component';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InventoryComponent } from './inventory/inventory.component';
import { FooterCountComponent } from './footer-count/footer-count.component';
import { ModalForTransactionComponent } from './modal-for-transaction/modal-for-transaction.component';
import { ArtistMoonboxComponent } from './ArtistLootBox/artist-moonbox/artist-moonbox.component';
import { UpcomingComponent } from './ArtistLootBox/upcoming/upcoming.component';
import { AngularCountdownDateTimeModule } from 'angular-countdown-date-time';
import { CountdownTimerComponent } from './ArtistLootBox/upcoming/countdown-timer/countdown-timer.component';
import { ModalForClaimComponent } from './history/modal-for-claim/modal-for-claim.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { SocialShareComponent } from './modal-for-transaction/social-share/social-share.component';
import { SidebarModule } from '../base/sidebar/sidebar.module';
import { WalletConnectModule } from '../base/wallet/connect/connect.module';
import { LandingComponent } from './landing/landing.component';
import { RarityComponent } from './rarity/rarity.component';
import { LandingIntroComponent } from './landing/landing-intro/landing-intro.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { InfoComponent } from './info/info.component';
import { TransferComponent } from './modal-for-transaction/transfer/transfer.component';
import { LandingNftsComponent } from './landing/landing-nfts/landing-nfts.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { InfoMoonboxesComponent } from './info/info-moonboxes/info-moonboxes.component';
import { JoinApplicationComponent } from './join-application/join-application.component';


@NgModule({
  declarations: [
    MoonbaseComponent,
    IntroComponent,
    PrizePoolComponent,
    HistoryComponent,
    InventoryComponent,
    FooterCountComponent,
    ModalForTransactionComponent,
    ArtistMoonboxComponent,
    UpcomingComponent,
    CountdownTimerComponent,
    ModalForClaimComponent,
    SocialShareComponent,
    LandingComponent,
    RarityComponent,
    LandingIntroComponent,
    InfoComponent,
    TransferComponent,
    LandingNftsComponent,
    InfoMoonboxesComponent,
    JoinApplicationComponent,
  ],
  imports: [
    MatIconModule,
    CommonModule,
    NgParticlesModule,
    MoonbaseRoutingModule,
    NavModule,
    FormsModule,
    NgxPaginationModule,
    AngularCountdownDateTimeModule,
    ShareButtonsModule,
    ShareIconsModule,
    SidebarModule,
    WalletConnectModule,
    SwiperModule,
    UiSwitchModule,
    ClipboardModule
  ]
})
export class MoonbaseModule { }
