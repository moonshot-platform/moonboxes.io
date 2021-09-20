import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  static readonly routeName: string = 'video';

  constructor() { }

  ngOnInit(): void {
  }

}
