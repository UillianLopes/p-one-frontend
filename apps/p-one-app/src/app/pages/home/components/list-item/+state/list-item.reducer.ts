import { Action, createReducer, on } from '@ngrx/store';

import { ListItemData } from '../list-item.data';
import { loadItem, loadItemFailure, loadItemSuccess } from './list-item.actions';

export const LIST_ITEM_KEY = 'LIST_ITEM';

export interface ListItemState {
  isLoading: boolean;
  item?: ListItemData;
  error?: any;
}

export const initialState: ListItemState = {
  isLoading: false,
};

const _listItemReducer = createReducer(
  initialState,
  on(loadItem, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(loadItemSuccess, (state, { item }) => {
    return {
      ...state,
      item,
      isLoading: false,
    };
  }),
  on(loadItemFailure, (state, { error }) => {
    return {
      ...state,
      error,
      isLoading: false,
    };
  })
);

export function listItemReducer(state: ListItemState, action: Action) {
  return _listItemReducer(state, action);
}
