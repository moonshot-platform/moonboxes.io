import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-overview',
  templateUrl: './collection-overview.component.html',
  styleUrls: ['./collection-overview.component.scss']
})
export class CollectionOverviewComponent implements OnInit {

  item: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data;
  }

  ngOnInit(): void {
  }

  getMinPrice( item: any ) {
    const { Diamond, Wood, Silver, Gold } = item;
    if( Diamond == Wood && Diamond == Silver && Diamond && Gold  )
      return item['minPrice'];

    return `from ${item['minPrice']}`;
  }

}