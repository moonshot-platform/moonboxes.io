import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';


@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss', './../../buy-moonbase/buy-moonbase.component.scss', './../../moonbase.component.scss', './../../intro/intro.component.scss']
})
export class UpcomingComponent implements OnInit {
  static readonly routeName: string = 'upcoming';
  listOfArtistCollection = [];
  listOfArtistUpcoming = [];
  listOfRecentDrops = [];
  endTime = '2021-09-29T00:00:00';
  isNSFWStatus = false;
  activeTab = 1;
  lootBoxDetailsAttributes = [];
  lootBoxDetailsAttributesMobile = [];
  artistDetails: any;
  listData = [];
  public innerWidth: any;
  singleView = 4;

  constructor(private httpService: HttpApiService) {

  }

  ngOnInit(): void {
    this.isNSFWStatus = this.httpService.getNSFWStatus();
    this.checkNSFWStatus();
    this.getAllCollections();

    if (window.innerWidth < 768) {
      this.singleView = 1;
    }
  }

  changeTab(tabIndex: number) {
    this.closeAttributes();
    this.activeTab = tabIndex;
    if (this.activeTab == 1) {
      this.listData = this.listOfArtistUpcoming;
    }
    else if (this.activeTab == 2) {
      this.listData = this.listOfArtistCollection;
    }
    else if (this.activeTab == 3) {
      this.listData = this.listOfRecentDrops;
    }
  }

  getAllCollections() {

    this.httpService.getAllCollections(this.isNSFWStatus).subscribe((response) => {

      this.listOfArtistCollection = response.data.live_data_array;

      this.listOfRecentDrops = response.data.recent_data_array;

    });

    this.httpService.getUpcomingArtistCollections(this.isNSFWStatus).subscribe((response) => {
      this.listOfArtistUpcoming = response.data;
      this.listData = this.listOfArtistUpcoming;
    });
  }

  checkNSFWStatus() {
    setInterval(() => {
      this.checkNSFWStatusFromStorage()
    }, 4000);

  }

  checkNSFWStatusFromStorage() {
    let tempstatus = this.httpService.getNSFWStatus();
    if (this.isNSFWStatus != tempstatus) {
      this.isNSFWStatus = tempstatus;
      this.getAllCollections();
    }
  }



  setSelected(index: number, item: any) {
    this.lootBoxDetailsAttributes = [];
    this.lootBoxDetailsAttributes[index] = item;
    this.lootBoxDetailsAttributes[index].disabled = false;
    setTimeout(() => {
      this.scrollToElement('', 'collection-info');
    }, 100);
  }

  setSelectedMobile(index: number, item: any) {
    this.lootBoxDetailsAttributesMobile = [];
    this.lootBoxDetailsAttributesMobile[index] = item;
    this.lootBoxDetailsAttributesMobile[index].disabled = false;
    this.scrollToElement('', 'collection-info');
  }

  closeAttributes() {
    this.lootBoxDetailsAttributes = [];
    this.lootBoxDetailsAttributesMobile = [];
  }

  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

}
