import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadProfileRoles } from './profile-details-store.actions';
import { ProfileDetailsStoreState } from './profile-details-store.reducer';
import * as ProfileDetailsStoreSelectors from './profile-details-store.selectors';

@Injectable()
export class ProfileDetailsStoreFacade {
  public readonly applications$ = this._store.select(
    ProfileDetailsStoreSelectors.applicationsSelector
  );
  public readonly profile$ = this._store.select(
    ProfileDetailsStoreSelectors.profileSelector
  );
  public readonly isLoading$ = this._store.select(
    ProfileDetailsStoreSelectors.isLoadingSelector
  );
  public readonly isApplicationsLoading$ = this._store.select(
    ProfileDetailsStoreSelectors.isApplicationsLoadingSelector
  );

  constructor(private readonly _store: Store<ProfileDetailsStoreState>) {}

  public loadProfileRoles(profileId: string): void {
    this._store.dispatch(loadProfileRoles({ profileId }));
  }
}
