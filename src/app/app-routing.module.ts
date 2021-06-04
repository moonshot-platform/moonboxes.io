import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { AboutComponent } from './components/about/about.component';
import { CommunityComponent } from './components/community/community.component';

const routes: Routes = [
  {
    path: LandingComponent.routeName,
    component: LandingComponent
  },
  {
    path: AboutComponent.routeName,
    component: AboutComponent
  },
  {
    path: CommunityComponent.routeName,
    component: CommunityComponent
  },
  { path: '**', redirectTo: LandingComponent.routeName }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
