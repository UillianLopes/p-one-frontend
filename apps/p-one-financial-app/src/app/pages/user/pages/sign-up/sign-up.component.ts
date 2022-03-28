import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators, DestroyableMixin } from '@p-one/shared';
import { map, startWith, takeUntil } from 'rxjs/operators';

export enum AccountAssociation {
  create,
  associate,
}
@Component({
  selector: 'p-one-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent extends DestroyableMixin() implements OnDestroy {
  AccountAssociation = AccountAssociation;

  readonly form = this._formBuilder.group({
    account: this._formBuilder.group({
      association: [AccountAssociation.associate, Validators.required],
      name: [
        null,
        [
          CustomValidators.whenParent(
            Validators.required,
            (parent) =>
              parent?.get('association')?.value == AccountAssociation.create
          ),
        ],
      ],
      email: [
        null,
        [
          CustomValidators.whenParent(
            Validators.required,
            (parent) =>
              parent?.get('association')?.value == AccountAssociation.create
          ),
          Validators.email,
        ],
      ],
      accountId: [
        null,
        [
          CustomValidators.whenParent(
            Validators.required,
            (parent) =>
              parent?.get('association')?.value == AccountAssociation.associate
          ),
        ],
      ],
    }),
    personal: this._formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      birthDate: [null, [Validators.required]],
      mobilePhone: [null, [Validators.required]],
    }),
    authentication: this._formBuilder.group({
      password: [null, [Validators.required]],
      passwordConfirmation: [
        null,
        [Validators.required, CustomValidators.equalToThisContol('password')],
      ],
    }),
    address: this._formBuilder.group({
      zipCode: [null, Validators.required],
      street: [null, Validators.required],
      number: [null, Validators.required],
      city: [null, Validators.required],
      district: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      referencePoint: [null],
      complement: [null],
    }),
  });

  get associationForm(): FormControl {
    return this.form.get('account')?.get('association') as FormControl;
  }

  readonly accountAssociation$ = this.associationForm.valueChanges.pipe(
    startWith(this.associationForm.value),
    map((value) => value as AccountAssociation)
  );

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router
  ) {
    super();

    this.form
      .get('authentication')
      ?.get('password')
      ?.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.form.get('passwordConfirmation')?.updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
