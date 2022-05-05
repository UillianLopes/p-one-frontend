import { Action, createReducer, on } from '@ngrx/store';

import { SettingsModel } from '../../../models';
import {
  loadUserSettings,
  loadUserSettingsFailure,
  loadUserSettingsSuccess,
  updateUserSettings,
  updateUserSettingsFailure,
  updateUserSettingsSuccess,
} from './settings.actions';

export const SETTINGS_FEATURE_KEY = 'SETTINGS';

export interface SettingsState {
  isSettingsLoading?: boolean;
  settings?: SettingsModel;
  error?: unknown;
}

const initialState = {};

const _settingsReducer = createReducer<SettingsState>(
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
  on(updateUserSettingsSuccess, (state) => ({
    ...state,
    isSettingsLoading: false,
  })),
  on(updateUserSettingsFailure, (state, { error }) => ({
    ...state,
    isSettingsLoading: false,
    error,
  }))
);

export function settingsReducer(state: SettingsState, action: Action) {
  return _settingsReducer(state, action);
}
