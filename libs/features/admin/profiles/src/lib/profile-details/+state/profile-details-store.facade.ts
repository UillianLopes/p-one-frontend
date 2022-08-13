import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadProfileRoles } from './profile-details-store.actions';
import { ProfileDetailsStoreState } from './profile-details-store.reducer';

@Injectable()
export class ProfileDetailsStoreFacade {
  constructor(private readonly _store: Store<ProfileDetailsStoreState>) {}

  public loadProfileRoles(profileId: string): void {
    this._store.dispatch(loadProfileRoles({ profileId }));
  }
}
