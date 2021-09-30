import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'p-one-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'p-one-header',
  },
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {}
