import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FilterDisplayData } from './filter-display.data';
import { FilterDisplayStore } from './filter-display.state';

@Component({
  selector: 'p-one-filter-display',
  templateUrl: './filter-display.component.html',
  styleUrls: ['./filter-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FilterDisplayStore],
})
export class FilterDisplayComponent {
  @Output()
  public readonly removed$ = new EventEmitter<FilterDisplayData>();
  public readonly data$ = this._store.data$;

  @Input()
  set data(data: FilterDisplayData[]) {
    this._store.setData(data);
  }

  constructor(private readonly _store: FilterDisplayStore) {}

  public remove(item: FilterDisplayData): void {
    this.removed$.emit(item);
  }
}
