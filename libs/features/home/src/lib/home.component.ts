import { Component, NgZone } from '@angular/core';

import { HomeStoreFacade } from './+state/home-store.facade';

@Component({
  selector: 'p-one-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private readonly _facade: HomeStoreFacade,
    private readonly _zone: NgZone
  ) {}
}
