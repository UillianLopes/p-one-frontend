import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { TableRowBase } from '../table-row.base';

@Directive({
  selector: '[pOneTableRow]',
})
export class TableRowDirective extends TableRowBase {
  constructor(template: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(viewContainerRef, template);
  }
}

@Directive({
  selector: '[pOneTableRowOutlet]',
})
export class TableRowOutletDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
