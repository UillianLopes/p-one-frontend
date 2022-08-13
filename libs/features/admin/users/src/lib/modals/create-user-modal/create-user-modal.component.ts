import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { OptionModel, trackById } from '@p-one/core';
import { CustomValidators, DestroyableMixin, updateValueAndValidityMarkingControlsAreDirty } from '@p-one/shared';
import { filter, takeUntil } from 'rxjs/operators';

import { CreateUserModalStore } from './create-user-modal.state';

@Component({
  selector: 'p-one-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss'],
  providers: [CreateUserModalStore],
})
export class CreateUserModalComponent
  extends DestroyableMixin()
  implements OnInit
{
  public readonly form = this._formBuilder.group({
    name: ['', Validators.required],
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
    birthDate: [null, Validators.required],
    profile: [null, Validators.required],
    address: [null, Validators.required],
  });

  public readonly profileControl = this.form.get('profile');
  public readonly passwordControl = this.form.get('password');
  public readonly passwordConfirmationControl = this.form.get(
    'passwordConfirmation'
  );

  public readonly isLoading$ = this._store.isLoading$;
  public readonly isProfilesLoading$ = this._store.isProfilesLoading$;
  public readonly isSomethingLoading$ = this._store.isSomethingLoading$;

  public readonly profiles$ = this._store.profiles$;
  public readonly trackById = trackById;
  
  public readonly displayFn = (profile: OptionModel): string => profile.title;

  
  constructor(
    private readonly _store: CreateUserModalStore,
    private readonly _formBuilder: UntypedFormBuilder
  ) {
    super();
  }
  
  public ngOnInit(): void {
    this._store.loadProfiles();

    if (this.profileControl) {
      this.profileControl.valueChanges
        .pipe(
          takeUntil(this.destroyed$),
          filter((filter) => !filter || typeof filter === 'string')
        )
        .subscribe((profilesFilter: string) =>
          this._store.setProfilesFilter(profilesFilter)
        );
    }

    if (this.passwordControl) {
      this.passwordControl.valueChanges
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() =>
          this.passwordConfirmationControl?.updateValueAndValidity()
        );
    }
  }

  public createUser(): void {
    updateValueAndValidityMarkingControlsAreDirty(this.form);
    
    if (this.form.invalid) {
      return;
    }

    const { profile, ...value } = this.form.value;

    this._store.createUser({
      ...value,
      profileId: profile.id,
    });
  }
}
