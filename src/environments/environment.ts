// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  chainId: [97, 80001, 1287,4,568],
  moonSeaChinIds: [1, 3, 4,2,5],
  providerTestNetURL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  providerURL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  providerMainNetURL: "https://bsc-dataseed1.binance.org",
  baseURL: "http://codetentacles-006-site31.htempurl.com/api/",
  ownerAddress: "0x703632A0b52244fAbca04aaE138fA8EcaF72dCBC",
  // silverAddress: "0x46192Bd44C9066D425375326808109C7d97a2181",

  NFTAddress: "0x94f1f1B3038e11E07FbFcC82357F69691c40DF42",
  lootBoxAddress: "0x017792D0692591FF66686092293295ef245deD3b",     // New contract address for moonshot v2

  artistNFTAddress: "0xe3D279f66776Efae7602D817f68015a0afA0Fd2E",  // New contract address for moonshot v2
  buyContractAddress: "0xEF85Fd14392B24E86e43D2A3014C733F862bc7B8",// for moonshot v2
  tokenContractAddress: "0x3F4E053184Bef016286D07189FB60c61A6eF972F",// for moonshot v2

  configFile: 'testnet',
  adminPanelUrl : "http://codetentacles-006-site41.htempurl.com/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
