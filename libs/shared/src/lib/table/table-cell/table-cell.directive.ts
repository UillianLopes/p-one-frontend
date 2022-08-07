import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[pOneTableCell]',
})
export class TableCellDirective {
  constructor(public readonly template: TemplateRef<any>) {}
}
