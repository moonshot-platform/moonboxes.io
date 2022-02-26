import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-migration-dialog',
  templateUrl: './migration-dialog.component.html',
  styleUrls: ['./migration-dialog.component.scss']
})
export class MigrationDialogComponent implements OnInit {

  constructor(
    public parentDialogRef: MatDialogRef<MigrationDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog = () => this.parentDialogRef.close();

}
