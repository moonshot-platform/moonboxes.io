import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { FooterModule } from '../base/footer/footer.module';
import { CountdownModule } from 'ngx-countdown';
import { IntroComponent } from './intro/intro.component';
import { NgParticlesModule } from 'ng-particles';
import { NextComponent } from './next/next.component';
import { SecurityComponent } from './security/security.component';
import { MissionComponent } from './mission/mission.component';
import { MechanicsComponent } from './mechanics/mechanics.component';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SidebarModule } from '../base/sidebar/sidebar.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { NavigationModule } from '../base/navigation/navigation.module';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';



@NgModule({
  declarations: [
    AboutComponent,
    IntroComponent,
    SecurityComponent,
    NextComponent,
    MissionComponent,
    MechanicsComponent,
    DisclaimerComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    FooterModule,
    CountdownModule,
    NgParticlesModule,
    AppRoutingModule,
    RoadmapModule,
    SidebarModule,
    NavigationModule
  ]
})
export class AboutModule { }