import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsModel } from '@p-one/domain/admin';

import {
  loadUserSettings,
  manageUpdateUserSettings,
  setUserSettings,
} from './settings-store.actions';
import { SettingsState } from './settings-store.reducer';
import * as SettingsSelectors from './settings-store.selectors';

@Injectable()
export class SettingsStoreFacade {
  public readonly isSettingsLoading$ = this._store.select(
    SettingsSelectors.isSettingsLoadingSelector
  );

  public readonly settings$ = this._store.select(
    SettingsSelectors.settingsSelector
  );

  public readonly settingsCurrency$ = this._store.select(
    SettingsSelectors.settingsCurrencySelector
  );

  constructor(private readonly _store: Store<SettingsState>) {}

  public loadUserSettings(): void {
    this._store.dispatch(loadUserSettings());
  }

  public updateUserSettings(settings: SettingsModel) {
    this._store.dispatch(
      manageUpdateUserSettings({
        settings,
      })
    );
  }

  public setUserSettings(settings: SettingsModel) {
    this._store.dispatch(setUserSettings({ settings }));
  }
}
