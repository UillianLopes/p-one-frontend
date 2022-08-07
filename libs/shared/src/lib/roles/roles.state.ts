import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface RolesState {
  roles: string[];
}

@Injectable()
export class RolesService extends ComponentStore<RolesState> {
  public readonly roles$ = this.select(({ roles }) => roles);

  constructor() {
    super({ roles: [] });
  }

  public readonly setRoles = this.updater((state, roles: string[]) => ({
    ...state,
    roles,
  }));
}
