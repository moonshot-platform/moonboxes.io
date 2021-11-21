import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { EffectCoverflow, EffectFade, Swiper, Autoplay } from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import { nftSlider } from '../consts/nft-slider.const';
import { SliderModel } from '../models/slider.model';
SwiperCore.use([EffectFade]);
SwiperCore.use([Autoplay]);
@Component({
  selector: 'app-landing-intro',
  templateUrl: './landing-intro.component.html',
  styleUrls: ['./landing-intro.component.scss']
})
export class LandingIntroComponent implements OnInit {

  slides: SliderModel[] = nftSlider;

  config: SwiperOptions = {
    slidesPerView: 0.98,
    effect: 'fade',
    centeredSlides: true,
    enabled: true,
    autoHeight: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      pauseOnMouseEnter: true,
      reverseDirection: true,
    },
    initialSlide: 0,
    speed: 3000,
    centerInsufficientSlides: false,
    freeMode: {
      enabled: false,
      sticky: true,
    },
    grabCursor: true,
    loop: true,
    coverflowEffect: {
      depth: 500,
      slideShadows: false,
      rotate: -40,
      stretch: 100,
    },
    // breakpoints: {
    //   700: {
    //     slidesPerView: 1,
    //   },
    //   600: {
    //     slidesPerView: 3,
    //   },
    //   500: {
    //     slidesPerView: 3,
    //   },
    //   300: {
    //     slidesPerView: 1.76,
    //   }
    // }

  };

  constructor() {
  }

  ngOnInit(): void {

  }

  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
