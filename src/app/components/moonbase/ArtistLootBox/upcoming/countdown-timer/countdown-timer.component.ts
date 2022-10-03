import { Component, OnInit, Input ,Output ,EventEmitter} from '@angular/core';
import { formatDate } from '@angular/common';

import { interval, Subscription } from 'rxjs';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {
  
  @Input() date: string;

  @Input() nftData:any={};

  @Output() timerUp = new EventEmitter<any>();

  public timer: any;
  private _interval: Subscription;

  constructor(private walletConnectService:WalletConnectService){}

  ngOnDestroy() {
    this._interval.unsubscribe();
  }

  ngOnInit(): void {
    

    const date = new Date( `${this.date} UTC` ).toString();
    const format = 'yyyy/MM/dd HH:mm:ss';
    const local = 'en-us';

    const targetDateTime = new Date( formatDate( date, format, local ) ).getTime();
    
    this._interval = interval( 1000 ).subscribe( () => {

      // Get now DateTime
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const remainingTime = targetDateTime - now;

      // Time calculations for days, hours, minutes and seconds
      const d :any = ('0' + Math.floor(remainingTime / (1000 * 60 * 60 * 24)) ).slice(-2);
      const h :any = ('0' + Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) ).slice(-2);
      const m :any = ('0' + Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)) ).slice(-2);
      const s :any = ('0' + Math.floor((remainingTime % (1000 * 60)) / 1000) ).slice(-2);

      this.timer = `${d} D : ${h} H : ${m} M : ${s} S`;

      if ( d == 0 && h == 0 && m == 0 && s == 0){ 
        this.timerUp.emit({isShowPopUp:true,nftDetails:this.nftData})
        this._interval.unsubscribe()
      }
    } );
  }

}