import { Component } from '@angular/core';

import { HomeStoreFacade } from '../+state/home-store.facade';

@Component({
  selector: 'p-one-wallets-section',
  templateUrl: './wallets-section.component.html',
  styleUrls: ['./wallets-section.component.scss'],
})
export class WalletsSectionComponent {
  public readonly wallets$ = this._facade.wallets$;

  constructor(private readonly _facade: HomeStoreFacade) {}
}
