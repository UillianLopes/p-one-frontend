import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { BankModel, WalletModel } from '../../../../../../../../../../libs/core/src';
import { WalletFacade } from './+state/wallet.facade';

@Component({
  selector: 'p-one-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent implements OnInit {
  public readonly isLoading$ = this._facade.isLoading$;
  public readonly filtredPaginatedWallets$ =
    this._facade.filtredPaginatedWallets$;
  public readonly filtredWalletsLength$ = this._facade.filtredWalletsLength$;
  public readonly pageSize$ = this._facade.pagination$.pipe(
    map(({ pageSize }) => pageSize)
  );

  public readonly page$ = this._facade.pagination$.pipe(
    map(({ page }) => page)
  );

  constructor(private readonly _facade: WalletFacade) {}

  ngOnInit(): void {
    this._facade.loadWallets();
  }

  public openCreateWalletDialog(): void {
    this._facade.openCreateWalletDialog();
  }

  public openUpdateWalletDialog(balance: WalletModel): void {
    this._facade.openUpdateWalletDialog(balance);
  }

  public openDeleteWalletDialog(balance: WalletModel): void {
    this._facade.openDeleteWalletDialog(balance);
  }

  public setWalletsPage(page: number) {
    this._facade.setWalletsPage(page);
  }

  public displayBankFn = (bank: BankModel) =>
    bank ? `${bank.code} - ${bank.name}` : `---`;
}
