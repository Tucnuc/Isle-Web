import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-interface',
  standalone: true,
  imports: [],
  templateUrl: './interface.component.html',
  styleUrl: './interface.component.scss'
})
export class InterfaceComponent {
  @Input() currentTexts: any;

  text = 'PLACEHOLDER';

  OnChanges(changes: SimpleChanges) {
    if(changes['currentTexts']) {
      console.log(this.currentTexts);
      this.text = this.currentTexts
    }
  }
}
