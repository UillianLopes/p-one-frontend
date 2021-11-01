import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FilterDisplayData } from './filter-display.data';

@Component({
  selector: 'p-one-filter-display',
  templateUrl: './filter-display.component.html',
  styleUrls: ['./filter-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDisplayComponent implements OnInit {
  readonly data$ = new BehaviorSubject<FilterDisplayData[]>([]);

  @Input()
  set data(v: FilterDisplayData[]) {
    this.data$.next(v);
  }

  constructor() {}

  ngOnInit(): void {}
}
