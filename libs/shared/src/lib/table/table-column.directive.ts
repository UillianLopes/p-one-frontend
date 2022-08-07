import { ContentChild, Directive, Input } from '@angular/core';

import { TableCellDirective } from './table-cell/table-cell.directive';
import { TableFooterCellDirective } from './table-footer-cell/table-footer-cell.directive';
import { TableHeaderCellDirective } from './table-header-cell/table-header-cell.directive';

@Directive({
  selector: '[pOneTableColumn]',
})
export class TableColumnDirective {
  @Input('pOneTableColumn')
  public identifier?: string;

  @ContentChild(TableCellDirective)
  public tableCell?: TableCellDirective;

  @ContentChild(TableHeaderCellDirective)
  public tableHeaderCell?: TableHeaderCellDirective;

  @ContentChild(TableFooterCellDirective)
  public tableFooterCell?: TableFooterCellDirective;
}
