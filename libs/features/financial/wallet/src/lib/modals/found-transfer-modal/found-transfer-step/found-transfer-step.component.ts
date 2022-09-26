import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, UntypedFormBuilder } from '@angular/forms';
import { OptionModel } from '@p-one/core';
import { WalletOptionModel } from '@p-one/domain/financial';
import { DestroyableMixin } from '@p-one/shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FoundTransferModalForm } from '../fount-transfer-step.model';
import { FoundTransferStepStore } from './found-transfer-step.state';

@Component({
  selector: 'p-one-found-transfer-step',
  templateUrl: './found-transfer-step.component.html',
  styleUrls: ['./found-transfer-step.component.scss'],
  providers: [
    FoundTransferStepStore,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FoundTransferStepComponent,
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FoundTransferStepComponent
  extends DestroyableMixin()
  implements OnInit, ControlValueAccessor
{
  readonly subject$ = new Subject();
  readonly wallets$ = this._foundTransferStepStore.wallets$;
  readonly categories$ = this._foundTransferStepStore.categories$;
  readonly subCategories$ = this._foundTransferStepStore.subCategories$;
  readonly isWalletDisabled$ = this._foundTransferStepStore.isWalletDisabled$;

  readonly form = this._formBuilder.group({
    wallet: [null],
    category: [null],
    subCategory: [null],
  });
  readonly walletControl = this.form.get('wallet') as FormControl;
  readonly subCategoryControl = this.form.get('subCategory') as FormControl;
  readonly categoryControl = this.form.get('category') as FormControl;

  @Output()
  readonly walletChange = new EventEmitter<WalletOptionModel | null>();

  @Input()
  set isWalletDisabled(isWalletDisabled: boolean) {
    this._foundTransferStepStore.setIsWalletDisabled(isWalletDisabled);
  }

  @Input()
  set categories(categories: OptionModel[]) {
    this._foundTransferStepStore.setCategories(categories);
  }

  @Input()
  set wallets(wallets: WalletOptionModel[]) {
    this._foundTransferStepStore.setWallets(wallets);
  }

  private _onChange?: (value: FoundTransferModalForm | null) => void;
  private _onTouched?: () => void;

  readonly displayFn = (obj: OptionModel) => obj?.title;

  constructor(
    readonly _foundTransferStepStore: FoundTransferStepStore,
    private readonly _formBuilder: UntypedFormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    if (!this.form) {
      return;
    }

    this._foundTransferStepStore.isWalletDisabled$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isWalletDisabled) => {
        if (isWalletDisabled) {
          this.walletControl.disable();
        }
      });

    this.walletControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.walletChange.next(value);
      });

    this.categoryControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((category) => {
        if (!category) {
          return;
        }
        this._foundTransferStepStore.loadSubCategories(category.id);
      });

    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        if (this._onChange) {
          if (this.form.valid) {
            this._onChange(value);
          } else {
            this._onChange(null);
          }
        }

        if (this._onTouched) {
          this._onTouched();
        }
      });
  }

  writeValue(obj: Partial<FoundTransferModalForm>): void {
    if (obj) {
      this.form.patchValue({ ...obj });
    } else {
      this.form.reset();
    }
  }

  registerOnChange(fn: (value: FoundTransferModalForm | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
}
