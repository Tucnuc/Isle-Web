import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-blur',
  standalone: true,
  imports: [],
  templateUrl: './blur.component.html',
  styleUrl: './blur.component.scss',
  animations: [
    trigger('blurHandler', [
      state(
        'appear',
        style({
          display: 'block',
          opacity: 1,
        }),
      ),
      state(
        'disappear',
        style({
          opacity: 0,
          display: 'none',
        }),
      ),
      transition('appear <=> disappear', [animate('250ms ease-in')]),
    ])
  ]

})

export class BlurComponent {
  @Input() blurActivator: boolean = false;
  animationState = 'disappear';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['blurActivator'] && !changes['blurActivator'].isFirstChange()) {
      this.toggleAnimation();
    }
  }

  toggleAnimation() {
    this.animationState = this.animationState === 'appear' ? 'disappear' : 'appear';
    setTimeout(() => {
      this.animationState = this.animationState === 'appear' ? 'disappear' : 'appear';
    }, 750);
  }
}
