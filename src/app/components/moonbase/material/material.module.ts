import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
const module =[
  MatTabsModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    module
  ],
  exports:[
    module
  ]
})
export class MaterialModule { }
