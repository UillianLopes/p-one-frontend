import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap, withLatestFrom } from 'rxjs';

export interface CheckBoxState {
  isIndeterminated: boolean;
  isChecked: boolean;
  isDisabled: boolean;
}

@Injectable()
export class CheckBoxStore extends ComponentStore<CheckBoxState> {
  public readonly isIndeterminated$ = this.select(
    ({ isIndeterminated }) => isIndeterminated
  );
  public readonly isChecked$ = this.select(({ isChecked }) => isChecked);
  public readonly isDisabled$ = this.select(({ isDisabled }) => isDisabled);

  constructor() {
    super({
      isIndeterminated: false,
      isDisabled: false,
      isChecked: false,
    });
  }

  public readonly setIsIndeterminated = this.updater(
    (state, isIndeterminated: boolean) => ({ ...state, isIndeterminated })
  );

  public readonly toggle = this.effect((event$) =>
    event$.pipe(
      withLatestFrom(this.isChecked$),
      tap({
        next: ([, isChecked]) => this.setIsChecked(!isChecked),
      })
    )
  );
  public readonly setIsChecked = this.updater((state, isChecked: boolean) => ({
    ...state,
    isChecked,
  }));

  public readonly setIsDisabled = this.updater(
    (state, isDisabled: boolean) => ({
      ...state,
      isDisabled,
    })
  );
}
