import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SETTINGS_FEATURE_KEY, SettingsState } from './settings-store.reducer';

const settingsStateSelector =
  createFeatureSelector<SettingsState>(SETTINGS_FEATURE_KEY);

export const isSettingsLoadingSelector = createSelector(
  settingsStateSelector,
  ({ isSettingsLoading }) => isSettingsLoading
);

export const settingsSelector = createSelector(
  settingsStateSelector,
  ({ settings }) => settings
);
