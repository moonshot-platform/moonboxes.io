import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenomicsService } from 'src/app/services/tokenomics.service';
import { ConnectComponent } from '../wallet/connect/connect.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  active = false;

  constructor(
    private tokenomicsService: TokenomicsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tokenomicsService.whenToggled().subscribe((state:boolean) => {
      this.toggleTokenomicsView(state);
    });
  }

  toggleTokenomicsView( active: boolean = false ) {
    this.active = active || !this.active;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConnectComponent, {width: 'auto' });

    dialogRef.afterClosed().subscribe(result => {});
  }
}