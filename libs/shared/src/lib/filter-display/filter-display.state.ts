import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { FilterDisplayData } from './filter-display.data';

export interface FilterDisplayState {
  data: FilterDisplayData[];
}

@Injectable()
export class FilterDisplayStore extends ComponentStore<FilterDisplayState> {
  public readonly data$ = this.select(({ data }) => data);

  constructor() {
    super({
      data: [],
    });
  }

  public readonly setData = this.updater(
    (state, data: FilterDisplayData[]) => ({ ...state, data })
  );
}
