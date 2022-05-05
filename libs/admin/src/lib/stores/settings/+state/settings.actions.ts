import { createAction, props, union } from '@ngrx/store';

import { SettingsModel } from '../../../models';

export enum ESettingsActions {
  LOAD_USER_SETTINGS = '[Settings] Load User Settings',
  LOAD_USER_SETTINGS_SUCCESS = '[Settings] Load User Settings Success',
  LOAD_USER_SETTINGS_FAILURE = '[Settings] Load User Settings Failure',

  SET_USER_SETTINGS = '[Settings] Set User Settings',

  MANAGE_UPDATE_USER_SETTINGS = '[Settings] Manage Update User Settings',
  UPDATE_USER_SETTINGS = '[Settings] Update User Settings',
  UPDATE_USER_SETTINGS_SUCCESS = '[Settings] Update User Settings Success',
  UPDATE_USER_SETTINGS_FAILURE = '[Settings] Update User Settings Failure',

  RESET_STATE = '[Settings] Reset State',
}

export const loadUserSettings = createAction(
  ESettingsActions.LOAD_USER_SETTINGS
);
export const loadUserSettingsSuccess = createAction(
  ESettingsActions.LOAD_USER_SETTINGS_SUCCESS,
  props<{ settings: SettingsModel }>()
);

export const loadUserSettingsFailure = createAction(
  ESettingsActions.LOAD_USER_SETTINGS_FAILURE,
  props<{ error: unknown }>()
);

export const updateUserSettings = createAction(
  ESettingsActions.UPDATE_USER_SETTINGS,
  props<{ settings: SettingsModel }>()
);

export const manageUpdateUserSettings = createAction(
  ESettingsActions.MANAGE_UPDATE_USER_SETTINGS,
  props<{ settings: SettingsModel }>()
);

export const updateUserSettingsSuccess = createAction(
  ESettingsActions.UPDATE_USER_SETTINGS_SUCCESS,
  props<{ settings: SettingsModel }>()
);

export const updateUserSettingsFailure = createAction(
  ESettingsActions.UPDATE_USER_SETTINGS_FAILURE,
  props<{ error: unknown }>()
);

export const setUserSettings = createAction(
  ESettingsActions.SET_USER_SETTINGS,
  props<{ settings: SettingsModel }>()
);

export const resetState = createAction(ESettingsActions.RESET_STATE);

const settingsActionsUnion = union({
  loadUserSettings,
  loadUserSettingsSuccess,
  loadUserSettingsFailure,

  manageUpdateUserSettings,
  updateUserSettings,
  updateUserSettingsSuccess,
  updateUserSettingsFailure,

  resetState,
});

export type SettingsActionsUnion = typeof settingsActionsUnion;
