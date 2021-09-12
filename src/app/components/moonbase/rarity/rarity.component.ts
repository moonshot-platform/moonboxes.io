import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rarity',
  templateUrl: './rarity.component.html',
  styleUrls: ['./rarity.component.scss']
})
export class RarityComponent implements OnInit {

  static readonly routeName: string = 'rarity';

  sortedOnRarity = false;

  rarityLevels = [
    [20, 100],
    [5, 19.99],
    [1, 4.99],
    [0, 0.99]
  ]

  categories = [
    'Animated',
    'Static',
    'Flag',
    'Jedi Sword',
    'Chest',
    'Moon',
    'Visor',
    'Badge',
    'Gloves',
    'Color',
    'Tier',
  ]

  items = [
    {
      name: 'Animated Floating In Space',
      image: '01_Animated-floating-in-space.png',
      category: 'Animated',
      rarityNumber: 10,
      rarityPercentage: 10,
    },
    {
      name: 'Animated Floating Inside The Rocket',
      image: '02_Animated-inside-the-rocket.png',
      category: 'Animated',
      rarityNumber: 10,
      rarityPercentage: 10,
    },
    {
      name: 'Animated In Front Of The Rocket',
      image: '03_Animated-in-front-of-the-rocket.png',
      category: 'Animated',
      rarityNumber: 10,
      rarityPercentage: 10,
    },
    {
      name: 'Animated Asteroids',
      image: '04_Animated-asteroids.png',
      category: 'Animated',
      rarityNumber: 10,
      rarityPercentage: 10,
    },
    {
      name: 'Animated Astronaut in the Ocean',
      image: '05_Animated-astronaut-in-the-ocean.png',
      category: 'Animated',
      rarityNumber: 10,
      rarityPercentage: 10,
    },
    {
      name: 'Static Astronaut In Ocean',
      image: '11_Static-BG-Astronaut-in-ocean.png',
      category: 'Static',
      rarityNumber: 24,
      rarityPercentage: 4.17,
    },
    {
      name: 'Static In Front Of Rocket',
      image: '10_Static-BG-in-front-of-rocket.png',
      category: 'Static',
      rarityNumber: 47,
      rarityPercentage: 2.13,
    },
    {
      name: 'Static Asteroids',
      image: '09_Static-BG-Asteroids.png',
      category: 'Static',
      rarityNumber: 71,
      rarityPercentage: 1.41,
    },
    {
      name: 'Static Floating In Front Of The Rocket',
      image: '08_Static-BG-in-front-of-the-rocket.png',
      category: 'Static',
      rarityNumber: 95,
      rarityPercentage: 1.05,
    },
    {
      name: 'Static Floating In Space',
      image: '07_Static-BG-Floating-in-space.png',
      category: 'Static',
      rarityNumber: 238,
      rarityPercentage: 0.42,
    },
    {
      name: 'Static Standing On the Moon',
      image: '06_Static-BG-standing-on-the-moon.png',
      category: 'Static',
      rarityNumber: 475,
      rarityPercentage: 0.21,
    },
    {
      name: 'Flag Moonshot Logo',
      image: '12_Flag_Moonshot_logo.png',
      category: 'Flag',
      rarityNumber: 425,
      rarityPercentage: 0.24,
    },
    {
      name: 'Jedi Sword Green',
      image: '13_Jedi-Sword-green.png',
      category: 'Jedi Sword',
      rarityNumber: 175,
      rarityPercentage: 0.57,
    },
    {
      name: 'Jedi Sword Red',
      image: '14_Jedi-Sword-red.png',
      category: 'Jedi Sword',
      rarityNumber: 175,
      rarityPercentage: 0.57,
    },
    
    {
      name: 'Diamond Chest',
      image: '18_Diamond-chest.png',
      category: 'Chest',
      rarityNumber: 10,
      rarityPercentage: 10,
    },
    {
      name: 'Gold Chest',
      image: '17_Gold-chest.png',
      category: 'Chest',
      rarityNumber: 40,
      rarityPercentage: 2.5,
    },
    {
      name: 'Silver Chest',
      image: '16_-Silver-chest.png',
      category: 'Chest',
      rarityNumber: 60,
      rarityPercentage: 1.67,
    },
    {
      name: 'Wooden Chest',
      image: '15_Wooden-chest.png',
      category: 'Chest',
      rarityNumber: 90,
      rarityPercentage: 1.11,
    },

    {
      name: 'Diamond Hands With Moon',
      image: '19_Diamond-hands-with-moon.png',
      category: 'Moon',
      rarityNumber: 25,
      rarityPercentage: 4,
    },

    {
      name: 'Visor In Black',
      image:'29_Visor-in-black.png',
      category: 'Visor',
      rarityNumber: 1,
      rarityPercentage: 100,
    },
    {
      name: 'Visor In Gold',
      image:'28_Visor-in-gold.png',
      category: 'Visor',
      rarityNumber: 5,
      rarityPercentage: 20,
    },
    {
      name: 'Visor In Silver',
      image:'27_Visor-in-silver.png',
      category: 'Visor',
      rarityNumber: 15,
      rarityPercentage: 6.67,
    },
    {
      name: 'Visor In Bronze',
      image:'26_Visor-in-bronze.png',
      category: 'Visor',
      rarityNumber: 29,
      rarityPercentage: 3.45,
    },
    {
      name: 'Visor In Emerald Green',
      image:'25_Visor-in-emerald-green.png',
      category: 'Visor',
      rarityNumber: 75,
      rarityPercentage: 1.33,
    },
    {
      name: 'Visor In Ruby Red',
      image:'24_Visor-in-ruby-red.png',
      category: 'Visor',
      rarityNumber: 100,
      rarityPercentage: 1,
    },
    {
      name: 'Visor In Pink',
      image:'23_Visor-in-pink.png',
      category: 'Visor',
      rarityNumber: 125,
      rarityPercentage: 0.8,
    },
    {
      name: 'Visor In Sapphire Blue',
      image:'22_Visor-in-sapphire-blue.png',
      category: 'Visor',
      rarityNumber: 150,
      rarityPercentage: 0.67,
    },
    {
      name: 'Visor In Purple',
      image:'21_Visor-in-purple.png',
      category: 'Visor',
      rarityNumber: 200,
      rarityPercentage: 0.5,
    },
    {
      name: 'Visor In White',
      image:'20_Visor-in-white.png',
      category: 'Visor',
      rarityNumber: 300,
      rarityPercentage: 0.33,
    },
    
    {
      name: 'Badge Waning Crescent',
      image:'37_Badge-Waning-crescent.png',
      category: 'Badge',
      rarityNumber: 25,
      rarityPercentage: 4,
    },
    {
      name: 'Badge Last Quarter',
      image:'36_Badge-Last-quarter.png',
      category: 'Badge',
      rarityNumber: 50,
      rarityPercentage: 2,
    },
    {
      name: 'Badge Waning Gibbous',
      image:'35_Badge-Waning-gibbous.png',
      category: 'Badge',
      rarityNumber: 75,
      rarityPercentage: 1.33,
    },
    {
      name: 'Badge Full Moon',
      image:'34_Badge-Full-Moon.png',
      category: 'Badge',
      rarityNumber: 100,
      rarityPercentage: 1,
    },
    {
      name: 'Badge Waxing Gibbous',
      image:'33_Badge-Waxing-gibbous.png',
      category: 'Badge',
      rarityNumber: 125,
      rarityPercentage: 0.8,
    },
    {
      name: 'Badge First Quarter',
      image:'32_Badge-First-quarter.png',
      category: 'Badge',
      rarityNumber: 150,
      rarityPercentage: 0.67,
    },
    {
      name: 'Badge Waxing Crescent',
      image:'31_Badge-Waxing-crescent.png',
      category: 'Badge',
      rarityNumber: 2400,
      rarityPercentage: 0.04,
    },
    {
      name: 'Badge New Moon',
      image:'30_Badge-New-Moon.png',
      category: 'Badge',
      rarityNumber: 275,
      rarityPercentage: 0.36,
    },
    
    {
      name: 'Gloves Full Black',
      image:'48_Gloves-full-black.png',
      category: 'Gloves',
      rarityNumber: 1,
      rarityPercentage: 100,
    },
    {
      name: 'Gloves Gold',
      image:'47_Gloves-gold.png',
      category: 'Gloves',
      rarityNumber: 5,
      rarityPercentage: 20,
    },
    {
      name: 'Gloves Silver',
      image:'46_Gloves-silver.png',
      category: 'Gloves',
      rarityNumber: 15,
      rarityPercentage: 6.67,
    },
    {
      name: 'Gloves Bronze',
      image:'45_Gloves-bronze.png',
      category: 'Gloves',
      rarityNumber: 29,
      rarityPercentage: 3.45,
    },
    {
      name: 'Gloves Emerald Green',
      image:'44_Gloves-emerald-green.png',
      category: 'Gloves',
      rarityNumber: 75,
      rarityPercentage: 1.33,
    },
    {
      name: 'Gloves Ruby Red',
      image:'43_Gloves-ruby-red.png',
      category: 'Gloves',
      rarityNumber: 100,
      rarityPercentage: 1,
    },
    {
      name: 'Gloves Pink',
      image:'42_Gloves-pink.png',
      category: 'Gloves',
      rarityNumber: 125,
      rarityPercentage: 0.8,
    },
    {
      name: 'Gloves Sapphier Blue',
      image:'40_Gloves-sapphire-blue.png',
      category: 'Gloves',
      rarityNumber: 150,
      rarityPercentage: 0.67,
    },
    {
      name: 'Gloves Purple',
      image:'39_Gloves-purple.png',
      category: 'Gloves',
      rarityNumber: 200,
      rarityPercentage: 0.5,
    },
    {
      name: 'Gloves White',
      image:'38_Gloves-white.png',
      category: 'Gloves',
      rarityNumber: 300,
      rarityPercentage: 0.33,
    },
    
    {
      name: 'Color Full Black',
      image:'58_Color-full-black.png',
      category: 'Color',
      rarityNumber: 1,
      rarityPercentage: 100,
    },
    {
      name: 'Color Gold',
      image:'55_Color-Gold.png',
      category: 'Color',
      rarityNumber: 5,
      rarityPercentage: 20,
    },
    {
      name: 'Color Silver',
      image:'56_Color-Silver.png',
      category: 'Color',
      rarityNumber: 15,
      rarityPercentage: 6.67,
    },
    {
      name: 'Color Bronze',
      image:'57_Color-bronze.png',
      category: 'Color',
      rarityNumber: 29,
      rarityPercentage: 3.45,
    },
    {
      name: 'Color Emerald Green',
      image:'54_Color-Emerald-Green.png',
      category: 'Color',
      rarityNumber: 75,
      rarityPercentage: 1.33,
    },
    {
      name: 'Color Ruby Red',
      image:'53_Color-Ruby-Red.png',
      category: 'Color',
      rarityNumber: 100,
      rarityPercentage: 1,
    },
    {
      name: 'Color Pink',
      image:'52_Color-Pink.png',
      category: 'Color',
      rarityNumber: 125,
      rarityPercentage: 0.80,
    },
    {
      name: 'Color Sapphire Blue',
      image:'51_Color-Sapphire-Blue.png',
      category: 'Color',
      rarityNumber: 150,
      rarityPercentage: 0.67,
    },
    {
      name: 'Color Purple',
      image:'50_Color-Purple.png',
      category: 'Color',
      rarityNumber: 200,
      rarityPercentage: 0.5,
    },
    {
      name: 'Color White',
      image:'49_Color-White.png',
      category: 'Color',
      rarityNumber: 300,
      rarityPercentage: 0.33,
    },
    
    {
      name: 'Black Tier',
      image:'62_Black-tier.png',
      category: 'Tier',
      rarityNumber: 1,
      rarityPercentage: 100,
    },
    {
      name: 'Gold Tier',
      image:'61_Gold-tier.png',
      category: 'Tier',
      rarityNumber: 5,
      rarityPercentage: 20,
    },
    {
      name: 'Silver Tier',
      image:'60_Silver-tier.png',
      category: 'Tier',
      rarityNumber: 15,
      rarityPercentage: 6.67,
    },
    {
      name: 'Bronze Tier',
      image:'59_Bronze-tier.png',
      category: 'Tier',
      rarityNumber: 29,
      rarityPercentage: 3.45,
    },
    {
      name: 'Common Tier',
      image:'63_Common-tier.png',
      category: 'Tier',
      rarityNumber: 950,
      rarityPercentage: 0.11,
    },
  ]

  newList = []

  constructor() { }

  ngOnInit(): void {
  }

  getAvailableCategories() : any {
    let list = {}
    
    this.items.forEach( value => {
      list[value.category] = list[value.category] || []
      list[value.category].push(value)
    } );

    return list
  }

  getRareDrops() : any {
    let list = [
      {
        rarity: [20, 100],
        content: []
      },
      {
        rarity: [5, 19.99],
        content: []
      },
      {
        rarity: [1, 4.99],
        content: []
      },
      {
        rarity: [0, 0.99],
        content: []
      }
    ]
    
    this.items.forEach( value => {
      
      for( let i = 0; i < this.rarityLevels.length; i++ ) {
        if( value.rarityPercentage >= this.rarityLevels[i][0] ) {
          list[i].content.push( value )
          break;
        }
      }

    } );

    list.forEach(value => {
      
      value.content.sort( ( a, b ) => {
        if ( a.rarityPercentage > b.rarityPercentage )
          return -1;
        else if ( a.rarityPercentage < b.rarityPercentage )
          return 1;
        
        return 0;
      } );

    })

    return list
  }

  trackByFn(index, item) {
    return item.title;
  }

}