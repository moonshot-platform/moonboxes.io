import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class LandingComponent implements OnInit {

  static readonly routeName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const scrollTo = data?.['scroll'];
      if ( scrollTo !== undefined ) {
        document.querySelector('#' + scrollTo).scrollIntoView();
      }
    });
  }
}
