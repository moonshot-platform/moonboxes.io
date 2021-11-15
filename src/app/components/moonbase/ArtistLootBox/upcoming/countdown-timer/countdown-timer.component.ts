import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  formatDate
} from '@angular/common';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {
  
  @Input() date: string;

  interval: number;
  timer: string;

  ngOnDestroy() {
    clearInterval( this.interval );
  }

  ngOnInit(): void {

    const date = new Date( `${this.date} UTC` ).toString();
    const format = 'yyyy/MM/dd HH:mm:ss';
    const local = 'en-us';

    const targetDateTime = new Date( formatDate( date, format, local ) ).getTime();
    
    this.interval = window.setInterval( () => {
      
      // Get now DateTime
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const remainingTime = targetDateTime - now;

      // Time calculations for days, hours, minutes and seconds
      const d = ('0' + Math.floor(remainingTime / (1000 * 60 * 60 * 24)) ).slice(-2);
      const h = ('0' + Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) ).slice(-2);
      const m = ('0' + Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)) ).slice(-2);
      const s = ('0' + Math.floor((remainingTime % (1000 * 60)) / 1000) ).slice(-2);

      this.timer = `${d} D : ${h} H : ${m} M : ${s} S`;

      if ( remainingTime <= 0 ) clearInterval( this.interval );
    },  1000 );

  }

}