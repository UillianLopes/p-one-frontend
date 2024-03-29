import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { BankModel, WalletModel } from '@p-one/domain/financial';
import { DestroyableMixin } from '@p-one/shared';
import { SettingsStoreFacade } from '@p-one/stores/identity';
import { map, takeUntil } from 'rxjs/operators';

import { WalletFacade } from './+state/wallet-store.facade';

@Component({
  selector: 'p-one-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent extends DestroyableMixin() implements OnInit {
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

  public readonly filterControl = new UntypedFormControl('');
  public readonly settingsCurrency$ =
    this._settingsStoreFacade.settingsCurrency$;

  public readonly trackByWalletId = (_: number, wallet: WalletModel) =>
    wallet.id;

  constructor(
    private readonly _facade: WalletFacade,
    private readonly _settingsStoreFacade: SettingsStoreFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this._facade.loadWallets();
    this.filterControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this._facade.filterWallets(value);
      });
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

  public openTransferFoundsDialog(wallet: WalletModel): void {
    this._facade.openTransferFoundsDialog(wallet);
  }

  public setWalletsPage(page: number) {
    this._facade.setWalletsPage(page);
  }

  public displayBankFn = (bank: BankModel) =>
    bank ? `${bank.code} - ${bank.name}` : `---`;
}
