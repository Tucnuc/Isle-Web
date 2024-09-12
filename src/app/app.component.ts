import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BackgroundComponent } from './background/background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Isle Web';
}
