import { createAction, props, union } from '@ngrx/store';

export enum EListItemActions {
  LOAD_ITEM = '[List Item] Load item',
  LOAD_ITEM_FAILURE = '[List Item] Load item failure',
  LOAD_ITEM_SUCCESS = '[List Item] Load item success',

  RESET_STATE = '[List Item] Reset state',
}

export const loadItem = createAction(
  EListItemActions.LOAD_ITEM,
  props<{ id: string }>()
);

export const loadItemSuccess = createAction(
  EListItemActions.LOAD_ITEM_SUCCESS,
  props<{ item: any }>()
);

export const loadItemFailure = createAction(
  EListItemActions.LOAD_ITEM_FAILURE,
  props<{ error: any }>()
);

export const resetState = createAction(EListItemActions.RESET_STATE);

const actionsUnion = union({
  loadItem,
  loadItemSuccess,
  loadItemFailure,

  resetState,
});

export type ListItemActionsUnion = typeof actionsUnion;
