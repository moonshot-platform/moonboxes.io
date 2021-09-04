import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './components/landing/landing.component';
import { MoonbaseComponent } from './components/moonbase/moonbase.component';
import { SidebarComponent } from './components/base/sidebar/sidebar.component';
import { ConnectComponent } from './components/base/wallet/connect/connect.component';
import { TokenomicsComponent } from './components/base/sidebar/tokenomics/tokenomics.component';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MoonbaseComponent,
    SidebarComponent,
    ConnectComponent,
    TokenomicsComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UiSwitchModule.forRoot({
      color: 'rgb(0, 189, 99)',
      switchColor: 'black',
      defaultBgColor: 'transparent',
      defaultBoColor : 'black',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
