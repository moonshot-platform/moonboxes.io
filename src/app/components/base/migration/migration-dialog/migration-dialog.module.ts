import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MigrationDialogComponent } from './migration-dialog.component';

@NgModule({
  declarations: [
    MigrationDialogComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MigrationDialogComponent
  ]
})
export class MigrationDialogModule { }
