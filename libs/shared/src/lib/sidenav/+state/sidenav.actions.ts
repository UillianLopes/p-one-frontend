import { createAction, props, union } from '@ngrx/store';

import { ESidenavMode } from '../sidenav-mode.enum';

export enum ESidenavActions {
  TOGGLE = '[Sidenav] Sidenav Toggle',
  OPEN = '[Sidenav] Sidenav Open',
  CLOSE = '[Sidenav] Sidenav Close',
  SET_MODE = '[Sidenav] Sidenav set mode',
  RESET_STATE = '[Sidenav] Sidenav reset state',
  SET_SIDENAV_WIDTH = '[Sidenav] Sidenav content width',
  SET_SIDENAV_HEADER_HEIGHT = '[Sidenav] Set sidenav header height'
}

export const open = createAction(ESidenavActions.OPEN);

export const close = createAction(ESidenavActions.CLOSE);

export const toggle = createAction(ESidenavActions.TOGGLE);

export const setMode = createAction(
  ESidenavActions.SET_MODE,
  props<{ mode: ESidenavMode }>()
);

export const setSidenavWidth = createAction(
  ESidenavActions.SET_SIDENAV_WIDTH,
  props<{ sidnavWidth: number }>()
);
export const setSidenavHeaderHeight = createAction(
  ESidenavActions.SET_SIDENAV_HEADER_HEIGHT,
  props<{ sidenavHeaderHeight: number }>()
);


export const resetState = createAction(ESidenavActions.RESET_STATE);

const sidenavActions = union({
  open,
  close,
  toggle,
  setMode,
  setSidenavWidth,
  resetState,
  setSidenavHeaderHeight
});

export type SidenavActionsUnion = typeof sidenavActions;
