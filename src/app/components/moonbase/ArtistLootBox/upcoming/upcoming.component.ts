import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';


@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss','./../../buy-moonbase/buy-moonbase.component.scss','./../../moonbase.component.scss', './../../intro/intro.component.scss']
})
export class UpcomingComponent implements OnInit {
  static readonly routeName: string = 'upcoming';
  listOfArtistCollection = [];
  listOfArtistUpcoming = [];
  listOfRecentDrops = [];
  endTime  = '2021-09-29T00:00:00';
  isNSFWStatus = false;

  constructor(private httpService:HttpApiService) { }

  ngOnInit(): void {
    this.isNSFWStatus = this.httpService.getNSFWStatus();
    this.checkNSFWStatus();
    this.getAllCollections();
    
  }

  getAllCollections()
  {
    this.httpService.getAllCollections(this.isNSFWStatus).subscribe((response)=>{
        this.listOfArtistCollection=response.data.live_data_array;
        this.listOfRecentDrops = response.data.recent_data_array;
        
    });

      this.httpService.getUpcomingArtistCollections(this.isNSFWStatus).subscribe((response)=>{
        this.listOfArtistUpcoming=response.data;
    });
  }

  checkNSFWStatus()
  {
    setInterval(() => {
      this.checkNSFWStatusFromStorage()
    }, 4000);
    
  }

  checkNSFWStatusFromStorage()
  {
    let tempstatus = this.httpService.getNSFWStatus();
      if(this.isNSFWStatus!=tempstatus)
      {
        this.isNSFWStatus = tempstatus;
        this.getAllCollections();
      }
  }
  

}
