export interface Artist {
    status:        number;
    isSuccess:     boolean;
    data:          Supply[];
    walletAddress: string;
    ArtistName:    string;
    name:          string;
    description:   string;
    filePath:      string;
}

export interface Supply {
    type:          string;
    price:         number;
    signature:     string;
    NSFW:          boolean;
    id:            number;
    limitPerTxn:   number;
    isUpcoming:    boolean;
    currentSupply: number;
}