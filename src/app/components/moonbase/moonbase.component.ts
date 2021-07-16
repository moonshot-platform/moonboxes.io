import { Component, OnInit } from '@angular/core';
declare let particlesJS: any;

@Component({
  selector: 'app-moonbase',
  templateUrl: './moonbase.component.html',
  styleUrls: ['./moonbase.component.scss']
})
export class MoonbaseComponent implements OnInit {

  static readonly routeName: string = 'moonbase';
  constructor() {
    particlesJS.load('moonbase-particles', 'assets/json/particlesjs-config.json');
   }

  ngOnInit(): void {
  }

}
