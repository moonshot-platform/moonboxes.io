import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoonbaseComponent } from './moonbase.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: BuyMoonbaseComponent
  // },
  {
    path: '',
    component: MoonbaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoonbaseRoutingModule { }
