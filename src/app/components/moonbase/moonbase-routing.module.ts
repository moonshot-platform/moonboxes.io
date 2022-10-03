import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistMoonbox } from 'src/app/models/artist-moonbox.model';
import { ArtistMoonboxRouteComponent } from './artist-moonbox-route/artist-moonbox-route.component';
import { ArtistMoonboxComponent } from './ArtistLootBox/artist-moonbox/artist-moonbox.component';
import { UpcomingComponent } from './ArtistLootBox/upcoming/upcoming.component';
import { HistoryComponent } from './history/history.component';
import { InfoComponent } from './info/info.component';
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
        path: 'application',
        component: LandingComponent,
        data: { scroll: 'join-application' }
      },
      {
        path: IntroComponent.routeName,
        component: IntroComponent
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
      ///////////////////////////////////////////////original Route
      {
        path: ArtistMoonboxComponent.routeName,
        component: ArtistMoonboxComponent
      },
      ///////////////////////////////////////////////
      {
        path:ArtistMoonboxRouteComponent.artistOptionalRoute,
        component:ArtistMoonboxRouteComponent
      },
      {
        path:ArtistMoonboxRouteComponent.artistOptionalRoute,
        component:ArtistMoonboxRouteComponent
      },
      {
        path: UpcomingComponent.routeName,
        component: UpcomingComponent,
        data: { activeTab: 1 }
      },
      {
        path: 'live',
        component: UpcomingComponent,
        data: { activeTab: 2 }
      },
      {
        path: 'recent',
        component: UpcomingComponent,
        data: { activeTab: 3 }
      },
      {
        path: RarityComponent.routeName,
        component: RarityComponent
      },
      {
        path: InfoComponent.routeName,
        component: InfoComponent
      },
      {
        path: "**",
        redirectTo: MoonbaseComponent.routeName,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoonbaseRoutingModule { }
