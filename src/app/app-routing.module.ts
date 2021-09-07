import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoonbaseComponent } from './components/moonbase/moonbase.component';
import { BuyMoonbaseComponent } from './components/moonbase/buy-moonbase/buy-moonbase.component';
import { PrizePoolComponent } from './components/moonbase/prize-pool/prize-pool.component';
import { HistoryComponent } from './components/moonbase/history/history.component';
import { InventoryComponent } from './components/moonbase/inventory/inventory.component';
import { ArtistMoonboxComponent } from './components/moonbase/ArtistLootBox/artist-moonbox/artist-moonbox.component';
import { UpcomingComponent } from './components/moonbase/ArtistLootBox/upcoming/upcoming.component';

const routes: Routes = [
  // {
  //   path: MoonbaseComponent.routeName,
  //   component: MoonbaseComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
