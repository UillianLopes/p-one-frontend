import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SIGN_UP_KEY, SignUpState } from './sign-up-store.reducer';

const signUpStateSelector = createFeatureSelector<SignUpState>(SIGN_UP_KEY);

export const isSignUpLoadingSelector = createSelector(
  signUpStateSelector,
  ({ isSignUpLoading }) => isSignUpLoading
);
