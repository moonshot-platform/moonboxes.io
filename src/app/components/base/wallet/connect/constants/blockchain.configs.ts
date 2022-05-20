export const CHAIN_CONFIGS: any = {
  "1": {
    "name": "Ethereum Mainnet",
    "icon": "assets/media/images/blockchain/eth.webp"
  },
  "1285": {
    "name": "Moonriver Mainnet",
    "icon": "assets/media/images/blockchain/MOVR.webp"
  },
  "97": {
    "name": "BSC Testnet",
    "icon": "assets/media/images/blockchain/BSC.svg",
    "config": {
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x61',
        chainName: 'BSC Testnet',
        nativeCurrency: {
          symbol: 'BNB',
          decimals: 18,
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
        blockExplorerUrls: ['https://explorer.binance.org/smart-testnet']
      }],
    }
  },
  "56": {
    "name": "BSC Mainnet",
    "icon": "assets/media/images/blockchain/BSC.svg"
  },
  "137": {
    "name": "Polygon Mainnet",
    "icon": "assets/media/images/blockchain/polygon.svg"
  },
  "1287": {
    "name": "Moonbase Alpha",
    "icon": "assets/images/blockchain/MOVR.webp",
    "config": {
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x507',
        chainName: 'Moonbase Alpha',
        nativeCurrency: {
          symbol: 'DEV',
          decimals: 18,
        },
        rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
        blockExplorerUrls: ['https://moonbase.moonscan.io/']
      }],
    }
  }

}
