import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { TransferComponent } from 'src/app/components/moonbase/modal-for-transaction/transfer/transfer.component';
import { Observable, Observer } from 'rxjs';
import { SocialShareComponent } from 'src/app/components/moonbase/modal-for-transaction/social-share/social-share.component';

@Component({
  selector: 'app-item-overview',
  templateUrl: './item-overview.component.html',
  styleUrls: ['./item-overview.component.scss']
})
export class ItemOverviewComponent implements OnInit {

  item: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
  ) {
    this.item = data;
  }

  ngOnInit(): void {
  }

  fileTypeIsImage(url: string) {
    if( !url ) return false;
    
    const images = ['jpg', 'gif', 'png', 'jpeg', 'JPG', 'GIF', 'PNG', 'JPEG']
    const videos = ['mp4', '3gp', 'ogg', 'MP4', '3GP', 'OGG']

    const urltemp = new URL(url)
    const extension = urltemp.pathname.substring(urltemp.pathname.lastIndexOf('.') + 1)

    if (images.includes(extension)) return true;

    return false;
  }

  downloadImage(data: any) {
    this.getBase64ImageFromURL(data.logo_path).subscribe(base64data => {

      const base64Image = 'data:image/jpg;base64,' + base64data;

      const link = document.createElement("a");

      document.body.appendChild(link); // for Firefox

      if (data.logo_path.slice(-3) == 'gif') {
        link.setAttribute("href", data.logo_path);
        link.setAttribute("download", `${data.name}.gif`);
      } else {
        link.setAttribute("href", base64Image);
        link.setAttribute("download", `${data.name}.jpg`);
      }

      link.click();
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  openSocialShareDialog(data: any) {
    this.dialog.open(SocialShareComponent, {
      width: 'auto',
      data: { imageUrl: data.logo_path, name: data.name, url: '' }
    });
  }

  openTransferDialog(data: any) {
    this.dialog.open(TransferComponent, {
      width: 'auto',
      data: {
        details: data,
        walletAddress: this.data.address
      }
    });
  }

  trackByFn(index, item) {
    return item.title;
  }

}

