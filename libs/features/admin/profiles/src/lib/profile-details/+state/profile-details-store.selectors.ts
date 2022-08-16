import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PROFILE_DETAILS_STORE_FEATURE_KEY, ProfileDetailsStoreState } from './profile-details-store.reducer';

const profileDetailsStoreStateSelector =
  createFeatureSelector<ProfileDetailsStoreState>(
    PROFILE_DETAILS_STORE_FEATURE_KEY
  );

export const applicationsSelector = createSelector(
  profileDetailsStoreStateSelector,
  ({ applications, profile }) =>
    applications.map(({ modules, ...application }) => ({
      ...application,
      modules: modules.map(({ roles, ...module }) => ({
        ...module,
        roles: roles.map((role) => ({
          ...role,
          isActive: profile && profile.roles.includes(role.key),
        })),
      })),
    }))
);

export const isApplicationsLoadingSelector = createSelector(
  profileDetailsStoreStateSelector,
  ({ isApplicationsLoading }) => isApplicationsLoading
);

export const isLoadingSelector = createSelector(
  profileDetailsStoreStateSelector,
  ({ isLoading }) => isLoading
);

export const profileSelector = createSelector(
  profileDetailsStoreStateSelector,
  ({ profile }) => profile
);

export const profileRolesSelector = createSelector(
  profileSelector,
  (profile) => profile?.roles ?? []
);
