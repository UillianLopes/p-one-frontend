import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsModel } from '../../../models';
import { loadUserSettings, updateUserSettings } from './settings.actions';
import { SettingsState } from './settings.reducer';
import * as SettingsSelectors from './settings.selectors';

@Injectable()
export class SettingsFacade {
  public readonly isSettingsLoading$ = this._store.select(
    SettingsSelectors.isSettingsLoadingSelector
  );

  public readonly settings$ = this._store.select(
    SettingsSelectors.settingsSelector
  );

  constructor(private readonly _store: Store<SettingsState>) {}

  public loadUserSettings(): void {
    this._store.dispatch(loadUserSettings());
  }

  public updateUserSettings(settings: SettingsModel) {
    this._store.dispatch(
      updateUserSettings({
        settings,
      })
    );
  }
}
