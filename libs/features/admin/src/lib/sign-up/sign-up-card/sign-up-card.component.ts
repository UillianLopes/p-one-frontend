import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UsersStoreFacade } from '@p-one/stores/users';
import { CustomValidators, DestroyableMixin } from '@p-one/shared';
import { takeUntil } from 'rxjs/operators';

import { SignUpFacade } from '../+state/sign-up-store.facade';

@Component({
  selector: 'p-one-sign-up-card',
  templateUrl: './sign-up-card.component.html',
  styleUrls: ['./sign-up-card.component.scss'],
})
export class SignUpCardComponent extends DestroyableMixin() {
  @Input() public language = 'pt-BR';

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
  public readonly isUserCreated$ = this._signUpFacade.isUserCreated$;

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
      language: this.language,
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
