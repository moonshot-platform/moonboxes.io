import { Component, OnInit } from '@angular/core';
import SwiperCore, { EffectCoverflow, Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/scss';
SwiperCore.use([EffectCoverflow]);

@Component({
  selector: 'app-landing-nfts',
  templateUrl: './landing-nfts.component.html',
  styleUrls: ['./landing-nfts.component.scss']
})
export class LandingNftsComponent implements OnInit {


  slides: any[] = [
    //females
    // quantity : 13
    // Males 
    // quantity : 19
    // Moonshooter
    // quantity : 7
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-11-33.jpg",
      "name": "Ra8bit #4964",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/character-00118.png",
      "name": "Ra8bit #00118",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-11-52.jpg",
      "name": "Ra8bit #4965",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/character-02100.png",
      "name": "Ra8bit #02100",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-11-56.jpg",
      "name": "Ra8bit #4966",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/character-02101.png",
      "name": "Ra8bit #02101",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-00.jpg",
      "name": "Ra8bit #4967",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/character-02102.png",
      "name": "Ra8bit #02102",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-03.jpg",
      "name": "Ra8bit #4968",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/character-02299.png",
      "name": "Ra8bit #02299",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-06.jpg",
      "name": "Ra8bit #4969",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/character-02284.png",
      "name": "Ra8bit #02284",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-08.jpg",
      "name": "Ra8bit #4970",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/character-02319.png",
      "name": "Ra8bit #02319",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-11.jpg",
      "name": "Ra8bit #4971",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/character-02328.png",
      "name": "Ra8bit #02328",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-14.jpg",
      "name": "Ra8bit #4972",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/character-04329.png",
      "name": "Ra8bit #04329",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-16.jpg",
      "name": "Ra8bit #4973",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/character-04335.png",
      "name": "Ra8bit #04335",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-19.jpg",
      "name": "Ra8bit #4974",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/Ra8bit_6490_Jennifer_Miller.jpg",
      "name": "Ra8bit #6490 Jennifer Miller",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-22.jpg",
      "name": "Ra8bit #4975",
    },
    {
      "img": "assets/media/images/moonbox/landing/322.jpg",
      "name": "The Moonshooter #322",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-24.jpg",
      "name": "Ra8bit #4976",
    },
    {
      "img": "assets/media/images/moonbox/landing/950.jpg",
      "name": "The Moonshooter #950",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-28.jpg",
      "name": "Ra8bit #4977",
    },
    {
      "img": "assets/media/images/moonbox/landing/951.jpg",
      "name": "The Moonshooter #951",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-31.jpg",
      "name": "Ra8bit #4978",
    },
    {
      "img": "assets/media/images/moonbox/landing/068.jpg",
      "name": "The Moonshooter #068",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-33.jpg",
      "name": "Ra8bit #4979",
    },
    {
      "img": "assets/media/images/moonbox/landing/372.jpg",
      "name": "The Moonshooter #372",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/photo_2021-09-29_18-12-36.jpg",
      "name": "Ra8bit #4980",
    },
    {
      "img": "assets/media/images/moonbox/landing/741.jpg",
      "name": "The Moonshooter #741",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/Ra8bit_4964_Darren_Tavares.jpg",
      "name": "Ra8bit #4981 Darren Tavares",
    },
    {
      "img": "assets/media/images/moonbox/landing/575.jpg",
      "name": "The Moonshooter #575",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/males/Ra8bit_5901_Reginald_Elliot.jpg",
      "name": "Ra8bit #5901 Reginald Elliot",
    },
    {
      "img": "assets/media/images/moonbox/landing/nfts/females/character-02106.png",
      "name": "Ra8bit #02106",
    },
  ];

  initialSlideStartIndex = Math.floor((this.slides.length - 1) / 2);
  sliderIndex = this.initialSlideStartIndex;
  currentSliderName = this.slides[this.sliderIndex].name;

  config: SwiperOptions = {
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
    initialSlide: this.initialSlideStartIndex,
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
        slidesPerView: 3,
      },
      300: {
        slidesPerView: 1.76,
      }

    }

  };

  constructor() { }

  ngOnInit(): void { }

  onSlideChange(event: any): void {
    this.currentSliderName = this.slides[event.activeIndex - 3].name;
  }
  onActiveIndexChange(event: any): void {
    this.currentSliderName = this.slides[event.activeIndex - 3].name;
  }

  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
