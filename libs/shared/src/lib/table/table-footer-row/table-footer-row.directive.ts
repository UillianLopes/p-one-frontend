import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { TableRowBase } from '../table-row.base';

@Directive({
  selector: 'tr[pOneTableFooterRow]',
})
export class TableFooterRowDirective extends TableRowBase {
  constructor(viewContainerRef: ViewContainerRef, template: TemplateRef<any>) {
    super(viewContainerRef, template);
  }
}
