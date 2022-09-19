import { Component, NgZone, OnInit } from '@angular/core';
import { BlazeTryData } from '@p-one/shared';
import { BehaviorSubject } from 'rxjs';

import { HomeStoreFacade } from './+state/home-store.facade';

@Component({
  selector: 'p-one-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public readonly wallets$ = this._facade.wallets$;

  public readonly value$ = new BehaviorSubject<BlazeTryData>({
    time: 0,
    multiplier: 0,
  });

  constructor(
    private readonly _facade: HomeStoreFacade,
    private readonly _zone: NgZone
  ) {}

  public ngOnInit(): void {
    this._facade.loadWallets();

    let time = 0;
    let multiplier = 0;

    setInterval(() => {
      this._zone.run(() => {
        time += 0.1;
        multiplier += 0.02;
        this.value$.next({
          time: time,
          multiplier: multiplier,
        });
      });
    }, 100);
  }
}
