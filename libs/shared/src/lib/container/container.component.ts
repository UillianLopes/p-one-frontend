import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'p-one-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  host: {
    class: 'p-one-container',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ContainerComponent {}
