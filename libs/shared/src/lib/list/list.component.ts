import { AfterContentInit, Component, ContentChild, Input } from '@angular/core';

import { DestroyableMixin } from '../@mixins';
import { ListRowDirective } from './list-row/list-row.directive';
import { ListStore } from './list.state';

@Component({
  selector: 'p-one-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListStore],
})
export class ListComponent<T>
  extends DestroyableMixin()
  implements AfterContentInit
{
  @ContentChild(ListRowDirective, { static: false })
  public row?: ListRowDirective;

  @Input()
  set data(data: T[]) {
    this._store.setData(data);
  }

  public readonly data$ = this._store.data$;

  constructor(private readonly _store: ListStore<T>) {
    super();
  }

  public ngAfterContentInit(): void {
    if (!this.row) {
      throw new Error('ListComponent must have a ListRowComponent');
    }
  }
}
