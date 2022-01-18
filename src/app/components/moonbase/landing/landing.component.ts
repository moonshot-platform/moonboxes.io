import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class LandingComponent implements OnInit {

  static readonly routeName: string = '';

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      const scrollTo = data?.['scroll'];
      if (scrollTo !== undefined) {
        smoothscroll.polyfill();
        const element = document.querySelector(`#${scrollTo}`)
        if (element) setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500);
      }
    });

  }
}
