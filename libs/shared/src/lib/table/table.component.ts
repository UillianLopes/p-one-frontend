import { ChangeDetectionStrategy, Component, ContentChild, Input, TrackByFunction } from '@angular/core';

import { DestroyableMixin } from '../@mixins';
import { TableFooterRowDirective } from './table-footer-row/table-footer-row.directive';
import { TableHeaderRowDirective } from './table-header-row/table-header-row.directive';
import { TableRowDirective } from './table-row/table-row.directive';
import { TableStore } from './table.state';

@Component({
  selector: 'p-one-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<TData> extends DestroyableMixin() {
  public readonly data$ = this._store.data$;

  @Input()
  public set data(data: TData[]) {
    this._store.setData(data);
  }

  @ContentChild(TableHeaderRowDirective)
  public tableHeaderRow?: TableHeaderRowDirective;

  @ContentChild(TableRowDirective)
  public tableRow?: TableRowDirective;

  @ContentChild(TableFooterRowDirective)
  public tableFooterRow?: TableFooterRowDirective;

  @Input()
  public trackBy: TrackByFunction<TData> = (index: number, _: TData) => index;

  constructor(private readonly _store: TableStore<TData>) {
    super();
  }

  ngOnInit(): void {}
}
