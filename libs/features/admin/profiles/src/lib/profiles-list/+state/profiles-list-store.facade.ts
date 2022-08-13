import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ProfilesListStoreActions from './profiles-list-store.actions';
import { ProfilesListStoreState } from './profiles-list-store.reducer';
import * as ProfilesListStoreSelectors from './profiles-list-store.selectors';

@Injectable()
export class ProfilesListStoreFacade {
  public readonly isLoading$ = this._store.select(
    ProfilesListStoreSelectors.isLoadingSelector
  );
  public readonly error$ = this._store.select(
    ProfilesListStoreSelectors.errorSelector
  );
  public readonly profiles$ = this._store.select(
    ProfilesListStoreSelectors.profilesSelector
  );

  constructor(private readonly _store: Store<ProfilesListStoreState>) {}

  public loadProfiles(): void {
    this._store.dispatch(ProfilesListStoreActions.loadProfiles());
  }
}
