import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap, withLatestFrom } from 'rxjs/operators';

export interface DetailsFieldState {
  isEditing: boolean;
  isDisabled: boolean;
  canEdit: boolean;
}

@Injectable()
export class DetailsFieldStore extends ComponentStore<DetailsFieldState> {
  public readonly isEditing$ = this.select(({ isEditing }) => isEditing);
  public readonly isDisabled$ = this.select(({ isDisabled }) => isDisabled);
  public readonly canEdit$ = this.select(({ canEdit }) => canEdit);

  constructor() {
    super({
      isEditing: false,
      isDisabled: false,
      canEdit: true,
    });
  }

  public readonly setIsEditing = this.updater((state, isEditing: boolean) => ({
    ...state,
    isEditing,
  }));

  public readonly setCanEdit = this.updater((state, canEdit: boolean) => ({
    ...state,
    canEdit,
  }));

  public readonly setIsDisabled = this.updater(
    (state, isDisabled: boolean) => ({ ...state, isDisabled })
  );

  public readonly toggleIsEditing = this.effect((event$) =>
    event$.pipe(
      withLatestFrom(this.isEditing$),
      tap({
        next: ([, isEditing]) => this.setIsEditing(!isEditing),
      })
    )
  );
}
