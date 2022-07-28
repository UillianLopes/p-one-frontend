import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListRowComponent } from './list-row/list-row.component';
import { ListRowDirective } from './list-row/list-row.directive';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [ListComponent, ListRowComponent, ListRowDirective],
  imports: [CommonModule],
  exports: [ListComponent, ListRowComponent, ListRowDirective],
})
export class ListModule {
  constructor() {}
}
