import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenLockComponent } from './token-lock.component';
import { FooterModule } from '../base/footer/footer.module';
import { CountdownModule } from 'ngx-countdown';
import { IntroComponent } from './intro/intro.component';
import { NgParticlesModule } from 'ng-particles';
import { MoonlpComponent } from './moonlp/moonlp.component';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RoadmapModule } from '../about/roadmap/roadmap.module';
import { NavigationModule } from '../base/navigation/navigation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from '../base/sidebar/sidebar.module';



@NgModule({
  declarations: [
    TokenLockComponent,
    IntroComponent,
    MoonlpComponent,
  ],
  imports: [
    MatIconModule,
    CommonModule,
    FooterModule,
    CountdownModule,
    NgParticlesModule,
    AppRoutingModule,
    RoadmapModule,
    NavigationModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule
  ]
})
export class TokenLockModule { }
