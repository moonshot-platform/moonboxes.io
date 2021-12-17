import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-collection-overview',
  templateUrl: './collection-overview.component.html',
  styleUrls: ['./collection-overview.component.scss']
})
export class CollectionOverviewComponent implements OnInit {
  slides: any[] = [];
  artistData: any;

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    effect: 'fade',
    allowTouchMove: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      pauseOnMouseEnter: true,
    },
    speed: 3000,
    freeMode: {
      enabled: false,
      sticky: true,
    },
    grabCursor: false,
    loop: true,
    coverflowEffect: {
      depth: 500,
      slideShadows: false,
      rotate: -40,
      stretch: 100,
    },
  };

  swiperConfigMobile: SwiperOptions = {
    slidesPerView: 3,
    effect: 'coverflow',
    direction: 'horizontal',
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 1000,
    centerInsufficientSlides: true,
    freeMode: {
      enabled: false,
      sticky: true,
    },
    grabCursor: true,
    initialSlide: 3,
    loop: true,
    coverflowEffect: {
      depth: 400,
      slideShadows: false,
      rotate: 0,
      stretch: 0,
    },
    breakpoints: {
      700: {
        slidesPerView: 3,
      },
      600: {
        slidesPerView: 3,
      },
      500: {
        slidesPerView: 2.4,
      },
      300: {
        slidesPerView: 1.5,
      },
      200: {
        slidesPerView: 1.5,
      }

    }

  };


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.slides = data.slides;
    this.artistData = data.artistData;
  }

  ngOnInit(): void {
  }

  getMinPrice(item: any) {
    const { Diamond, Wood, Silver, Gold } = item;
    if (Diamond == Wood && Diamond == Silver && Diamond && Gold)
      return item['minPrice'];

    return `from ${item['minPrice']}`;
  }

}