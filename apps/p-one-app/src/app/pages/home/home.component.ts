import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

import { StackedBarChartData } from '../../../../../../libs/shared/src/lib/chart/stacked-bar-chart/stacked-bar-char.data';
import { UserStoreFacade } from '../../stores/user-store/+state/user-store.facade';

@Component({
  selector: 'p-one-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = this._userStoreService.user$;

  readonly data$ = of({
    score: 40,
    series: [
      {
        leftValue: 20,
        rightValue: 48,
      },
      {
        leftValue: 26,
        rightValue: 45,
      },
      {
        leftValue: 30,
        rightValue: 50,
      },
      {
        leftValue: 22,
        rightValue: 60,
      },
      {
        leftValue: 15,
        rightValue: 95,
      },
      {
        leftValue: -99,
        rightValue: 66,
      },
      {
        leftValue: 32,
        rightValue: 67,
      },
    ],
  } as StackedBarChartData);

  readonly zoom$ = new BehaviorSubject<'normal' | 'zoomed'>('normal');

  constructor(private readonly _userStoreService: UserStoreFacade) {}

  ngOnInit(): void {}

  zoom() {
    if (this.zoom$.value == 'zoomed') {
      this.zoom$.next('normal');
      return;
    }
    this.zoom$.next('zoomed');
  }
}
