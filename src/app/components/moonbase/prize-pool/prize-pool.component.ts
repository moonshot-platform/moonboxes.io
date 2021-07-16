import { Component, OnInit } from '@angular/core';
declare let particlesJS: any;

@Component({
  selector: 'app-prize-pool',
  templateUrl: './prize-pool.component.html',
  styleUrls: ['./prize-pool.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class PrizePoolComponent implements OnInit {

  static readonly routeName: string = 'prize_pool';
  constructor() {
    particlesJS.load('moonbase-particles', 'assets/json/particlesjs-config.json');
   }

  ngOnInit(): void {
  }

}
