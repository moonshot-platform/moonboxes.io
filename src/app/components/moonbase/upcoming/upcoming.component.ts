import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss','./../buy-moonbase/buy-moonbase.component.scss','./../moonbase.component.scss', './../intro/intro.component.scss']
})
export class UpcomingComponent implements OnInit {

  static readonly routeName: string = 'upcoming';

  constructor() { }

  ngOnInit(): void {
  }

}
