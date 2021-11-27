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
