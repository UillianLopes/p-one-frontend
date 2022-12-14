import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { OptionModel } from '@p-one/core';
import { CreateUserRequest, ProfileService, UserService } from '@p-one/domain/admin';
import { DialogRef } from '@p-one/shared';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export interface CreateUserModalState {
  isLoading: boolean;
  isProfilesLoading: boolean;

  profiles: OptionModel[];
  profilesFilter?: string;
  error?: unknown;
}

@Injectable()
export class CreateUserModalStore extends ComponentStore<CreateUserModalState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly isProfilesLoading$ = this.select(
    ({ isProfilesLoading }) => isProfilesLoading
  );

  public readonly isSomethingLoading$ = this.select(
    this.isLoading$,
    this.isProfilesLoading$,
    (isLoading, isProfilesLoading) => isLoading || isProfilesLoading
  );

  public readonly error$ = this.select(({ error }) => error);
  public readonly profiles$ = this.select(({ profiles }) => profiles);
  public readonly profilesFilter$ = this.select(
    ({ profilesFilter }) => profilesFilter
  );

  public readonly filtredProfiles = this.select(
    this.profilesFilter$,
    this.profiles$,
    (profilesFilter, profiles) =>
      profilesFilter && profiles
        ? profiles.filter((p) => p.title.includes(profilesFilter))
        : profiles
  );

  constructor(
    private readonly _userService: UserService,
    private readonly _profileService: ProfileService,
    private readonly _dialogRef: DialogRef<unknown>
  ) {
    super({
      isLoading: false,
      isProfilesLoading: false,
      profiles: [],
    });
  }

  public readonly setProfilesFilter = this.updater(
    (state, profilesFilter: string) => ({
      ...state,
      profilesFilter,
    })
  );

  public readonly loadProfiles = this.effect((event$) =>
    event$.pipe(
      tap(() => this.patchState({ isProfilesLoading: true })),
      switchMap(() =>
        this._profileService.getAllAsOptions().pipe(
          tap({
            next: (profiles) => this.patchState({ profiles }),
            error: (error) => this.patchState({ error }),
            complete: () => this.patchState({ isProfilesLoading: false }),
          })
        )
      )
    )
  );

  public readonly createUser = this.effect(
    (event$: Observable<Partial<CreateUserRequest>>) =>
      event$.pipe(
        tap(() => this.patchState({ isLoading: true })),
        switchMap((request) =>
          this._userService.create(request).pipe(
            tap({
              next: () => this._dialogRef.close(true),
              error: (error) => this.patchState({ error }),
              complete: () => this.patchState({ isLoading: false }),
            })
          )
        )
      )
  );
}
