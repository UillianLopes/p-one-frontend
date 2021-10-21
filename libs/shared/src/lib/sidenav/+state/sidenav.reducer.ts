import { Action, createReducer, on } from '@ngrx/store';

import { ESidenavMode } from '../sidenav-mode.enum';
import { ESidenavState } from '../sidenav-state.enum';
import * as SidenavActions from './sidenav.actions';

export const SIDENAV_KEY = 'SIDENAV';

export interface SidenavState {
  state: ESidenavState;
  mode: ESidenavMode;
  sidenavWidth?: number;
  sidenavHeaderHeight?: number;
}

const initialState: SidenavState = {
  state: ESidenavState.CLOSED,
  mode: ESidenavMode.FIXED,
};

export const _sidenavReducer = createReducer(
  initialState,

  on(SidenavActions.open, (state) => {
    return {
      ...state,
      state: ESidenavState.OPENED,
    };
  }),

  on(SidenavActions.close, (state) => {
    return {
      ...state,
      state: ESidenavState.CLOSED,
    };
  }),

  on(SidenavActions.setMode, (state, action) => {
    return {
      ...state,
      mode: action.mode,
    };
  }),

  on(SidenavActions.setSidenavWidth, (state, action) => {
    return {
      ...state,
      sidenavWidth: action.sidnavWidth,
    };
  }),
  
  on(SidenavActions.setSidenavHeaderHeight, (state, action) => {
    return {
      ...state,
      sidenavHeaderHeight: action.sidenavHeaderHeight,
    };
  })
);

export const sidenavReducer = (state: SidenavState, action: Action) => {
  return _sidenavReducer(state, action);
};
