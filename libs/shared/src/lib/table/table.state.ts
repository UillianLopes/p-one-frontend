import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface TableState<TData> {
  data: TData[];
}

@Injectable()
export class TableStore<TData> extends ComponentStore<TableState<TData>> {
  public readonly data$ = this.select(({ data }) => data);

  constructor() {
    super({ data: [] });
  }

  public readonly setData = this.updater((state, data: TData[]) => ({
    ...state,
    data,
  }));
}
