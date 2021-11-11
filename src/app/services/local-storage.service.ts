export class LocalStorageService {

    public readonly NSFW_KEY: string = 'NSFW';

    set(key: string, val: any): void {
        localStorage.setItem( key, val );
    }

    get(key: string): any {
        return localStorage.getItem( key ) ?? false;
    }

    setNSFW(state: boolean): void {
        localStorage.setItem( this.NSFW_KEY, JSON.stringify( state ) );
    }

    getNSFW(): boolean {
        return JSON.parse( localStorage.getItem( this.NSFW_KEY ) ) ?? false;
    }

}