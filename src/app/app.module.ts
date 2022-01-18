import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GtagModule } from 'angular-gtag';
import { MoonbaseModule } from './components/moonbase/moonbase.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LocalStorageService } from './services/local-storage.service';
import { UserDetailsProvider } from './services/user-details.provider';
import { ItemOverviewComponent } from './components/base/dialogs/item-overview/item-overview.component';
import { CollectionOverviewComponent } from './components/base/dialogs/collection-overview/collection-overview.component';
import { SwiperModule } from 'swiper/angular';
import { CollectionOverviewModule } from './components/base/dialogs/collection-overview/collection-overview.module';
import { LandingSliderProvider } from './services/providers/landing-slider.provider';


@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': {
      direction: Hammer.DIRECTION_ALL
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ItemOverviewComponent,
    CollectionOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule,
    CollectionOverviewModule,
    GtagModule.forRoot({
      trackingId: 'G-5Q9LF9T9Q6',
      trackPageviews: true
    }),
    MoonbaseModule,
    MatDialogModule,
    HttpClientModule,
    SwiperModule,
    ToastrModule.forRoot(),
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig,
  },
    LocalStorageService,
    UserDetailsProvider,
    LandingSliderProvider
  ],
  bootstrap: [AppComponent],
  exports: [
    AppRoutingModule
  ]
})
export class AppModule { }
