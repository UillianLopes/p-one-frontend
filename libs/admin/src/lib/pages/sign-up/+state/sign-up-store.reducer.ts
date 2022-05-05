import { Action, createReducer, on } from '@ngrx/store';

import * as SignUpActions from './sign-up-store.actions';

export const SIGN_UP_KEY = 'SIGN_UP';
export interface SignUpState {
  isSignUpLoading?: boolean;
}

const initialState: SignUpState = {};

const _signUpReducer = createReducer(
  initialState,

  on(SignUpActions.signUp, (state) => ({
    ...state,
    error: null,
    isSignUpLoading: true,
  })),
  on(SignUpActions.signUpSuccess, (state) => ({
    ...state,
    isSignUpLoading: false,
  })),
  on(SignUpActions.signUpFailure, (state, { error }) => ({
    ...state,
    error,
    isSignUpLoading: false,
  })),

  on(SignUpActions.resetState, () => ({ ...initialState }))
);

export function signUpReducer(state: SignUpState | undefined, action: Action) {
  return _signUpReducer(state, action);
}
