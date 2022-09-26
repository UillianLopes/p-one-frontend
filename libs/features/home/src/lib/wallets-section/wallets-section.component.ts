import { Component, OnInit } from '@angular/core';
import { trackById } from '@p-one/core';

import { HomeStoreFacade } from '../+state/home-store.facade';

@Component({
  selector: 'p-one-wallets-section',
  templateUrl: './wallets-section.component.html',
  styleUrls: ['./wallets-section.component.scss'],
})
export class WalletsSectionComponent implements OnInit {
  public readonly wallets$ = this._facade.wallets$;

  public readonly trackById = trackById;

  constructor(private readonly _facade: HomeStoreFacade) {}

  public ngOnInit(): void {
    this._facade.loadWallets();
  }
}
