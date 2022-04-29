import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadUserSettings } from './settings.actions';
import { SettingsState } from './settings.reducer';

@Injectable()
export class SettingsFacade {
  constructor(private readonly _store: Store<SettingsState>) {}

  public loadUserSettings(): void {
    this._store.dispatch(loadUserSettings());
  }
}
