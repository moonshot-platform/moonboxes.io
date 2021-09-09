import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raise-stakes',
  templateUrl: './raise-stakes.component.html',
  styleUrls: ['./raise-stakes.component.scss']
})
export class RaiseStakesComponent implements OnInit {

  boxes: any[] = [
    {
      "img": "assets/media/images/moonbox/landing/wood_rgba0048.png",
      "name": "Wood",
      "quantity": "0,5B",
    },
    {
      "img": "assets/media/images/moonbox/landing/silver_rgba0001.png",
      "name": "Silver",
      "quantity": "1B",
    },
    {
      "img": "assets/media/images/moonbox/landing/gold_rgba0001.png",
      "name": "Gold",
      "quantity": "2B",
    },
    {
      "img": "assets/media/images/moonbox/landing/diamond_rgba0034.png",
      "name": "Diamond",
      "quantity": "10B",
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }



  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
