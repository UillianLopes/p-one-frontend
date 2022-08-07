import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[pOneTableHeaderCell]',
})
export class TableHeaderCellDirective {
  constructor(public readonly template: TemplateRef<any>) {}
}
