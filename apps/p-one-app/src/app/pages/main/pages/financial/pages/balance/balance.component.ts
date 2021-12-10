import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { BalanceFacade } from './+state/balance.facade';

@Component({
  selector: 'p-one-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent implements OnInit {
  public readonly isLoading$ = this._facade.isLoading$;
  public readonly filtredPaginatedBalances$ =
    this._facade.filtredPaginatedBalances$;
  public readonly filtredBalancesLength$ = this._facade.filtredBalancesLength$;
  public readonly pageSize$ = this._facade.pagination$.pipe(
    map(({ pageSize }) => pageSize)
  );

  public readonly page$ = this._facade.pagination$.pipe(
    map(({ page }) => page)
  );

  constructor(private readonly _facade: BalanceFacade) {}

  ngOnInit(): void {
    this._facade.loadBalances()
  }

  public openCreateBalanceDialog(): void {
    this._facade.openCreateBalanceDialog();
  }

  public setBalancesPage(page: number) {
    this._facade.setBalancesPage(page);
  }
}
