import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';


@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss','./../../buy-moonbase/buy-moonbase.component.scss','./../../moonbase.component.scss', './../../intro/intro.component.scss']
})
export class UpcomingComponent implements OnInit {
  static readonly routeName: string = 'upcoming';
  listOfArtistCollection: any;
  listOfArtistUpcoming : any;
  endTime  = '2021-09-29T00:00:00';

  constructor(private httpService:HttpApiService) { }

  ngOnInit(): void {
    this.getAllCollections();
  }

  getAllCollections()
  {
    this.httpService.getAllCollections().subscribe((response)=>{
        this.listOfArtistCollection=response.data;
    });

    this.httpService.getUpcomingArtistCollections().subscribe((response)=>{
      this.listOfArtistUpcoming=response.data;
  });
  }

}
