import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { convetWalletIntoOption as convertWalletIntoOption, WalletModel, WalletOptionModel } from '@p-one/domain/financial';
import { DestroyableMixin, PONE_DIALOG_DATA, updateValueAndValidityMarkingControlsAreDirty } from '@p-one/shared';
import { SettingsStoreFacade } from '@p-one/stores/identity';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { FoundTransferModalStore } from './found-transfer-modal.state';
import { validateFoundTransfrerModalForm } from './fount-transfer-step.model';

@Component({
  selector: 'p-one-found-transfer-modal',
  templateUrl: './found-transfer-modal.component.html',
  styleUrls: ['./found-transfer-modal.component.scss'],
  providers: [FoundTransferModalStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoundTransferModalComponent
  extends DestroyableMixin()
  implements OnInit
{
  public readonly form = this._formBuilder.group({
    title: [null, Validators.required],
    value: [0.0, Validators.required],
    origin: [
      {
        wallet: convertWalletIntoOption(this._wallet),
        category: null,
        subCategory: null,
      },
      [Validators.required, validateFoundTransfrerModalForm],
    ],
    destination: [
      {
        wallet: null,
        category: null,
        subCategory: null,
      },
      [Validators.required, validateFoundTransfrerModalForm],
    ],
  });

  public readonly origin = this.form.get('origin') as UntypedFormGroup;
  public readonly destination = this.form.get(
    'destination'
  ) as UntypedFormGroup;

  public readonly originWallet = this.origin.get('wallet') as FormControl;
  public readonly destinationWallet = this.destination.get(
    'wallet'
  ) as FormControl;

  public readonly isLoading$ = this._store.isLoading$;
  public readonly debitCategories$ = this._store.debitCategories$;
  public readonly creditCategories$ = this._store.creditCategories$;

  public readonly destinationWallets$ = this._store.destinations$;
  public readonly originWallets$ = this._store.origins$;

  public readonly currency$ = combineLatest([
    this._store.currency$,
    this._settingsStoreFacade.settingsCurrency$,
  ]).pipe(map(([currency, settingsCurrency]) => currency ?? settingsCurrency));

  public readonly hasData$ = this._store.hasData$;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _store: FoundTransferModalStore,
    private readonly _settingsStoreFacade: SettingsStoreFacade,
    @Optional() @Inject(PONE_DIALOG_DATA) private readonly _wallet: WalletModel
  ) {
    super();
  }

  public ngOnInit(): void {
    this._store.load();
  }

  public onDestinationWalletChange(wallet: WalletOptionModel | null): void {
    this._store.setDestination(wallet);
  }

  public onOrignWalletChange(wallet: WalletOptionModel | null): void {
    this._store.setOrigin(wallet);
  }

  public transfer(): void {
    updateValueAndValidityMarkingControlsAreDirty(this.form);

    if (this.form.invalid) return;

    const { origin, destination, ...value } = this.form.value;

    this._store.transfer({
      ...value,
      origin: {
        walletId: origin.wallet.id,
        categoryId: origin.category.id,
        subCategoryId: origin.subCategory?.id,
      },
      destination: {
        walletId: destination.wallet.id,
        categoryId: destination.category.id,
        subCategoryId: destination.subCategory?.id,
      },
    });
  }
}
