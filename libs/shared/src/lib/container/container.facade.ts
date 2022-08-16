import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ContainerState {
  isLoading: boolean;
  isScrolling: boolean;
}
@Injectable()
export class ContainerFacade {
  private readonly _state$ = new BehaviorSubject<ContainerState>({
    isLoading: false,
    isScrolling: false,
  });

  readonly isLoading$ = this._state$.pipe(map(({ isLoading }) => isLoading));
  readonly isScrolling$ = this._state$.pipe(map(({ isScrolling }) => isScrolling));

  constructor() {}

  public setIsLoading(isLoading: boolean) {
    this._setState({
      isLoading,
    });
  }

  public setIsScrolling(isScrolling: boolean) {
    this._setState({
      isScrolling,
    });
  }
  
  private _setState(state: Partial<ContainerState>): void {
    this._state$.next({
      ...this._state$.value,
      ...state,
    });
  }
}
