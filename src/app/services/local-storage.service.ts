export class LocalStorageService {

    public readonly NSFW_KEY: string = 'nsfw';
    public readonly WALLET_KEY: string = 'wallet';
    public readonly ADDRESS_KEY: string = 'address';

    set(key: string, val: any): void {
        localStorage.setItem( key, val );
    }

    get(key: string): any {
        return localStorage.getItem( key ) ?? false;
    }

    remove(key: string): void {
        localStorage.remove( key );
    }

    setNSFW(state: boolean): void {
        localStorage.setItem( this.NSFW_KEY, JSON.stringify( state ) );
    }

    getNSFW(): boolean {
        return JSON.parse( localStorage.getItem( this.NSFW_KEY ) ) ?? false;
    }

    setWallet(wallet: number): void {
        localStorage.setItem( this.NSFW_KEY, JSON.stringify( wallet ) );
    }

    getWallet(): number {
        return JSON.parse( localStorage.getItem( this.NSFW_KEY ) );
    }

    removeWallet(): void {
        localStorage.remove( this.WALLET_KEY );
    }

    setAddress(address: string): void {
        localStorage.setItem( this.NSFW_KEY, address );
    }

    getAddress(): string {
        return localStorage.getItem( this.NSFW_KEY );
    }

}