import { Component, OnInit } from '@angular/core';
import SwiperCore, { EffectCoverflow, Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/scss';
SwiperCore.use([EffectCoverflow]);

@Component({
  selector: 'app-limited',
  templateUrl: './limited.component.html',
  styleUrls: ['./limited.component.scss']
})
export class LimitedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  config: SwiperOptions = {
    slidesPerView: 3,
    effect: 'coverflow',
    direction: 'horizontal',
    centeredSlides: true,
    //spaceBetween: 10,
    autoplay: true,
    centeredSlidesBounds: true,
    centerInsufficientSlides: true,
    freeMode: {
      enabled: false,
      sticky: true,
    },
    grabCursor: true,
    initialSlide: 3,
    loop: true,
    coverflowEffect: {
      depth: 700,
      modifier: 1,
      slideShadows: false,
      rotate: 0,
      stretch: -100,
    },

  };

  // Create array with 1000 slides
  slides: any[] = [
    {
      "img": "assets/media/images/moonbox/landing/322.jpg",
      "name": "",
    },
    {
      "img": "assets/media/images/moonbox/landing/950.jpg",
      "name": "",
    },
    {
      "img": "assets/media/images/moonbox/landing/951.jpg",
      "name": "",
    },
    {
      "img": "assets/media/images/moonbox/landing/068.jpg",
      "name": "",
    },
    {
      "img": "assets/media/images/moonbox/landing/575.jpg",
      "name": "",
    },
    {
      "img": "assets/media/images/moonbox/landing/741.jpg",
      "name": "",
    },
    {
      "img": "assets/media/images/moonbox/landing/372.jpg",
      "name": "",
    },
  ];

}
