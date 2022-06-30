import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, FormGroupName } from '@angular/forms';
import {
  CategoryModel,
  SubCategoryModel,
  WalletModel,
} from '@p-one/domain/financial';
import { DestroyableMixin } from '@p-one/shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FoundTransferStepStore } from './found-transfer-step.state';

@Component({
  selector: 'p-one-found-transfer-step',
  templateUrl: './found-transfer-step.component.html',
  styleUrls: ['./found-transfer-step.component.scss'],
  providers: [FoundTransferStepStore],
  encapsulation: ViewEncapsulation.None,
})
export class FoundTransferStepComponent
  extends DestroyableMixin()
  implements OnInit
{
  public readonly wallets$ = this._foundTransferStepStore.wallets$;
  public readonly categories$ = this._foundTransferStepStore.categories$;
  public readonly subCategories$ = this._foundTransferStepStore.subCategories$;
  public readonly isWalletDisabled$ =
    this._foundTransferStepStore.isWalletDisabled$;

  @Input()
  set isWalletDisabled(isWalletDisabled: boolean) {
    this._foundTransferStepStore.setIsWalletDisabled(isWalletDisabled);
  }

  @Input()
  set categories(categories: CategoryModel[]) {
    this._foundTransferStepStore.setCategories(categories);
  }

  @Input()
  set subCategories(subCategories: SubCategoryModel[]) {
    this._foundTransferStepStore.setCategories(subCategories);
  }

  @Input()
  set wallets(wallets: WalletModel[]) {
    this._foundTransferStepStore.setWallets(wallets);
  }

  public readonly displayFn = (obj: any) => obj?.name;
  public readonly subject$ = new Subject();

  private _onChange?: (value: any) => void;
  private _onTouched?: () => void;

  public form: UntypedFormGroup;

  constructor(
    private readonly _foundTransferStepStore: FoundTransferStepStore,
    private readonly _formGroupName: FormGroupName
  ) {
    super();
  }

  public ngOnInit(): void {
    this.form = this._formGroupName.control;
    if (!this.form) {
      return;
    }

    this._foundTransferStepStore.isWalletDisabled$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isWalletDisabled) => {
        if (isWalletDisabled) {
          this.form.get('wallet').disable();
        }
      });

    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        if (this._onChange) this._onChange(value);
        if (this._onTouched) this._onTouched();
      });

    this.form
      .get('category')
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((category) => {
        if (!category) {
          return;
        }
        this._foundTransferStepStore.loadSubCategories(category.id);
      });
  }
}
