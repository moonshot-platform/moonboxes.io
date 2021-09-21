import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenomicsService } from 'src/app/services/tokenomics.service';
import { ConnetwalletComponent } from '../../moonbase/connetwallet/connetwallet.component';

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

  toggleTokenomicsView( active: boolean = null ) {
    this.active = active || !this.active;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ConnetwalletComponent, {
      width: 'auto',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }
}
