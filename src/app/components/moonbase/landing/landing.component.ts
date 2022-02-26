import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import smoothscroll from 'smoothscroll-polyfill';
import { MigrationDialogComponent } from '../../base/migration/migration-dialog/migration-dialog.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class LandingComponent implements OnInit {

  static readonly routeName: string = '';

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.openDialog();
    this.route.data.subscribe(data => {
      const scrollTo = data?.['scroll'];
      if (scrollTo !== undefined) {
        smoothscroll.polyfill();
        const element = document.querySelector(`#${scrollTo}`)
        if (element) setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500);
      }
    });

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(MigrationDialogComponent, {
      width: 'auto',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }
}
