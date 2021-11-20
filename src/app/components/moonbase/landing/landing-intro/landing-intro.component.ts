import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { EffectCoverflow, Swiper, Autoplay } from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/scss';
import 'swiper/scss/autoplay';
SwiperCore.use([EffectCoverflow]);
SwiperCore.use([Autoplay]);
@Component({
  selector: 'app-landing-intro',
  templateUrl: './landing-intro.component.html',
  styleUrls: ['./landing-intro.component.scss']
})
export class LandingIntroComponent implements OnInit {

  slides: any[] = [
    {
      "img": "assets/media/images/moonbox/landing/322.jpg",
      "name": "The Moonshooter",
    },
    {
      "img": "assets/media/images/moonbox/landing/950.jpg",
      "name": "The Moonshooter",
    },
    {
      "img": "assets/media/images/moonbox/landing/951.jpg",
      "name": "The Moonshooter",
    },
    {
      "img": "assets/media/images/moonbox/landing/068.jpg",
      "name": "The Moonshooter",
    },
    {
      "img": "assets/media/images/moonbox/landing/372.jpg",
      "name": "The Moonshooter",
    },
    {
      "img": "assets/media/images/moonbox/landing/741.jpg",
      "name": "The Moonshooter",
    },
    {
      "img": "assets/media/images/moonbox/landing/575.jpg",
      "name": "The Moonshooter",
    },
  ];

  initialSlideStartIndex = Math.floor((this.slides.length - 1) / 2);
  sliderIndex = this.initialSlideStartIndex;
  currentSliderName = this.slides[this.sliderIndex].name;


  config: SwiperOptions = {
    slidesPerView: 0.98,
    effect: 'coverflow',
    direction: 'horizontal',
    centeredSlides: true,
    enabled: true,
    autoHeight: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      pauseOnMouseEnter: true,
      reverseDirection: true,
    },
    speed: 300,
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


  onSlideChange(index: any): void {
    if (index.swipeDirection == "next") {
      this.sliderIndex++;

    } else if (index.swipeDirection == "prev") {
      this.sliderIndex--;
    }
    this.sliderIndex = (this.sliderIndex) % (this.slides.length);
    this.currentSliderName = this.slides[this.sliderIndex].name;

  }

  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

}
