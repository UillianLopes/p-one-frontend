import { Action, createReducer, on } from '@ngrx/store';

import { SettingsModel } from '../../../models';
import {
  loadUserSettings,
  loadUserSettingsFailure,
  loadUserSettingsSuccess,
  setUserSettings,
  updateUserSettings,
  updateUserSettingsFailure,
  updateUserSettingsSuccess,
} from './settings-store.actions';

export const SETTINGS_FEATURE_KEY = 'SETTINGS';

export interface SettingsState {
  isSettingsLoading?: boolean;
  settings?: SettingsModel;
  error?: unknown;
}

const initialState = {};

const _settingsStoreReducer = createReducer<SettingsState>(
  initialState,

  on(loadUserSettings, (state) => ({
    ...state,
    error: undefined,
    isSettingsLoading: true,
  })),
  on(loadUserSettingsSuccess, (state, { settings }) => ({
    ...state,
    settings,
    isSettingsLoading: false,
  })),
  on(loadUserSettingsFailure, (state, { error }) => ({
    ...state,
    error,
    isSettingsLoading: false,
  })),

  on(updateUserSettings, (state) => ({
    ...state,
    isSettingsLoading: true,
    error: undefined,
  })),
  on(updateUserSettingsSuccess, (state, { settings }) => ({
    ...state,
    settings,
    isSettingsLoading: false,
  })),
  on(updateUserSettingsFailure, (state, { error }) => ({
    ...state,
    isSettingsLoading: false,
    error,
  })),

  on(setUserSettings, (state, { settings }) => ({ ...state, settings }))
);

export function settingsStoreReducer(state: SettingsState, action: Action) {
  return _settingsStoreReducer(state, action);
}
