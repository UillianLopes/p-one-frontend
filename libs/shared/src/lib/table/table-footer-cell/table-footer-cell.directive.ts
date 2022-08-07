import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[pOneTableCell]',
})
export class TableFooterCellDirective {
  constructor(public readonly template: TemplateRef<any>) {}
}
