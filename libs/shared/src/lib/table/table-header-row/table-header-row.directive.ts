import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { TableRowBase } from '../table-row.base';

@Directive({
  selector: '[pOneTableHeaderRow]',
})
export class TableHeaderRowDirective extends TableRowBase {
  constructor(viewContainerRef: ViewContainerRef, template: TemplateRef<any>) {
    super(viewContainerRef, template);
  }
}
