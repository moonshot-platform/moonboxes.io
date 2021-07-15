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

  public navSubItems: any[] = [
    {
      'icon' : 'assets/media/icons/moonbase/nav/moon.svg',
      'alt' : 'moon',
      'tooltip-text' : 'This is your inventory, an overview of rare NFTs you’ve won.'
    },
    {
      'icon' : 'assets/media/icons/moonbase/nav/diamond.svg',
      'alt' : 'diamond',
      'tooltip-text' : 'This is your inventory, an overview of rare NFTs you’ve won.'
    },
    {
      'icon' : 'assets/media/icons/moonbase/nav/folder.svg',
      'alt' : 'folder',
      'tooltip-text' : 'This is your inventory, an overview of rare NFTs you’ve won.'
    },
    {
      'icon' : 'assets/media/icons/moonbase/nav/lock.svg',
      'alt' : 'lock',
      'tooltip-text' : 'This is your inventory, an overview of rare NFTs you’ve won.'
    },
    {
      'icon' : 'assets/media/icons/moonbase/nav/info.svg',
      'alt' : 'info',
      'tooltip-text' : 'This is your inventory, an overview of rare NFTs you’ve won.'
    }
  ];

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

}
