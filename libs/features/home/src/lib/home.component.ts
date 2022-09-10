import { Component, OnInit } from '@angular/core';

import { HomeStoreFacade } from './+state/home-store.facade';

@Component({
  selector: 'p-one-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public readonly wallets$ = this._facade.wallets$;

  constructor(private readonly _facade: HomeStoreFacade) {}

  public ngOnInit(): void {
    this._facade.loadWallets();
  }
}
