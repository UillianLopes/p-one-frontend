import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FilterDisplayData } from './filter-display.data';

@Component({
  selector: 'p-one-filter-display',
  templateUrl: './filter-display.component.html',
  styleUrls: ['./filter-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDisplayComponent implements OnInit {
  public readonly data$ = new BehaviorSubject<FilterDisplayData[]>([]);

  @Output()
  public readonly removed$ = new EventEmitter<FilterDisplayData>();

  @Input()
  set data(v: FilterDisplayData[]) {
    this.data$.next(v);
  }

  constructor() {}

  ngOnInit(): void {}

  remove(item: FilterDisplayData) {
    this.removed$.emit(item);
  }
}
