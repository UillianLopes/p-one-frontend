import { createAction, props, union } from '@ngrx/store';

export enum ESettingsActions {
  LOAD_USER_SETTINGS = '[Settings] Load User Settings',
  LOAD_USER_SETTINGS_SUCCESS = '[Settings] Load User Settings Success',
  LOAD_USER_SETTINGS_FAILURE = '[Settings] Load User Settings Failure',

  RESET_STATE = '[Settings] Reset State',
}

export const loadUserSettings = createAction(
  ESettingsActions.LOAD_USER_SETTINGS
);
export const loadUserSettingsSuccess = createAction(
  ESettingsActions.LOAD_USER_SETTINGS_SUCCESS,
  props<{ settings: any }>()
);

export const loadUserSettingsFailure = createAction(
  ESettingsActions.LOAD_USER_SETTINGS_FAILURE,
  props<{ error: unknown }>()
);

export const resetState = createAction(ESettingsActions.RESET_STATE);

const settingsActionsUnion = union({
  loadUserSettings,
  loadUserSettingsSuccess,
  loadUserSettingsFailure,

  resetState,
});

export type SettingsActionsUnion = typeof settingsActionsUnion;
