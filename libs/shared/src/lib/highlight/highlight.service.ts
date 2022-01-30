import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap, withLatestFrom } from 'rxjs/operators';

interface HighlightServiceState {
  highlightedKeys: string[];
}

@Injectable()
export class HighlightService extends ComponentStore<HighlightServiceState> {
  public readonly highlightedKeys$ = this.select(
    ({ highlightedKeys }) => highlightedKeys
  );

  constructor() {
    super({
      highlightedKeys: [],
    });
  }

  public isThisKeyHighlighted$(key: string) {
    return this.highlightedKeys$.pipe(
      map((highlightedKeys) => highlightedKeys.includes(key)),
      distinctUntilChanged()
    );
  }

  public readonly pathHighlightedKeys = this.updater(
    (state, highlightedKeys: string[]) => {
      return {
        ...state,
        highlightedKeys,
      };
    }
  );

  public readonly toggleHighlight = this.effect((key$: Observable<string>) => {
    return key$.pipe(
      withLatestFrom(this.highlightedKeys$),
      map(([key, highlightedKeys]) => {
        if (highlightedKeys.includes(key)) {
          return [...highlightedKeys.filter((hk) => hk !== key)];
        }

        return [...highlightedKeys, key];
      }),
      tap((highlightedKeys) => this.pathHighlightedKeys(highlightedKeys))
    );
  });
}
