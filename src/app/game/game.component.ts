import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgOptimizedImage, NgIf } from '@angular/common';

import { InterfaceComponent } from '../interface/interface.component';
import { ArrowComponent } from './arrow/arrow.component';
import { BackgroundComponent } from "../background/background.component";
import { BlurComponent } from '../background/blur/blur.component';
import { ItemComponent } from './item/item.component';

interface DataList {
  [key: string]: any;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, NgIf, RouterLink, ArrowComponent, InterfaceComponent, BackgroundComponent, BlurComponent, ItemComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  img: string = './images/shipSpawn.png';
  currentLocation: string = '';

  locationList: DataList = {

    //   IMPACT ZONE SECTION
    // -----------------------

    impactZone1: {
      id: 'impactZone1',
      name: 'Impact Zone',
      img: './images/impactZone1.png',
      options: ['impactZone2', 'guardCamp', 'shipClose1', 'impactZone3'],
      optionsNames: ['Impact Zone', "Guard's Camp", 'Ship Deck', 'Impact Zone'],
      item: "",
    },
    impactZone2: {
      id: 'impactZone2',
      name: 'Impact Zone',
      img: './images/impactZone2.png',
      options: ['impactZone3', 'airdrop', 'impactZone1'],
      optionsNames: ['Impact Zone', 'Supply Drop', 'Impact Zone'],
      item: "",
    },
    impactZone3: {
      id: 'impactZone3',
      name: 'Impact Zone',
      img: './images/impactZone3.png',
      options: ['impactZone1', 'lighthouse', 'jungle', 'impactZone2'],
      optionsNames: ['Impact Zone', 'Lighthouse', 'Jungle', 'Impact Zone'],
      item: "",
    },
    guardCamp: {
      id: 'guardCamp',
      name: "Guard's Camp",
      img: './images/guardCamp.png',
      options: ['impactZone1'],
      optionsNames: ['Impact Zone'],
      item: 'guardsHelmet',
    },
    shipClose1: {
      id: 'shipClose1',
      name: 'Ship Deck',
      img: './images/shipSpawn.png',
      options: ['impactZone1', 'shipClose2'],
      optionsNames: ['Impact Zone', 'Ship Deck'],
      item: "",
    },
    shipClose2: {
      id: 'shipClose2',
      name: 'Ship Deck',
      img: './images/shipDeck.png',
      options: ['shipClose1', 'shipScavenge'],
      optionsNames: ['Ship Deck', 'Ship Deck'],
      item: "",
    },
    shipScavenge: {
      id: 'shipScavenge',
      name: 'Ship Deck',
      img: './images/shipScavenge.png',
      options: ['shipClose2'],
      optionsNames: ['Ship Deck'],
      item: 'flashlight',
    },

    airdrop: {
      id: 'airdrop',
      name: 'Supply Drop',
      img: './images/airdrop.png',
      options: ['villaFront', 'airdropClose', 'impactZone2'],
      optionsNames: ['Villa Front', 'Check Supply Drop', 'Impact Zone'],
      item: '',
    },
    airdropClose: {
      id: 'airdropClose',
      name: 'Supply Drop',
      img: './images/airdropClose.png',
      options: ['airdrop'],
      optionsNames: ['Supply Drop'],
      item: 'revolver',
    },


    lighthouse: {
      id: 'lighthouse',
      name: 'Lighthouse',
      img: '',
      options: ['impactZone3'],
      optionsNames: [],
      item: "",
    },

    jungle: {
      id: 'jungle',
      name: 'Jungle',
      img: '',
      options: ['impactZone3'],
      optionsNames: [],
      item: "",
    },

    villaFront: {
      id: 'villaFront',
      name: 'Villa Front',
      img: '',
      options: [],
      optionsNames: [],
      item: "",
    },

  };

  
  locationKeys = Object.keys(this.locationList);

  getLocationId() {
    return this.locationKeys.indexOf(this.currentLocation);
  }

  blurValue: boolean = false;
  triggerBlur() {
    this.blurValue = !this.blurValue;
  }

  optionsList: Array<string> = [];
  arrowsHandler() {
    this.optionsList = this.locationList[this.locationKeys[this.getLocationId()]];
  }

  currentTexts: any = {};
  selectionHandler(option: string) {
    console.log(`Vybral jsis ${option} 👍`);
    this.currentLocation = option;
    this.triggerBlur();
    setTimeout(() => {
      this.img = this.locationList[this.locationKeys[this.getLocationId()]].img;
      this.currentItem = this.locationList[this.locationKeys[this.getLocationId()]].item;
      this.arrowsHandler();
    }, 250);
  }

  currentItem = "";
  inspectItem() {}


  isInterfaceEnabled: boolean = false;
  areGogglesVisible: boolean = false;
  gottenGoggles: boolean = false;

  gettingGoggles() {
    this.triggerBlur();
    setTimeout(() => {
      this.img = './images/shipSpawnDown.png';
      this.areGogglesVisible = true;
    }, 600);
  };
  gotGoggles() {
    this.triggerBlur();
    setTimeout(() => {
      this.gottenGoggles = true;
      this.areGogglesVisible = false;
      this.img = './images/shipSpawn.png';
      this.isInterfaceEnabled = true;
      this.currentLocation = 'shipClose1';

      this.arrowsHandler();
    }, 600);
  };
  
}
