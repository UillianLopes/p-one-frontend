import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UsersStoreFacade } from '@p-one/stores/users';
import { CustomValidators, DestroyableMixin } from '@p-one/shared';
import { takeUntil } from 'rxjs/operators';

import { SignUpFacade } from './+state/sign-up-store.facade';

@Component({
  selector: 'p-one-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent extends DestroyableMixin() {
  public readonly form = this._formBuilder.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    passwordConfirmation: [
      null,
      [Validators.required, CustomValidators.equalToThisContol('password')],
    ],
  });

  public readonly isSignUpLoading$ = this._signUpFacade.isSignUpLoading$;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _signUpFacade: SignUpFacade,
    private readonly _usersStoreFacade: UsersStoreFacade
  ) {
    super();

    this.form
      .get('password')
      ?.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.form.get('passwordConfirmation')?.updateValueAndValidity();
      });
  }

  public signUp(): void {
    if (this.form.invalid || this.form.invalid) {
      this._validatePersonalAndAuthenticationForms();
      return;
    }

    this._signUpFacade.signUp({
      ...this.form.value,
    });
  }

  private _validatePersonalAndAuthenticationForms(): void {
    for (const controlName in this.form.controls) {
      this.form.get(controlName)?.markAsDirty();
      this.form.get(controlName)?.updateValueAndValidity();
    }
  }

  public signIn(): void {
    this._usersStoreFacade.signIn();
  }
}
