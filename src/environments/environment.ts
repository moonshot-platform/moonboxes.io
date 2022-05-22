// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  chainId: [97, 80001, 1287],
  providerTestNetURL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  providerMainNetURL: "https://bsc-dataseed1.binance.org",
  baseURL: "http://codetentacles-006-site31.htempurl.com/api/",
  ownerAddress: "0x703632A0b52244fAbca04aaE138fA8EcaF72dCBC",

  silverAddress: "0x46192Bd44C9066D425375326808109C7d97a2181",
  NFTAddress: "0x386ce3FeFa0ddBA12A8Ce8337529ebb0Fd6AD7ee",
  ArtistMoonBoxNftSwap: "0x4cbd04a30E4BBb3088B6e575f2D3320BfcCF644e",

  lootBoxAddress: "0x017792D0692591FF66686092293295ef245deD3b",     // New contract address for moonshot v2
  artistNFTAddress: "0x207A130458CCCe36816688C0eF3bDfA3f5ef0353",  // New contract address for moonshot v2
  buyContractAddress: "0xF683a2eC04A493Fc4e0FD7C3e4178fB9cef7508e",// for moonshot v2
  tokenContractAddress: "0xF683a2eC04A493Fc4e0FD7C3e4178fB9cef7508e",// for moonshot v2

  configFile: 'testnet',


  // lootboxAddress: "0xeA2c12cb5f65832dc68E694C3894001ba353aBDf",
  // artistNFTAddress: "0xF21Ae2f6469B4a38F49d98173f218d77165C9b2f",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
