import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators, DestroyableMixin } from '@p-one/shared';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'p-one-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent extends DestroyableMixin() implements OnDestroy {
  form = this._formBuilder.group({
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

  constructor(private readonly _formBuilder: FormBuilder) {
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
