import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { StackedBarChartData } from '../../../../../../libs/shared/src/lib/chart/stacked-bar-chart/stacked-bar-char.data';

import { UserStoreFacade } from '../../stores/user-store/+state/user-store.facade';

@Component({
  selector: 'p-one-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = this._userStoreService.user$;

  data$ = of({} as StackedBarChartData)
  
  constructor(private readonly _userStoreService: UserStoreFacade) {}

  ngOnInit(): void {}
}
