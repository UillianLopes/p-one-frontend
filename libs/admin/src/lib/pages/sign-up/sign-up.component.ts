import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreFacade } from '@p-one/identity';
import { CustomValidators, DestroyableMixin } from '@p-one/shared';
import { combineLatest } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { SignUpFacade } from './+state/sign-up-store.facade';

@Component({
  selector: 'p-one-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent extends DestroyableMixin() {
  public readonly form = this._formBuilder.group({
    personal: this._formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      birthDate: [new Date(1990, 0, 1), [Validators.required]],
      mobilePhone: [null, [Validators.required]],
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

  public readonly addressForm = <FormGroup>this.form.get('address');
  public readonly personalForm = <FormGroup>this.form.get('personal');

  public readonly isPersonalFormValid$ = this.personalForm.statusChanges.pipe(
    startWith(this.personalForm.status),
    map((status) => status === 'VALID')
  );

  public readonly isAddressFormValid$ = this.addressForm.statusChanges.pipe(
    startWith(this.addressForm.status),
    map((status) => status === 'VALID')
  );

  public readonly isAuthenticationFormValid$ =
    this.personalForm.statusChanges.pipe(
      startWith(this.personalForm.status),
      map((status) => status === 'VALID')
    );

  public readonly isCreateUserDisabled$ = combineLatest([
    this.isAuthenticationFormValid$,
    this.isPersonalFormValid$,
  ]).pipe(
    map(
      ([isAuthFormValid, isPersonalFormValid]) =>
        !isAuthFormValid || !isPersonalFormValid
    )
  );

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _signUpFacade: SignUpFacade,
    private readonly _userStoreFacade: UserStoreFacade
  ) {
    super();

    this.personalForm
      ?.get('password')
      ?.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.personalForm.get('passwordConfirmation')?.updateValueAndValidity();
      });
  }

  public signUp(): void {
    if (this.personalForm.invalid || this.personalForm.invalid) {
      this._validatePersonalAndAuthenticationForms();
      return;
    }
    const personal = this.personalForm.value;
    const address = this.personalForm.value;
    this._signUpFacade.signUp({
      ...personal,
      ...(address ?? {}),
      countryCode: 55,
    });
  }

  private _validatePersonalAndAuthenticationForms(): void {
    for (const controlName in this.personalForm.controls) {
      this.personalForm.get(controlName)?.markAsDirty();
      this.personalForm.get(controlName)?.updateValueAndValidity();
    }

    for (const controlName in this.personalForm.controls) {
      this.personalForm.get(controlName)?.markAsDirty();
      this.personalForm.get(controlName)?.updateValueAndValidity();
    }
  }

  public signIn(): void {
    this._userStoreFacade.signIn();
  }
}
