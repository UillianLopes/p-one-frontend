import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BankModel, WalletModel } from '@p-one/financial';
import { map } from 'rxjs/operators';

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

  public openUpdateWalletDialog(wallet: WalletModel): void {
    this._facade.openUpdateWalletDialog(wallet);
  }

  public openDeleteWalletDialog(wallet: WalletModel): void {
    this._facade.openDeleteWalletDialog(wallet);
  }

  public openDepositWalletDialog(wallet: WalletModel): void {
    this._facade.openDepositWalletDialog(wallet);
  }

  public openWithdrawWalletDialog(wallet: WalletModel): void {
    this._facade.openWithdrawWalletDialog(wallet);
  }

  public setWalletsPage(page: number) {
    this._facade.setWalletsPage(page);
  }

  public displayBankFn = (bank: BankModel) =>
    bank ? `${bank.code} - ${bank.name}` : `---`;
}
