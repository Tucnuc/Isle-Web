import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-arrow',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './arrow.component.html',
  styleUrl: './arrow.component.scss'
})
export class ArrowComponent {
  @Input() locationData: any;
  
  @Output() locationSelected = new EventEmitter<string>();

  optionClicked(option: string) {
    this.locationSelected.emit(option);
  }
}

// const button = document.querySelector('[data-location="someLocation"]');