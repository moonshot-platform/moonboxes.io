import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import { Router } from '@angular/router';
import { Location } from '@angular/common'
=======
import { MatDialog } from '@angular/material/dialog';
import { ConnetwalletComponent } from '../connetwallet/connetwallet.component';
>>>>>>> Stashed changes

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public open = false;

  public isTooltipActive = true;

  public navItems: any[] = [
    {
      'name': 'MoonBoxes',
      'path': '/moonbase',
      'allPaths': [
        '/moonbase',
        '/buy_moonbase',
        '/prize_pool'
      ]
    },
    {
      'name': 'MoonLottery',
      'path': '/history',
      'allPaths': [
        '/history'
      ]
    },
    {
      'name': 'MoonArcade',
      'path': '/community',
      'allPaths': [
        '/community'
      ]
    }
  ];

  public navSubItems: any[] = [
    {
      'icon' : 'assets/media/icons/moonbase/nav/moon.svg',
      'alt' : 'moon',
      'tooltip' : 'This is your inventory, an overview of rare NFTs you’ve won.'
    },
    {
      'icon' : 'assets/media/icons/moonbase/nav/diamond.svg',
      'alt' : 'diamond',
      'tooltip' : 'This is your inventory, an overview of rare NFTs you’ve won.'
    },
    {
      'icon' : 'assets/media/icons/moonbase/nav/folder.svg',
      'alt' : 'folder',
      'tooltip' : 'This is your inventory, an overview of rare NFTs you’ve won.'
    },
    {
      'icon' : 'assets/media/icons/moonbase/nav/lock.svg',
      'alt' : 'lock',
      'tooltip' : 'This is your inventory, an overview of rare NFTs you’ve won.'
    },
    {
      'icon' : 'assets/media/icons/moonbase/nav/info.svg',
      'alt' : 'info',
      'tooltip' : 'This is your inventory, an overview of rare NFTs you’ve won.'
    }
  ];

<<<<<<< Updated upstream
  constructor(public router:Router,private location: Location) { }
=======
  constructor(public dialog: MatDialog) { }
>>>>>>> Stashed changes

  ngOnInit(): void {
  }

<<<<<<< Updated upstream
  closeTooltip(){
    this.isTooltipActive = false;
  }
  closeMoonbase(){
    //this.location.back(); 
    this.router.navigateByUrl('/')
  }

=======
  openDialog(): void {
    console.log("sai")
    let dialogRef = this.dialog.open(ConnetwalletComponent, {
      width: 'auto',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  
>>>>>>> Stashed changes
}
