import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public open = false;

  public navItems: any[] = [
    {
      'name': 'MoonBoxes',
      'path': '/moonbase',
      'allPaths': [
        '/moonbase',
        '/buy_moonbase',
        '/prize_pool'
      ]
    },
    {
      'name': 'MoonLottery',
      'path': '/history',
      'allPaths': [
        '/history'
      ]
    },
    {
      'name': 'MoonArcade',
      'path': '/community',
      'allPaths': [
        '/community'
      ]
    }
  ];

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

}
