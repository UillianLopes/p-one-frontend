import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'p-one-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @Input()
  image?: string;
}
