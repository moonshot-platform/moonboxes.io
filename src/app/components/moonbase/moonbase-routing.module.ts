import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistMoonboxComponent } from './ArtistLootBox/artist-moonbox/artist-moonbox.component';
import { UpcomingComponent } from './ArtistLootBox/upcoming/upcoming.component';
import { BuyMoonbaseComponent } from './buy-moonbase/buy-moonbase.component';
import { HistoryComponent } from './history/history.component';
import { IntroComponent } from './intro/intro.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LandingComponent } from './landing/landing.component';
import { MoonbaseComponent } from './moonbase.component';
import { PrizePoolComponent } from './prize-pool/prize-pool.component';
import { RarityComponent } from './rarity/rarity.component';

const routes: Routes = [
  {
    path: MoonbaseComponent.routeName,
    component: MoonbaseComponent,
    children: [
      {
        path: LandingComponent.routeName,
        component: LandingComponent
      },
      {
        path: IntroComponent.routeName,
        component: IntroComponent
      },
      {
        path: BuyMoonbaseComponent.routeName,
        component: BuyMoonbaseComponent
      },
      {
        path: PrizePoolComponent.routeName,
        component: PrizePoolComponent
      },
      {
        path: HistoryComponent.routeName,
        component: HistoryComponent
      },
      {
        path: InventoryComponent.routeName,
        component: InventoryComponent
      },
      {
        path: ArtistMoonboxComponent.routeName,
        component: ArtistMoonboxComponent
      },
      {
        path: UpcomingComponent.routeName,
        component: UpcomingComponent
      },
      {
        path: RarityComponent.routeName,
        component: RarityComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoonbaseRoutingModule { }
