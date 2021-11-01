import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ContainerState {
  isLoading: boolean;
}
@Injectable()
export class ContainerFacade {
  private readonly _state$ = new BehaviorSubject<ContainerState>({
    isLoading: false,
  });

  readonly isLoading$ = this._state$.pipe(map((state) => state.isLoading));

  constructor() {}

  public setIsLoading(isLoading: boolean) {
    this._setState({
      isLoading,
    });
  }

  private _setState(state: Partial<ContainerState>): void {
    this._state$.next({
      ...this._state$.value,
      ...state,
    });
  }
}
