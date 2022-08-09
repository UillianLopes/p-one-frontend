import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[pOneListRow],li[pOneListRow]',
  host: {
    class: 'p-one-list__row',
  },
})
export class ListRowDirective {
  constructor(public readonly template: TemplateRef<any>) {}
}
