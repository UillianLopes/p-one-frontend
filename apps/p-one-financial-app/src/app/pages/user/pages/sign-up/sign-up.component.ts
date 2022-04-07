import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreFacade } from '@p-one/identity';
import { CustomValidators, DestroyableMixin } from '@p-one/shared';
import { combineLatest } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

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

  public readonly addressForm = <FormGroup>this.form.get('address');
  public readonly personalForm = <FormGroup>this.form.get('personal');
  public readonly authenticationForm = <FormGroup>(
    this.form.get('authentication')
  );

  public readonly isPersonalFormValid$ = this.personalForm.statusChanges.pipe(
    startWith(this.personalForm.status),
    map((status) => status === 'VALID')
  );

  public readonly isAddressFormValid$ = this.addressForm.statusChanges.pipe(
    startWith(this.addressForm.status),
    map((status) => status === 'VALID')
  );

  public readonly isAuthenticationFormValid$ =
    this.authenticationForm.statusChanges.pipe(
      startWith(this.authenticationForm.status),
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
    private readonly _userStoreFacade: UserStoreFacade
  ) {
    super();

    this.authenticationForm
      ?.get('password')
      ?.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.authenticationForm
          .get('passwordConfirmation')
          ?.updateValueAndValidity();
      });
  }

  public signUp(): void {
    if (this.authenticationForm.invalid || this.personalForm.invalid) {
      this._validatePersonalAndAuthenticationForms();
      return;
    }

    this._userStoreFacade.signUp();
  }

  private _validatePersonalAndAuthenticationForms(): void {
    for (const controlName in this.authenticationForm.controls) {
      this.authenticationForm.get(controlName).markAsDirty();
      this.authenticationForm.get(controlName).updateValueAndValidity();
    }

    for (const controlName in this.personalForm.controls) {
      this.personalForm.get(controlName).markAsDirty();
      this.personalForm.get(controlName).updateValueAndValidity();
    }
  }
}
