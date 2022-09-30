import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timer-pop-up',
  templateUrl: './timer-pop-up.component.html',
  styleUrls: ['./timer-pop-up.component.scss']
})
export class TimerPopUPComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<TimerPopUPComponent>,private router:Router) { }

  ngOnInit(): void {
  }

  closeModal(){
    window.location.reload();
    this.dialogRef.close();
  }

  gotoLive(){
    this.router.navigate(['/live'])
    this.dialogRef.close();
  }
}
