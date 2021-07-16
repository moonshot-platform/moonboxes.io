import { Component, OnInit } from '@angular/core';
declare let particlesJS: any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class HistoryComponent implements OnInit {

  static readonly routeName: string = 'history';
  constructor() {
    particlesJS.load('moonbase-particles', 'assets/json/particlesjs-config.json');
   }

  ngOnInit(): void {
  }

}
