import { Component } from '@angular/core';
import { BackgroundComponent } from '../background/background.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [BackgroundComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  img = './images/menu.png'
}
