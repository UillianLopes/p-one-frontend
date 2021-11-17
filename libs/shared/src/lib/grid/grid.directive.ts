import { AfterContentInit, ContentChildren, Directive, HostBinding, Input, OnInit, QueryList } from '@angular/core';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../@mixins/destroyable.mixin';
import { GridColumnDirective } from './grid-column.directive';
import { GridRowDirective } from './grid-row.directive';

@Directive({
  selector: '[pOneGrid]',
})
export class GridDirective
  extends DestroyableMixin()
  implements OnInit, AfterContentInit
{
  @Input()
  @HostBinding('style.display')
  display = 'grid';

  @Input()
  @HostBinding('style.grid-template-columns')
  columns = 'minmax(0px, 1fr)';

  @Input()
  @HostBinding('style.grid-template-rows')
  rows = 'auto';

  @Input()
  @HostBinding('style.gap')
  gap = '0px';

  @ContentChildren(GridRowDirective)
  _rows!: QueryList<GridRowDirective>;

  @ContentChildren(GridColumnDirective)
  _columns!: QueryList<GridColumnDirective>;

  constructor() {
    super();
  }

  ngAfterContentInit(): void {
    this._columns.changes
      .pipe(
        takeUntil(this.destroyed$),
        startWith(this._columns.map((c) => c)),
        filter((columns) => columns && columns.length > 0)
      )
      .subscribe((columns: GridColumnDirective[]) => {
        this.columns = columns
          .map((r) => r.size ?? 'minmax(0px, 1fr)')
          .join(' ');
      });

    this._rows.changes
      .pipe(
        takeUntil(this.destroyed$),
        startWith(this._rows.map((r) => r)),
        filter((rows) => rows && rows.length > 0)
      )
      .subscribe((rows: GridRowDirective[]) => {
        this.rows = rows.map((r) => r.size).join(' ');
      });
  }

  ngOnInit(): void {}
}
