import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '@p-one/shared';

import { CreateStandaloneUserStore } from './create-standalone-user.state';

@Component({
  selector: 'p-one-create-standalone-user',
  templateUrl: './create-standalone-user.component.html',
  styleUrls: ['./create-standalone-user.component.scss'],
  providers: [CreateStandaloneUserStore],
})
export class CreateStandaloneUserComponent {
  public readonly form = this._formBuilder.group({
    name: ['', Validators.required],
    birthDate: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirmation: [
      '',
      [
        Validators.required,
        CustomValidators.equalToThisContol('password'),
        Validators.minLength(8),
      ],
    ],
  });

  public readonly isLoading$ = this._store.isLoading$;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _store: CreateStandaloneUserStore
  ) {}

  public createUser(): void {
    if (this.form.invalid) {
      return;
    }

    this._store.createUser({
      ...this.form.value,
    });
  }
}
