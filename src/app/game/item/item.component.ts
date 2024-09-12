import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgClass } from '@angular/common';

interface DataList {
  [key: string]: any;
}

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  animations: [
    trigger('glowHandler', [
      state(
        'appear',
        style({
          opacity: 1,
        }),
      ),
      state(
        'disappear',
        style({
          opacity: 0,
        }),
      ),
      transition('appear <=> disappear', animate('1s ease-in-out')),
    ])
  ]

})

export class ItemComponent {
  @Input() selectedItem: any;

  itemDataList: DataList = {
    flashlight: {
      name: 'Svítilna',
      id: 'flashlight',
      text: 'Obyčejná ruční svítilna. Vypadá nabitá. Doporučeno pro temná místa.',
      img: './images/flashlight.png',
      glow: './images/flashlightGlow.png',
    },
    guardsHelmet: {
      name: 'Helma',
      id: 'guardsHelmet',
      text: 'Helma strážného. Uvnitř byla nalezena nahrávka. Vyrobeno společností B-Corp.',
      img: './images/guardsHelmet.png',
      glow: './images/guardsHelmetGlow.png',
    },
    revolver: {
      name: 'Revolver',
      id: 'revolver',
      text: 'Plně nabitý revolver. Trochu zrezivělý, ale stále funkční. Doporučuje se zvýšená opatrnost.',
      img: './images/revolver.png',
      glow: './images/revolverGlow.png',
    },
  };

  itemKeys = Object.keys(this.itemDataList);

  itemId = 'null';
  itemImg = '';
  itemGlow = '';
  animationState = 'disappear';
  private animationInterval: any;

  getItemData() {
    const index = this.itemKeys.indexOf(this.selectedItem);
    if (index !== -1) {
      return this.itemDataList[this.itemKeys[index]];
    }
    return null;
  }
  updateItemData() {
    if (this.getItemData() === null) {
      this.itemId = 'null';
      this.itemImg = '';
      this.itemGlow = '';
    } else {
      this.itemId = this.getItemData().id;
      this.itemImg = this.getItemData().img;
      this.itemGlow = this.getItemData().glow;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItem']) {
      this.updateItemData();
    }
  }

  mouseEntered() {
    this.animationState = 'appear';
    this.animationInterval = setInterval(() => {
      this.animationState = this.animationState === 'appear' ? 'disappear' : 'appear';
    }, 1000);
  }
  mouseLeft() {
    clearInterval(this.animationInterval);
    this.animationState = 'disappear';
  }
}
