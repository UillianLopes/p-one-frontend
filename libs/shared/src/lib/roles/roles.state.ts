import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface RolesState {
  roles: string[];
  ignoreAllRoles: boolean;
}

@Injectable()
export class RolesService extends ComponentStore<RolesState> {
  public readonly roles$ = this.select(({ roles }) => roles);
  public readonly ignoreAllRoles$ = this.select(
    ({ ignoreAllRoles }) => ignoreAllRoles
  );

  constructor() {
    super({ roles: [], ignoreAllRoles: false });
  }

  public readonly setRoles = this.updater((state, roles: string[]) => ({
    ...state,
    roles,
  }));

  public readonly setIgnoreAllRoles = this.updater(
    (state, ignoreAllRoles: boolean) => ({
      ...state,
      ignoreAllRoles,
    })
  );
}
