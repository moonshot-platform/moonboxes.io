import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { nftSlider } from 'src/app/components/moonbase/landing/consts/nft-slider.const';
import { LandingSliderModel } from 'src/app/models/landing-slider.model';
import { HttpApiService } from '../http-api.service';

@Injectable({ providedIn: 'root' })
export class LandingSliderProvider {

    private liveCollectionList: any[] = [];
    private allNftImages: LandingSliderModel[] = [];

    private subjectLandingSlider = new Subject<LandingSliderModel[]>();

    constructor(private httpService: HttpApiService) {
        this.getLiveCollectionsAddresses();
    }

    onSave(data: LandingSliderModel[]): void {
        this.subjectLandingSlider.next(this.shuffleList(data));
    }

    onChange(): Observable<LandingSliderModel[]> {
        return this.subjectLandingSlider.asObservable();
    }

    getAllNftImages = (): LandingSliderModel[] => this.allNftImages;

    async getLiveCollectionsAddresses(): Promise<any> {

        const response = await this.httpService.getLiveCollectionsBanner();

        this.liveCollectionList = response.data.live_data_array;
        this.liveCollectionList = this.liveCollectionList.concat(response.data.recent_data_array)
        this.liveCollectionList.concat(...response.data.recent_data_array);

        for (let i = 0; i < this.liveCollectionList.length; i++) {

            await this.httpService.getRandomCollectionImageListFromArtist(this.liveCollectionList[i].walletAddress)
                .then((res) => {
                    for (let j = 0; j < 5; j++) {
                        if (res.data[j] !== undefined)
                            if (!res.data[j].logo_path.includes('.mp4') && !res.data[j].logo_path.includes('.gif'))
                                this.allNftImages.push(
                                    new LandingSliderModel(
                                        this.getPreviewImageUrl(res.data[j].logo_path),
                                        res.artistData.collectionName,
                                        i < response.data.live_data_array.length ? "artist/" + this.liveCollectionList[i].walletAddress : "recent"
                                    )
                                );
                    }

                });
        }

        this.onSave(this.allNftImages);
        return this.allNftImages;
    }

    getPreviewImageUrl(url: string): string {
        let reverse = url.split('').reverse().join('');
        let slash = reverse.indexOf('/');
        let dot = reverse.indexOf('.');

        var ext = url.split('.').pop();
        if (dot < slash) {
            if (ext.length > 1) {
                return url.slice(0, 36) + 'previews/' + url.slice(36, -ext.length) + 'webp';

            }
            else {
                return url.slice(0, 36) + 'previews/' + url.slice(36);
            }

        }
        else {
            return url.slice(0, 36) + 'previews/' + url.slice(36);
        }
    }

    shuffleList(list: any[]): any[] {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        return list;
    }
}
