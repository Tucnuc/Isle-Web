import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {
  @Input() backgroundImg = '';
}