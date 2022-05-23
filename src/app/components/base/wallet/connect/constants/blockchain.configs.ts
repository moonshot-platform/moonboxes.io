export const CHAIN_CONFIGS: any = {
  "1": {
    "name": "Ethereum Mainnet",
    "icon": "assets/media/images/blockchain/eth.webp",
    "bg": "black",
  },
  "1285": {
    "name": "Moonriver Mainnet",
    "icon": "assets/media/images/blockchain/MOVR.webp",
    "bg": "#6e56a4",
  },
  "97": {
    "name": "BSC Testnet",
    "icon": "assets/media/images/blockchain/BSC.svg",
    "bg": "black",
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
    "icon": "assets/media/images/blockchain/BSC.svg",
    "bg": "black",
  },
  "137": {
    "name": "Polygon Mainnet",
    "icon": "assets/media/images/blockchain/polygon.svg",
    "bg": "#6e56a4",
  },
  "1287": {
    "name": "Moonbase Alpha",
    "icon": "assets/media/images/blockchain/MOVR.webp",
    "bg": "black",
    "config": {
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x507',
        chainName: 'Moonbase Alpha',
        nativeCurrency: {
          symbol: 'DEV',
          decimals: 18,
        },
        rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
        blockExplorerUrls: ['https://moonbase.moonscan.io/']
      }],
    }
  },
  "80001": {
    "name": "Mumbai Testnet",
    "icon": "assets/media/images/blockchain/mumbai.webp",
    "bg": "white",
    "config": {
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x13881',
        chainName: 'Mumbai Testnet',
        nativeCurrency: {
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
        blockExplorerUrls: ['https://polygonscan.com/']
      }],
    }
  }
}
