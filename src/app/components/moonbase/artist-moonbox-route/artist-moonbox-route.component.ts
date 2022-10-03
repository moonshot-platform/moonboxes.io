import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist-moonbox-route',
  templateUrl: './artist-moonbox-route.component.html',
  styleUrls: ['./artist-moonbox-route.component.scss']
})
export class ArtistMoonboxRouteComponent implements OnInit {
  // static artistRoute :string = 'artist/:artistAddress';
  static artistOptionalRoute : string = 'artist/:artistAddress/:chainId';
  
  getCurrentChainId:any ;

  constructor(private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getCurrentChainId = localStorage.getItem('manual_chainId');
    let url = window.location.href;
   
    
    this.activatedRoute.params.subscribe({
      next:(res:any)=>{
        
        if(res.chainId && !isNaN(res.chainId)){
          if(this.getCurrentChainId != res.chainId){
            localStorage.setItem('manual_chainId',res.chainId);
          }
          let lastSlashIndex = url.lastIndexOf('/');
         url = url.slice(0,lastSlashIndex);
          
        }
        if(isNaN(res.chainId)){
          let lastSlashIndex = url.lastIndexOf('/');
          url = url.slice(0,lastSlashIndex);
        }
        window.open(url,"_self")
             
      }
    })
  }

}
