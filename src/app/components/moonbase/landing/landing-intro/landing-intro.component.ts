import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing-intro',
  templateUrl: './landing-intro.component.html',
  styleUrls: ['./landing-intro.component.scss']
})
export class LandingIntroComponent implements OnInit {
  public videoSource: string = "assets/media/videos/intro.mp4";

  @ViewChild('videoPlayer') public videoPlayer: ElementRef<HTMLVideoElement>;
  public isPlaying = false;
  public show = true;
  public fadeOut = false;
  public timeoutRunning = false;
  private timeout: any;
  constructor() { }

  ngOnInit(): void {
  }


  toggleVideo(): void {
    if (this.videoPlayer.nativeElement.paused) {
      this.videoPlayer.nativeElement.play();
    } else {
      this.videoPlayer.nativeElement.pause();
    }

    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.fadeOut = true;
      this.timeoutRunning = true;
      this.timeout = setTimeout(() => this.onFadeOut(), 700);
    } else {
      this.show = true;
    }

  }

  onFadeOut() {
    this.timeoutRunning = false;
    this.show = false;
    this.fadeOut = false;
  }

  onShow(onHover: boolean): void {
    if (onHover)
      this.show = true;
    else {
      if (this.timeoutRunning) {
        clearTimeout(this.timeout);
        this.onFadeOut();
      }

      this.show = this.isPlaying ? false : true;
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutRunning) clearTimeout(this.timeout);
  }

  scrollToElement(page: string, fragment: string): void {
    const element = document.querySelector(`#${fragment}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

}
