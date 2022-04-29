import { Action, createReducer, on } from '@ngrx/store';

import { loadUserSettings, loadUserSettingsFailure, loadUserSettingsSuccess } from './settings.actions';

export const SETTINGS_FEATURE_KEY = 'SETTINGS';

export interface SettingsState {
  isUserSettingsLoading?: boolean;
  userSettings?: any;
}

const initialState = {};

const _settingsReducer = createReducer<SettingsState>(
  initialState,

  on(loadUserSettings, (state) => ({ ...state, isUserSettingsLoading: true })),

  on(loadUserSettingsSuccess, (state, { settings }) => ({
    ...state,
    isUserSettingsLoading: false,
  })),

  on(loadUserSettingsFailure, (state) => ({
    ...state,
    isUserSettingsLoading: false,
  }))
);

export function settingsReducer(state: SettingsState, action: Action) {
  return _settingsReducer(state, action);
}
