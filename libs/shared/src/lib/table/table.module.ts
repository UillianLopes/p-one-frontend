import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TableCellComponent } from './table-cell/table-cell.component';
import { TableCellDirective } from './table-cell/table-cell.directive';
import { TableColumnDirective } from './table-column.directive';
import { TableFooterCellComponent } from './table-footer-cell/table-footer-cell.component';
import { TableFooterCellDirective } from './table-footer-cell/table-footer-cell.directive';
import { TableFooterRowComponent } from './table-footer-row/table-footer-row.component';
import { TableFooterRowDirective } from './table-footer-row/table-footer-row.directive';
import { TableHeaderCellComponent } from './table-header-cell/table-header-cell.component';
import { TableHeaderCellDirective } from './table-header-cell/table-header-cell.directive';
import { TableHeaderRowComponent } from './table-header-row/table-header-row.component';
import { TableHeaderRowDirective } from './table-header-row/table-header-row.directive';
import { TableRowComponent } from './table-row/table-row.component';
import { TableRowDirective, TableRowOutletDirective } from './table-row/table-row.directive';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [
    TableComponent,

    TableColumnDirective,

    TableRowComponent,
    TableRowDirective,
    TableRowOutletDirective,
    TableCellComponent,
    TableCellDirective,

    TableHeaderRowComponent,
    TableHeaderRowDirective,
    TableHeaderCellComponent,
    TableHeaderCellDirective,

    TableFooterRowComponent,
    TableFooterRowDirective,
    TableFooterCellDirective,
    TableFooterCellComponent,
  ],
  imports: [CommonModule],
  exports: [
    TableComponent,

    TableColumnDirective,

    TableRowComponent,
    TableRowDirective,
    TableCellComponent,
    TableCellDirective,

    TableHeaderRowComponent,
    TableHeaderRowDirective,
    TableHeaderCellComponent,
    TableHeaderCellDirective,

    TableFooterRowComponent,
    TableFooterRowDirective,
    TableFooterCellDirective,
    TableFooterCellComponent,
  ],
})
export class POneTableModule {}
