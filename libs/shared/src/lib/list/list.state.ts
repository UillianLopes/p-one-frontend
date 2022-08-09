import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface ListState<T> {
  data: T[];
}

@Injectable()
export class ListStore<T> extends ComponentStore<ListState<T>> {
  public readonly data$ = this.select(({ data }) => data);

  constructor() {
    super({ data: [] });
  }

  public readonly setData = this.updater((state, data: T[]) => ({
    ...state,
    data,
  }));
}
