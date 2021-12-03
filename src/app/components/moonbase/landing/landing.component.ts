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
    this.route.fragment.subscribe(fragment => {
      // this.fragment = fragment;
      console.log(fragment);
      
    });

    this.route.data.subscribe(data => {
      console.log(data);
      
      const anchor = data?.anchor?.toString();
      if ( anchor !== undefined ) {
        this.scrollToElement( anchor );
      }
    });
  }

  scrollToElement(anchor: string): void {
    this.router.navigate(['/'], { fragment: anchor })
  }

}
