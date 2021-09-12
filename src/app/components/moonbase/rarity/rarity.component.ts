import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rarity',
  templateUrl: './rarity.component.html',
  styleUrls: ['./rarity.component.scss']
})
export class RarityComponent implements OnInit {

  static readonly routeName: string = 'rarity';

  sortedOnRarity = false;

  constructor() { }

  ngOnInit(): void {
  }

  doChangePancakeRouter() {
    
  }

}
