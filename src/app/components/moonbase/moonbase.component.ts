import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';
import { Subscription } from 'rxjs';
import { LandingSliderProvider } from 'src/app/services/providers/landing-slider.provider';

@Component({
  selector: 'app-moonbase',
  templateUrl: './moonbase.component.html',
  styleUrls: ['./moonbase.component.scss']
})
export class MoonbaseComponent implements OnInit {
  subscription: Subscription;
  bgChange: boolean = false;
  static readonly routeName: string = '';

  constructor(
    private httpApi: HttpApiService) {
    this.subscription = this.httpApi.getMessage().subscribe(message => {
      this.bgChange = message.text;
    });
  }

  ngOnInit(): void {
  }

}
