import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { NgClass, NgStyle } from '@angular/common';

interface DataList {
  [key: string]: any;
}

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [NgClass, NgStyle],
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
    ]),

    trigger('partFadeInOut', [
      state('appear', style({ opacity: 1 })),
      state('disappear', style({ opacity: 0 })),
      transition('appear <=> disappear', [
        animate('{{ duration }}ms {{ delay }}ms ease-in-out')
      ])
    ]),
  ]

})

export class ItemComponent implements AfterViewInit {
  @Input() selectedItem: any;
  @ViewChild('itemCon') itemContainer!: ElementRef;
  @ViewChild('descriptionCon') descriptionCon!: ElementRef;

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
  itemName = '';
  itemText = '';
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
      this.itemName = '';
      this.itemText = '';
    } else {
      this.itemId = this.getItemData().id;
      this.itemImg = this.getItemData().img;
      this.itemGlow = this.getItemData().glow;
      this.itemName = this.getItemData().name;
      this.itemText = this.getItemData().text;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItem']) {
      this.updateItemData();
    }
  }

  ngAfterViewInit(): void {}

  descriptionClass = '';
  descriptionSvgAnimationState = 'disappear'
  transformStyle = '';

  descriptionHandler() {
      const rect = this.itemContainer.nativeElement.getBoundingClientRect();
      const leftPercent = (rect.left / window.innerWidth) * 100;
      const bottomPercent = ((window.innerHeight - rect.bottom) / window.innerHeight) * 100;

      this.descriptionClass = '';

      if (leftPercent < 50) {
        this.descriptionClass += 'Right';
      } else {
        this.descriptionClass += 'Left';
      }
      if (bottomPercent < 50) {
        this.descriptionClass += 'Up';
      } else {
        this.descriptionClass += 'Up';
      }

      const descriptionCon = this.descriptionCon.nativeElement;

      if (this.descriptionClass === 'RightUp') {
        descriptionCon.style.top = `${rect.top - 400}px`;
        descriptionCon.style.left = `${rect.left}px`;
        this.transformStyle = 'rotate(0deg) scaleX(1)';

      } else if (this.descriptionClass === 'LeftUp') {
        descriptionCon.style.top = `${rect.top - 400}px`;
        descriptionCon.style.left = `${rect.left - 620.25}px`;
        this.transformStyle = 'rotate(0deg) scaleX(-1)';

      } else if (this.descriptionClass === 'RightDown') {
        descriptionCon.style.top = `${rect.top}px`;
        descriptionCon.style.left = `${rect.left}px`;
        this.transformStyle = 'rotate(180deg) scaleX(1)';

      } else if (this.descriptionClass === 'LeftDown') {
        descriptionCon.style.top = `${rect.top}px`;
        descriptionCon.style.left = `${rect.left - 620.25}px`;
        this.transformStyle = 'rotate(180deg) scaleX(-1)';

      }

      descriptionCon.style.zIndex = 1;
      this.descriptionSvgAnimationState = 'appear'
  }
  
  mouseEntered() {
    this.animationState = 'appear';
    this.animationInterval = setInterval(() => {
      this.animationState = this.animationState === 'appear' ? 'disappear' : 'appear';
    }, 1000);
    this.descriptionHandler();
  }
  mouseLeft() {
    clearInterval(this.animationInterval);
    this.animationState = 'disappear';
    this.descriptionSvgAnimationState = 'disappear';
    setTimeout(() => {
      this.descriptionCon.nativeElement.style.zIndex = -1;
    }, 500);
  }

}