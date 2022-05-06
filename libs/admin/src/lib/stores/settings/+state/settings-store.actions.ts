import { createAction, props, union } from '@ngrx/store';

import { SettingsModel } from '../../../models';

export enum ESettingsStoreActions {
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
  ESettingsStoreActions.LOAD_USER_SETTINGS
);
export const loadUserSettingsSuccess = createAction(
  ESettingsStoreActions.LOAD_USER_SETTINGS_SUCCESS,
  props<{ settings: SettingsModel }>()
);

export const loadUserSettingsFailure = createAction(
  ESettingsStoreActions.LOAD_USER_SETTINGS_FAILURE,
  props<{ error: unknown }>()
);

export const updateUserSettings = createAction(
  ESettingsStoreActions.UPDATE_USER_SETTINGS,
  props<{ settings: SettingsModel }>()
);

export const manageUpdateUserSettings = createAction(
  ESettingsStoreActions.MANAGE_UPDATE_USER_SETTINGS,
  props<{ settings: SettingsModel }>()
);

export const updateUserSettingsSuccess = createAction(
  ESettingsStoreActions.UPDATE_USER_SETTINGS_SUCCESS,
  props<{ settings: SettingsModel }>()
);

export const updateUserSettingsFailure = createAction(
  ESettingsStoreActions.UPDATE_USER_SETTINGS_FAILURE,
  props<{ error: unknown }>()
);

export const setUserSettings = createAction(
  ESettingsStoreActions.SET_USER_SETTINGS,
  props<{ settings: SettingsModel }>()
);

export const resetState = createAction(ESettingsStoreActions.RESET_STATE);

const settingsStoreActionsUnion = union({
  loadUserSettings,
  loadUserSettingsSuccess,
  loadUserSettingsFailure,

  manageUpdateUserSettings,
  updateUserSettings,
  updateUserSettingsSuccess,
  updateUserSettingsFailure,

  resetState,
});

export type SettingsStoreActionsUnion = typeof settingsStoreActionsUnion;
