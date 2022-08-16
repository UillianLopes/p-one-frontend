import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface ProfileDetailsRoleState {
  isChecked: boolean;
  key: string;
}

@Injectable()
export class ProfileDetailsRoleStore extends ComponentStore<ProfileDetailsRoleState> {
  public readonly isChecked$ = this.select(({ isChecked }) => isChecked);

  constructor() {
    super({
      isChecked: false,
      key: '',
    });
  }

  public readonly setIsChecked = this.updater((state, isChecked: boolean) => ({
    ...state,
    isChecked,
  }));
}
