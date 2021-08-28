import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoonbaseRoutingModule } from './moonbase-routing.module';
import { MoonbaseComponent } from './moonbase.component';
import { NavModule } from './nav/nav.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IntroComponent } from './intro/intro.component';
import { MatIconModule } from '@angular/material/icon';
import { NgParticlesModule } from 'ng-particles';
import { FooterComponent } from './footer/footer.component';
import { BuyMoonbaseComponent } from './buy-moonbase/buy-moonbase.component';
import { PrizePoolComponent } from './prize-pool/prize-pool.component';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { ConnetwalletComponent } from './connetwallet/connetwallet.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InventoryComponent } from './inventory/inventory.component';
import { FooterCountComponent } from './footer-count/footer-count.component';
import { ModalForTransactionComponent } from './modal-for-transaction/modal-for-transaction.component';
import { ArtistMoonboxComponent } from './ArtistLootBox/artist-moonbox/artist-moonbox.component';
import { UpcomingComponent } from './ArtistLootBox/upcoming/upcoming.component';
import { AngularCountdownDateTimeModule } from 'angular-countdown-date-time';
import { CountdownTimerComponent } from './ArtistLootBox/upcoming/countdown-timer/countdown-timer.component';
import { ModalForClaimComponent } from './history/modal-for-claim/modal-for-claim.component';
import { RevealNftPopupComponent } from './buy-moonbase/reveal-nft-popup/reveal-nft-popup.component';


@NgModule({
  declarations: [
    MoonbaseComponent,
    SidebarComponent,
    IntroComponent,
    FooterComponent,
    BuyMoonbaseComponent,
    PrizePoolComponent,
    HistoryComponent,
    ConnetwalletComponent,
    InventoryComponent,
    FooterCountComponent,
    ModalForTransactionComponent,
    ArtistMoonboxComponent,
    UpcomingComponent,
    CountdownTimerComponent,
    ModalForClaimComponent,
    RevealNftPopupComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    NgParticlesModule,
    MoonbaseRoutingModule,
    NavModule,
    FormsModule,
    NgxPaginationModule,
    AngularCountdownDateTimeModule
  ]
})
export class MoonbaseModule { }
