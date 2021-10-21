import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ESidenavMode } from '../sidenav-mode.enum';
import { ESidenavState } from '../sidenav-state.enum';
import { SIDENAV_KEY, SidenavState } from './sidenav.reducer';

const sidenavState = createFeatureSelector<SidenavState>(SIDENAV_KEY);

export const selectState = createSelector(sidenavState, (state) => {
  return state.state;
});

export const selectIsOpened = createSelector(selectState, (state) => {
  return state === ESidenavState.OPENED;
});

export const selectIsClosed = createSelector(selectState, (state) => {
  return state === ESidenavState.CLOSED;
});

export const selectMode = createSelector(sidenavState, (state) => {
  return state.mode;
});

export const selectIsFixed = createSelector(selectMode, (mode) => {
  return mode === ESidenavMode.FIXED;
});

export const selectIsFloating = createSelector(selectMode, (mode) => {
  return mode === ESidenavMode.FLOATING;
});

export const selectSidenavWidth = createSelector(sidenavState, (state) => {
  return state.sidenavWidth;
});

export const selectSidenavHeaderHeight = createSelector(sidenavState, (state) => {
  return state.sidenavHeaderHeight;
});